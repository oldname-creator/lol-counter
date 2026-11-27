#!/usr/bin/env python3
"""
BANPICK - KR 솔랭 탑 라인 자동 수집 & 집계기 (scripts/collect_top.py v1.0.0)
- 외부 라이브러리(pip install) 없이 Python 3 표준 라이브러리만으로 즉시 실행 가능
- 기능:
  1) DDragon 최신 패치 버전 조회 및 챔피언 ID <-> 한국어 이름 매핑
  2) KR 서버 에메랄드+ / 마스터+ 랭크 솔로(Queue 420) 경기 수집 (2중 레이트 리미터 내장)
  3) 패치별 누적 저장(data/raw_top_history.json) + 최근 3패치 표본 적응형 가중 집계
  4) 수동 작성한 매치업 1줄 공략(tip)·검색 별명(aliases)·메모(note) 100% 보존하며 data_top.js 갱신
  5) index.html의 data_top.js?v=... 캐시 꼬리표 자동 동기화

사용법:
  - 실제 수집: RIOT_API_KEY="RGAPI-..." python3 scripts/collect_top.py
  - 내장 가상 QA 테스트(API 키 불필요): python3 scripts/collect_top.py --self-test
"""

import argparse
import collections
import datetime
import json
import os
import re
import time
import urllib.error
import urllib.parse
import urllib.request

# ==============================================================================
# 1. 기본 설정 (환경변수 또는 CLI 인자로 덮어쓰기 가능)
# ==============================================================================
PLATFORM_HOST = "https://kr.api.riotgames.com"
REGIONAL_HOST = "https://asia.api.riotgames.com"
DDRAGON_VERSIONS_URL = "https://ddragon.leagueoflegends.com/api/versions.json"

DEFAULT_DATA_JS = "data_top.js"
DEFAULT_INDEX_HTML = "index.html"
DEFAULT_HISTORY_JSON = os.path.join("data", "raw_top_history.json")

# Personal / Development Key 공식 제한: 20 req / 1s, 100 req / 120s (안전 마진 적용)
RATE_LIMIT_1S = 18
RATE_LIMIT_120S = 95

# 표본 성숙도 기준 (소량 테스트 수집 시 기존 수동 데이터 오염 방지)
MIN_CHAMP_GAMES_FOR_STATS = 15       # 챔피언 승률/픽률/밴률 반영 최소 판수
MIN_CHAMP_GAMES_FOR_COUNTERS = 80    # 카운터 목록(hard/counter) 자동 전환 최소 누적 판수
MIN_MATCHUP_GAMES = 15               # 개별 1:1 매치업 판정 최소 판수
MAX_SEEN_IDS_PER_PATCH = 30000       # 패치당 중복 방지 ID 최대 보관 수
MAX_STORED_PATCHES = 4               # 히스토리 파일에 보관할 최대 패치 수


# ==============================================================================
# 2. 레이트 리미트 준수 HTTP 클라이언트 (표준 라이브러리 전용)
# ==============================================================================
class RiotAPIClient:
    def __init__(self, api_key: str, req_per_sec: int = RATE_LIMIT_1S, req_per_2min: int = RATE_LIMIT_120S):
        self.api_key = (api_key or "").strip()
        self.req_per_sec = req_per_sec
        self.req_per_2min = req_per_2min
        self.ts_1s = collections.deque()
        self.ts_120s = collections.deque()
        self.total_requests = 0

    def _wait_for_slot(self):
        while True:
            now = time.monotonic()
            while self.ts_1s and (now - self.ts_1s[0]) >= 1.05:
                self.ts_1s.popleft()
            while self.ts_120s and (now - self.ts_120s[0]) >= 121.0:
                self.ts_120s.popleft()

            wait_sec = 0.0
            if len(self.ts_1s) >= self.req_per_sec:
                wait_sec = max(wait_sec, 1.05 - (now - self.ts_1s[0]))
            if len(self.ts_120s) >= self.req_per_2min:
                wait_sec = max(wait_sec, 121.0 - (now - self.ts_120s[0]))

            if wait_sec <= 0:
                break
            if wait_sec > 3.0:
                print(f"  [레이트 리밋 대기] 라이엇 2분 호출 한도 보호를 위해 {wait_sec:.1f}초 대기 중...")
            time.sleep(min(wait_sec, 5.0))

        stamp = time.monotonic()
        self.ts_1s.append(stamp)
        self.ts_120s.append(stamp)
        self.total_requests += 1

    def get_json(self, url: str, use_api_key: bool = True, max_retries: int = 3):
        headers = {"User-Agent": "BANPICK-TopLaneCollector/1.0"}
        if use_api_key:
            if not self.api_key:
                raise RuntimeError("RIOT_API_KEY가 비어 있습니다. 환경변수 또는 --api-key로 키를 전달해 주세요.")
            headers["X-Riot-Token"] = self.api_key

        for attempt in range(1, max_retries + 1):
            if use_api_key:
                self._wait_for_slot()
            req = urllib.request.Request(url, headers=headers)
            try:
                with urllib.request.urlopen(req, timeout=15) as resp:
                    raw = resp.read().decode("utf-8")
                    return json.loads(raw)
            except urllib.error.HTTPError as e:
                code = e.code
                if code in (401, 403):
                    raise RuntimeError(
                        f"라이엇 API 인증 실패 (HTTP {code}). "
                        "24시간 Development Key가 만료되었거나 잘못된 키인지 확인해 주세요."
                    ) from e
                if code == 404:
                    return None
                if code == 429:
                    retry_after = int(e.headers.get("Retry-After", "10")) + 1
                    print(f"  [HTTP 429] 라이엇 서버 요청 제한 — {retry_after}초 대기 후 재시도...")
                    time.sleep(retry_after)
                    continue
                if code >= 500 and attempt < max_retries:
                    time.sleep(2 * attempt)
                    continue
                raise RuntimeError(f"라이엇 API HTTP 오류 ({code}): {url}") from e
            except urllib.error.URLError as e:
                if attempt < max_retries:
                    time.sleep(2 * attempt)
                    continue
                raise RuntimeError(f"네트워크 연결 실패: {e}") from e
        return None


# ==============================================================================
# 3. 기존 data_top.js 파서 & 직렬화기 (수동 팁·별명·메모 무손실 보존)
# ==============================================================================
def load_existing_data_js(path: str):
    if not os.path.exists(path):
        raise FileNotFoundError(f"{path} 파일을 찾을 수 없습니다.")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    m_meta = re.search(r"meta:\s*(\{.*?\}),\s*externalChampions:", content, re.S)
    m_ext = re.search(r"externalChampions:\s*(\{.*?\}),\s*champions:", content, re.S)
    m_champs = re.search(r"champions:\s*(\{.*\})\s*\n\};", content, re.S)
    if not (m_meta and m_ext and m_champs):
        raise ValueError(f"{path} 구조 파싱 실패: meta / externalChampions / champions 블록을 확인하세요.")

    meta = json.loads(m_meta.group(1))
    external_champions = json.loads(m_ext.group(1))
    champions = json.loads(m_champs.group(1))
    return meta, external_champions, champions


def build_champion_key_maps(champions: dict, external_champions: dict, ddragon_ver: str, client: RiotAPIClient):
    en_to_ko = {}
    for ko_name, obj in champions.items():
        if obj.get("id"):
            en_to_ko[obj["id"].lower()] = ko_name
    for ko_name, obj in external_champions.items():
        if obj.get("id"):
            en_to_ko[obj["id"].lower()] = ko_name

    num_to_ko = {}
    try:
        dd_url = f"https://ddragon.leagueoflegends.com/cdn/{ddragon_ver}/data/ko_KR/champion.json"
        dd_data = client.get_json(dd_url, use_api_key=False)
        if dd_data and isinstance(dd_data.get("data"), dict):
            for champ_id, info in dd_data["data"].items():
                key_num = int(info["key"])
                ko_name = en_to_ko.get(champ_id.lower()) or info.get("name")
                if ko_name:
                    num_to_ko[key_num] = ko_name
                    en_to_ko.setdefault(champ_id.lower(), ko_name)
    except Exception as e:
        print(f"  [경고] DDragon champion.json 조회 실패(영문 ID 매핑으로 계속 진행): {e}")

    return num_to_ko, en_to_ko


# ==============================================================================
# 4. KR 솔랭 시드 유저 & Top 맞대결 수집기
# ==============================================================================
def fetch_seed_puuids(client: RiotAPIClient, target_puuids: int = 35):
    puuids = []
    seen = set()

    def add_entries(entries):
        if not isinstance(entries, list):
            return
        for ent in entries:
            p = ent.get("puuid")
            if p and p not in seen:
                seen.add(p)
                puuids.append(p)
                if len(puuids) >= target_puuids:
                    return

    tiers_divs = [
        ("EMERALD", "I"), ("EMERALD", "II"), ("EMERALD", "III"), ("EMERALD", "IV"),
        ("DIAMOND", "I"), ("DIAMOND", "II"), ("DIAMOND", "III"), ("DIAMOND", "IV"),
    ]
    day_seed = datetime.date.today().toordinal()
    rotated = tiers_divs[day_seed % len(tiers_divs):] + tiers_divs[:day_seed % len(tiers_divs)]

    for tier, div in rotated:
        if len(puuids) >= target_puuids:
            break
        page = (day_seed % 3) + 1
        url = f"{PLATFORM_HOST}/lol/league/v4/entries/RANKED_SOLO_5x5/{tier}/{div}?page={page}"
        entries = client.get_json(url, use_api_key=True)
        add_entries(entries)

    if len(puuids) < target_puuids:
        master_data = client.get_json(
            f"{PLATFORM_HOST}/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5",
            use_api_key=True,
        )
        if isinstance(master_data, dict):
            add_entries(master_data.get("entries", [])[:15])

    return puuids


def extract_top_match_record(match_json: dict, num_to_ko: dict, en_to_ko: dict):
    if not isinstance(match_json, dict):
        return None
    meta = match_json.get("metadata") or {}
    info = match_json.get("info") or {}

    match_id = meta.get("matchId")
    if not match_id or info.get("queueId") != 420:
        return None

    # 15분(900초) 미만 다시하기/조기 항복 제외
    duration = info.get("gameDuration") or 0
    if duration < 900:
        return None

    gv = str(info.get("gameVersion") or "")
    parts = gv.split(".")
    patch = f"{parts[0]}.{parts[1]}" if len(parts) >= 2 else "unknown"

    participants = info.get("participants") or []
    top_by_team = {100: [], 200: []}

    for p in participants:
        pos = p.get("teamPosition") or p.get("individualPosition") or ""
        if pos != "TOP":
            continue
        team_id = p.get("teamId")
        if team_id not in top_by_team:
            continue
        c_name_en = str(p.get("championName") or "").lower()
        c_id_num = p.get("championId")
        ko_name = en_to_ko.get(c_name_en) or (num_to_ko.get(int(c_id_num)) if c_id_num is not None else None)
        if not ko_name:
            continue

        top_by_team[team_id].append({
            "champ": ko_name,
            "win": bool(p.get("win")),
        })

    if len(top_by_team[100]) != 1 or len(top_by_team[200]) != 1:
        return None

    banned_champs = []
    for team in (info.get("teams") or []):
        for b in (team.get("bans") or []):
            cid = b.get("championId")
            if cid and int(cid) > 0:
                b_ko = num_to_ko.get(int(cid))
                if b_ko:
                    banned_champs.append(b_ko)

    return {
        "matchId": match_id,
        "patch": patch,
        "blue": top_by_team[100][0],
        "red": top_by_team[200][0],
        "bans": banned_champs,
    }


# ==============================================================================
# 5. 히스토리 누적 & 최근 3패치 표본 적응형 통계 계산
# ==============================================================================
def patch_sort_key(patch_str: str):
    nums = [int(x) for x in re.findall(r"\d+", str(patch_str))]
    return tuple(nums) if nums else (0, 0)


def load_history(path: str):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, dict) and "patches" in data:
                return data
    return {"schemaVersion": "1.0", "patches": {}}


def save_history(path: str, history: dict):
    patches = history.get("patches", {})
    sorted_p = sorted(patches.keys(), key=patch_sort_key, reverse=True)
    for old_p in sorted_p[MAX_STORED_PATCHES:]:
        del patches[old_p]

    for p_data in patches.values():
        seen = p_data.get("seenMatchIds", [])
        if len(seen) > MAX_SEEN_IDS_PER_PATCH:
            p_data["seenMatchIds"] = seen[-MAX_SEEN_IDS_PER_PATCH:]

    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)


def ingest_match_into_history(history: dict, rec: dict):
    patch = rec["patch"]
    patches = history.setdefault("patches", {})
    p_bucket = patches.setdefault(patch, {
        "totalMatches": 0,
        "seenMatchIds": [],
        "champs": {}
    })

    seen_set = set(p_bucket["seenMatchIds"])
    if rec["matchId"] in seen_set:
        return False

    p_bucket["seenMatchIds"].append(rec["matchId"])
    p_bucket["totalMatches"] += 1

    champs_bucket = p_bucket["champs"]

    def ensure_champ(c_name):
        return champs_bucket.setdefault(c_name, {"games": 0, "wins": 0, "bans": 0, "vs": {}})

    for b_name in rec.get("bans", []):
        c_obj = ensure_champ(b_name)
        c_obj["bans"] += 1

    blue = rec["blue"]
    red = rec["red"]

    for me, opp in ((blue, red), (red, blue)):
        c_obj = ensure_champ(me["champ"])
        c_obj["games"] += 1
        if me["win"]:
            c_obj["wins"] += 1

        vs_obj = c_obj["vs"].setdefault(opp["champ"], {"games": 0, "wins": 0})
        vs_obj["games"] += 1
        if me["win"]:
            vs_obj["wins"] += 1

    return True


def aggregate_and_merge(
    meta: dict,
    external_champions: dict,
    champions: dict,
    history: dict,
    current_patch: str,
    min_champ_games: int = MIN_CHAMP_GAMES_FOR_STATS,
    min_counter_champ_games: int = MIN_CHAMP_GAMES_FOR_COUNTERS,
    min_matchup_games: int = MIN_MATCHUP_GAMES,
):
    patches = history.get("patches", {})
    if not patches:
        return meta, champions, {"updatedChamps": 0, "updatedMatchups": 0}

    sorted_patches = sorted(patches.keys(), key=patch_sort_key, reverse=True)
    active_patch = current_patch if current_patch in patches else sorted_patches[0]
    window_patches = sorted_patches[:3]

    cur_bucket = patches[active_patch]
    cur_total_matches = max(1, cur_bucket.get("totalMatches", 0))
    cur_champs = cur_bucket.get("champs", {})

    prev_patch = window_patches[1] if len(window_patches) > 1 else None
    blend_prev = (cur_total_matches < 500) and (prev_patch is not None)
    prev_bucket = patches.get(prev_patch, {}) if blend_prev else {}
    prev_total_matches = max(1, prev_bucket.get("totalMatches", 0)) if blend_prev else 1
    prev_champs = prev_bucket.get("champs", {}) if blend_prev else {}

    champ_wr_map = {}
    weighted_wr_sum = 0.0
    weighted_games_sum = 0

    for c_name, c_data in champions.items():
        c_cur = cur_champs.get(c_name, {"games": 0, "wins": 0, "bans": 0})
        g_cur = c_cur.get("games", 0)
        w_cur = c_cur.get("wins", 0)
        b_cur = c_cur.get("bans", 0)

        if blend_prev and not (c_data.get("patchFlag") or {}).get("resetHistory"):
            c_prev = prev_champs.get(c_name, {"games": 0, "wins": 0, "bans": 0})
            eff_games = g_cur * 0.7 + c_prev.get("games", 0) * 0.3
            eff_wins = w_cur * 0.7 + c_prev.get("wins", 0) * 0.3
            eff_bans = b_cur * 0.7 + c_prev.get("bans", 0) * 0.3
            eff_matches = cur_total_matches * 0.7 + prev_total_matches * 0.3
        else:
            eff_games = float(g_cur)
            eff_wins = float(w_cur)
            eff_bans = float(b_cur)
            eff_matches = float(cur_total_matches)

        if eff_games >= min_champ_games:
            wr = round((eff_wins / eff_games) * 100.0, 2)
            pr = round((eff_games / max(1.0, eff_matches)) * 100.0, 2)
            br = round((eff_bans / max(1.0, eff_matches)) * 100.0, 2)
            c_data["stats"] = {
                "wr": wr,
                "pr": pr,
                "br": br,
                "games": int(round(eff_games)),
            }
            champ_wr_map[c_name] = wr
            weighted_wr_sum += wr * int(round(eff_games))
            weighted_games_sum += int(round(eff_games))

    avg_wr = round(weighted_wr_sum / weighted_games_sum, 2) if weighted_games_sum > 0 else meta.get("tierAvgWinRate", 51.8)

    c_model = meta.get("counterModel") or {}
    base_weights = c_model.get("defaultPatchWeights") or [0.55, 0.30, 0.15]
    high_sample_th = c_model.get("highSampleThreshold") or 1000
    high_sample_w0 = c_model.get("highSampleCurrentWeight") or 0.80

    updated_champs = len(champ_wr_map)
    updated_matchups = 0
    valid_targets = set(champions.keys()) | set(external_champions.keys())

    for c_name, c_data in champions.items():
        reset_hist = bool((c_data.get("patchFlag") or {}).get("resetHistory"))
        target_patches = [active_patch] if reset_hist else window_patches

        opponents = set()
        for p_ver in target_patches:
            vs_dict = ((patches.get(p_ver) or {}).get("champs") or {}).get(c_name, {}).get("vs", {})
            opponents.update(vs_dict.keys())

        existing_ms = c_data.get("matchupStats") or {}
        merged_ms = dict(existing_ms)
        total_c_matchup_games = 0
        auto_hard = []
        auto_soft = []

        for opp in opponents:
            if opp not in valid_targets or opp == c_name:
                continue

            cur_vs = ((patches.get(active_patch) or {}).get("champs") or {}).get(c_name, {}).get("vs", {}).get(opp, {})
            cur_g = cur_vs.get("games", 0)
            if len(target_patches) == 1:
                weights = [1.0]
            elif cur_g >= high_sample_th:
                rem = 1.0 - high_sample_w0
                weights = [high_sample_w0, rem * 0.67, rem * 0.33][:len(target_patches)]
            else:
                weights = base_weights[:len(target_patches)]

            w_games = 0.0
            w_wins = 0.0
            raw_sum_games = 0
            patches_used = 0

            for idx, p_ver in enumerate(target_patches):
                vs_rec = ((patches.get(p_ver) or {}).get("champs") or {}).get(c_name, {}).get("vs", {}).get(opp)
                if not vs_rec or vs_rec.get("games", 0) <= 0:
                    continue
                g = vs_rec["games"]
                w = vs_rec["wins"]
                wt = weights[idx]
                w_games += g * wt
                w_wins += w * wt
                raw_sum_games += g
                patches_used += 1

            total_c_matchup_games += raw_sum_games
            if raw_sum_games < min_matchup_games or w_games <= 0:
                continue

            my_wr = round((w_wins / w_games) * 100.0, 1)
            my_base = champ_wr_map.get(c_name, avg_wr)
            opp_base = champ_wr_map.get(opp, avg_wr)
            delta2 = round((my_wr - 50.0) - (my_base - avg_wr) * 0.5 + (opp_base - avg_wr) * 0.5, 2)

            prev_entry = dict(existing_ms.get(opp) or {})
            prev_entry.update({
                "wr": my_wr,
                "delta2": delta2,
                "gd15": prev_entry.get("gd15"),
                "games": raw_sum_games,
                "patches": patches_used,
                "tip": prev_entry.get("tip"),
                "firstTower": prev_entry.get("firstTower"),
                "plates": prev_entry.get("plates"),
                "soloKill": prev_entry.get("soloKill"),
                "csAdv": prev_entry.get("csAdv"),
                "archetype": prev_entry.get("archetype"),
            })
            merged_ms[opp] = prev_entry
            updated_matchups += 1

            opp_adv = -delta2
            if opp_adv >= 5.5:
                auto_hard.append((opp_adv, opp))
            elif opp_adv >= 2.5:
                auto_soft.append((opp_adv, opp))

        c_data["matchupStats"] = merged_ms

        if total_c_matchup_games >= min_counter_champ_games and (auto_hard or auto_soft):
            auto_hard.sort(reverse=True)
            auto_soft.sort(reverse=True)
            c_data["hard"] = [name for _, name in auto_hard[:6]]
            c_data["counter"] = [name for _, name in auto_soft[:6]]

    today_str = datetime.date.today().isoformat()
    meta["patch"] = active_patch
    meta["tierAvgWinRate"] = avg_wr
    meta["updatedAt"] = today_str
    meta["isCollecting"] = cur_total_matches < 500
    if "counterModel" in meta:
        meta["counterModel"]["patchWindow"] = window_patches

    return meta, champions, {
        "activePatch": active_patch,
        "totalPatchMatches": cur_total_matches,
        "updatedChamps": updated_champs,
        "updatedMatchups": updated_matchups,
    }


# ==============================================================================
# 6. data_top.js 안전 재작성 & index.html 캐시 꼬리표 동기화
# ==============================================================================
def write_updated_data_js(path: str, meta: dict, external_champions: dict, champions: dict):
    with open(path, "r", encoding="utf-8") as f:
        orig = f.read()

    tail_marker = "\n(function bindAndValidateTopData()"
    idx = orig.find(tail_marker)
    if idx == -1:
        raise ValueError("data_top.js 하단 bindAndValidateTopData 블록을 찾을 수 없습니다.")
    tail_code = orig[idx:]

    patch = meta.get("patch", "26.23")
    ver = meta.get("dataVersion") or meta.get("schemaVersion") or "2.4.0"

    header = f"""/**
 * BANPICK - LoL {patch} 패치 탑 라인 통합 데이터 (data_top.js v{ver})
 * - 총 {len(champions)}종 탑 챔피언 + 목록 외 조커 픽({len(external_champions)}종) 안전 매핑
 * - 스키마 v{ver}: Riot API KR 에메랄드+ 자동 수집 + 2축 분리 카운터 & 3패치 표본 적응형
 */

window.BANPICK_DATA = window.BANPICK_DATA || {{}};

window.BANPICK_DATA.top = {{
  meta: {json.dumps(meta, ensure_ascii=False, indent=2)},
  externalChampions: {json.dumps(external_champions, ensure_ascii=False, indent=2)},
  champions: {json.dumps(champions, ensure_ascii=False, indent=2)}
}};
"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(header + tail_code)


def sync_index_html_cache_tag(index_path: str, data_version: str):
    if not os.path.exists(index_path):
        return
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()
    new_html = re.sub(
        r'(<script src="data_top\.js\?v=)[^"]+(")',
        rf'\g<1>{data_version}\2',
        html,
        count=1,
    )
    if new_html != html:
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(new_html)


# ==============================================================================
# 7. 내장 가상 QA 셀프 테스트 (API 키 없이 전체 파이프라인 무결성 검증)
# ==============================================================================
def run_self_test(data_js_path: str):
    print("=== [Self-Test] BANPICK 수집기 파이프라인 가상 QA 시작 ===")
    meta, ext, champs = load_existing_data_js(data_js_path)
    assert len(champs) == 65, f"기대 챔피언 수 65종 불일치: {len(champs)}"

    fake_history = {"schemaVersion": "1.0", "patches": {}}
    sample_pairs = [
        ("가렌", "잭스", 0.62, 60),
        ("이렐리아", "제이스", 0.60, 50),
        ("럼블", "아트록스", 0.56, 45),
        ("암베사", "크산테", 0.61, 45),
    ]
    mid = 1
    for winner_c, loser_c, win_prob, n_games in sample_pairs:
        for i in range(n_games):
            c1_win = (i / n_games) < win_prob
            rec = {
                "matchId": f"KR_TEST_{mid}",
                "patch": meta.get("patch", "26.23"),
                "blue": {"champ": winner_c, "win": c1_win},
                "red": {"champ": loser_c, "win": not c1_win},
                "bans": ["다리우스", "말파이트"],
            }
            assert ingest_match_into_history(fake_history, rec) is True
            assert ingest_match_into_history(fake_history, rec) is False
            mid += 1

    orig_tip = champs["잭스"]["matchupStats"]["가렌"]["tip"]
    assert orig_tip, "기존 잭스 vs 가렌 수동 팁이 비어 있음"

    new_meta, new_champs, summary = aggregate_and_merge(
        meta, ext, champs, fake_history, meta.get("patch", "26.23"),
        min_champ_games=10, min_counter_champ_games=30, min_matchup_games=10
    )
    assert summary["totalPatchMatches"] == 200
    assert new_champs["잭스"]["stats"]["games"] == 60
    assert new_champs["잭스"]["matchupStats"]["가렌"]["tip"] == orig_tip, "수동 팁 유실!"
    assert new_champs["잭스"]["matchupStats"]["가렌"]["wr"] == 36.7
    assert "가렌" in new_champs["잭스"]["hard"]
    print(f"  [PASS] 200판 가상 집계 · 중복 차단 · 수동 팁 보존 · 카운터 판정 검증 완료: {summary}")


# ==============================================================================
# 8. 메인 실행 엔트리포인트
# ==============================================================================
def main():
    parser = argparse.ArgumentParser(description="BANPICK KR 솔랭 탑 데이터 자동 수집기")
    parser.add_argument("--api-key", default=os.environ.get("RIOT_API_KEY", ""), help="Riot API Key (기본: RIOT_API_KEY 환경변수)")
    parser.add_argument("--max-matches", type=int, default=int(os.environ.get("MAX_MATCHES", "120")), help="1회 실행당 최대 신규 수집 경기 수")
    parser.add_argument("--seed-users", type=int, default=35, help="시드 PUUID 조회 인원 수")
    parser.add_argument("--data-js", default=DEFAULT_DATA_JS, help="대상 data_top.js 경로")
    parser.add_argument("--index-html", default=DEFAULT_INDEX_HTML, help="캐시 태그 동기화할 index.html 경로")
    parser.add_argument("--history", default=DEFAULT_HISTORY_JSON, help="누적 히스토리 JSON 경로")
    parser.add_argument("--self-test", action="store_true", help="API 호출 없이 가상 데이터로 파이프라인 검증")
    args = parser.parse_args()

    if args.self_test:
        run_self_test(args.data_js)
        return

    client = RiotAPIClient(api_key=args.api_key)
    meta, ext, champs = load_existing_data_js(args.data_js)
    history = load_history(args.history)

    versions = client.get_json(DDRAGON_VERSIONS_URL, use_api_key=False)
    dd_full = versions[0] if (isinstance(versions, list) and versions) else "26.23.1"
    vp = dd_full.split(".")
    current_patch = f"{vp[0]}.{vp[1]}" if len(vp) >= 2 else meta.get("patch", "26.23")
    print(f"[1/4] 최신 패치 확인: {current_patch} (DDragon {dd_full})")

    num_to_ko, en_to_ko = build_champion_key_maps(champs, ext, dd_full, client)

    puuids = fetch_seed_puuids(client, target_puuids=args.seed_users)
    print(f"[2/4] KR 에메랄드+ 시드 유저 {len(puuids)}명 확보")

    already_seen = set()
    for p_data in history.get("patches", {}).values():
        already_seen.update(p_data.get("seenMatchIds", []))

    candidate_ids = []
    seen_cand = set()
    for puuid in puuids:
        if len(candidate_ids) >= args.max_matches * 2:
            break
        ids_url = f"{REGIONAL_HOST}/lol/match/v5/matches/by-puuid/{urllib.parse.quote(puuid)}/ids?queue=420&type=ranked&count=15"
        m_ids = client.get_json(ids_url, use_api_key=True)
        if isinstance(m_ids, list):
            for mid in m_ids:
                if mid not in already_seen and mid not in seen_cand:
                    seen_cand.add(mid)
                    candidate_ids.append(mid)

    print(f"[3/4] 신규 후보 경기 {len(candidate_ids)}건 중 최대 {args.max_matches}건 수집 시작...")
    collected_valid = 0
    inspected = 0
    for mid in candidate_ids:
        if collected_valid >= args.max_matches:
            break
        inspected += 1
        m_json = client.get_json(f"{REGIONAL_HOST}/lol/match/v5/matches/{urllib.parse.quote(mid)}", use_api_key=True)
        rec = extract_top_match_record(m_json, num_to_ko, en_to_ko)
        if rec and ingest_match_into_history(history, rec):
            collected_valid += 1
            if collected_valid % 20 == 0:
                print(f"  · 진행률: 유효 탑 매치 {collected_valid}/{args.max_matches}판 수집 완료 (API 호출 {client.total_requests}회)")

    print(f"  · 수집 종료: 조회 {inspected}건 중 유효 탑 1:1 경기 {collected_valid}판 신규 반영 (총 API 호출 {client.total_requests}회)")

    save_history(args.history, history)
    today_tag = datetime.date.today().strftime("%Y%m%d")
    meta["dataVersion"] = f"2.4.0-{today_tag}"
    meta, champs, summary = aggregate_and_merge(meta, ext, champs, history, current_patch)
    write_updated_data_js(args.data_js, meta, ext, champs)
    sync_index_html_cache_tag(args.index_html, meta["dataVersion"])

    print(f"[4/4] 완료! 패치={summary['activePatch']}, 누적판수={summary['totalPatchMatches']}, 통계갱신챔프={summary['updatedChamps']}종, 매치업={summary['updatedMatchups']}건")


if __name__ == "__main__":
    main()
