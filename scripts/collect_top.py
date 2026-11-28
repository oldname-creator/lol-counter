#!/usr/bin/env python3
"""
BANPICK - KR 솔랭 탑 라인 자동 수집 & 집계기 (scripts/collect_top.py v1.3.0)
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
import random
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
        logged_long_wait = False
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
            if wait_sec > 3.0 and not logged_long_wait:
                print(f"  [레이트 리밋 대기] 라이엇 2분 호출 한도 보호를 위해 약 {wait_sec:.0f}초 대기 중...")
                logged_long_wait = True
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
    """
    Riot Match-V5의 championId(숫자) 및 championName(영문 ID)을 한국어 챔피언명으로 매핑
    """
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
def pick_active_puuids(entries, limit: int):
    """휴면(inactive) 계정을 제외하고 시즌 판수가 많은 현역 유저 순으로 PUUID 추출"""
    if not isinstance(entries, list):
        return []
    active = []
    for ent in entries:
        p = ent.get("puuid")
        if not p or ent.get("inactive"):
            continue
        total_games = int(ent.get("wins") or 0) + int(ent.get("losses") or 0)
        hot = 1 if ent.get("hotStreak") else 0
        active.append((hot, total_games, p))
    active.sort(reverse=True)
    return [p for _, _, p in active[:limit]]


def fetch_seed_puuids(client: RiotAPIClient, target_puuids: int = 90, rng=None):
    """
    KR 서버 에메랄드+ 현역 솔랭 유저 PUUID 매 실행 랜덤 균형 수집 (Emerald + Diamond + Master)
    - v1.3.0: 하루 고정(day_seed) 폐기 -> 매 실행마다 다른 디비전·페이지·마스터 구간을 랜덤 샘플링
    - 같은 날 수동으로 여러 번 실행해도 중복 유저 재조회(API 낭비) 없이 신규 경기 확보
    """
    if rng is None:
        rng = random.SystemRandom()

    divs = ["I", "II", "III", "IV"]
    em_div = rng.choice(divs)
    di_div = rng.choice(divs)
    em_page = rng.randint(1, 10)
    di_page = rng.randint(1, 8)

    buckets = []

    # 1) 에메랄드 현역 (주력 구간 — 페이지 비어 있으면 1페이지 폴백)
    em_entries = client.get_json(
        f"{PLATFORM_HOST}/lol/league/v4/entries/RANKED_SOLO_5x5/EMERALD/{em_div}?page={em_page}",
        use_api_key=True,
    )
    if not em_entries and em_page != 1:
        em_page = 1
        em_entries = client.get_json(
            f"{PLATFORM_HOST}/lol/league/v4/entries/RANKED_SOLO_5x5/EMERALD/{em_div}?page=1",
            use_api_key=True,
        )
    em_list = pick_active_puuids(em_entries, 45)
    rng.shuffle(em_list)
    buckets.append(em_list)

    # 2) 다이아몬드 현역
    di_entries = client.get_json(
        f"{PLATFORM_HOST}/lol/league/v4/entries/RANKED_SOLO_5x5/DIAMOND/{di_div}?page={di_page}",
        use_api_key=True,
    )
    if not di_entries and di_page != 1:
        di_page = 1
        di_entries = client.get_json(
            f"{PLATFORM_HOST}/lol/league/v4/entries/RANKED_SOLO_5x5/DIAMOND/{di_div}?page=1",
            use_api_key=True,
        )
    di_list = pick_active_puuids(di_entries, 40)
    rng.shuffle(di_list)
    buckets.append(di_list)

    # 3) 마스터 현역 (휴면 강등으로 최근 7일 활성도 최상)
    master_data = client.get_json(
        f"{PLATFORM_HOST}/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5",
        use_api_key=True,
    )
    if isinstance(master_data, dict):
        m_entries = master_data.get("entries", [])
        if m_entries:
            offset = rng.randrange(len(m_entries))
            rotated_m = m_entries[offset:] + m_entries[:offset]
            m_list = pick_active_puuids(rotated_m[:250], 40)
            rng.shuffle(m_list)
            buckets.append(m_list)

    print(f"  · 시드 샘플 구간: EMERALD {em_div} (p.{em_page}) · DIAMOND {di_div} (p.{di_page}) · MASTER 랜덤 구간")

    # 3개 티어 버킷을 번갈아 섞어(round-robin) 에메랄드·다이아·마스터 균형 유지
    puuids = []
    seen = set()
    max_len = max((len(b) for b in buckets), default=0)
    for i in range(max_len):
        for b in buckets:
            if i < len(b):
                p = b[i]
                if p not in seen:
                    seen.add(p)
                    puuids.append(p)
                    if len(puuids) >= target_puuids:
                        return puuids
    return puuids


def extract_top_match_record(match_json: dict, num_to_ko: dict, en_to_ko: dict):
    """
    Match-V5 응답에서 유효한 15분 이상 솔랭(420) 탑 1:1 맞대결 및 밴 데이터 추출
    """
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

        challenges = p.get("challenges") or {}
        top_by_team[team_id].append({
            "champ": ko_name,
            "win": bool(p.get("win")),
            "soloKills": challenges.get("soloKills"),
            "turretPlates": challenges.get("turretPlatesTaken"),
            "goldEarned": p.get("goldEarned"),
            "cs": (p.get("totalMinionsKilled") or 0) + (p.get("neutralMinionsKilled") or 0),
        })

    # 양 팀 모두 정확히 1명의 TOP 라이너가 매칭된 정상 경기만 채택
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

    part_puuids = [p for p in (meta.get("participants") or []) if isinstance(p, str) and p]
    return {
        "matchId": match_id,
        "patch": patch,
        "blue": top_by_team[100][0],
        "red": top_by_team[200][0],
        "bans": banned_champs,
        "participantPuuids": part_puuids,
    }


# ==============================================================================
# 5. 히스토리 누적 & 최근 3패치 표본 적응형 통계 계산
# ==============================================================================
def load_history(path: str):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, dict) and "patches" in data:
                return data
    return {"schemaVersion": "1.0", "patches": {}}


def save_history(path: str, history: dict):
    # 최근 MAX_STORED_PATCHES개 패치만 유지하고 seenMatchIds 크기 제한
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
        json.dump(history, f, ensure_ascii=False, separators=(",", ":"))


def patch_sort_key(patch_str: str):
    nums = [int(x) for x in re.findall(r"\d+", str(patch_str))]
    return tuple(nums) if nums else (0, 0)


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

        # API 호출 0회 추가: Match-V5 기본 응답의 솔킬·포탑 채굴 격차 누적 (하위 호환 안전)
        me_sk, opp_sk = me.get("soloKills"), opp.get("soloKills")
        if isinstance(me_sk, (int, float)) and isinstance(opp_sk, (int, float)):
            vs_obj["skDiffSum"] = round(vs_obj.get("skDiffSum", 0.0) + (me_sk - opp_sk), 3)
            vs_obj["skCount"] = vs_obj.get("skCount", 0) + 1

        me_pl, opp_pl = me.get("turretPlates"), opp.get("turretPlates")
        if isinstance(me_pl, (int, float)) and isinstance(opp_pl, (int, float)):
            vs_obj["plateDiffSum"] = round(vs_obj.get("plateDiffSum", 0.0) + (me_pl - opp_pl), 3)
            vs_obj["plateCount"] = vs_obj.get("plateCount", 0) + 1

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
    """
    티어표는 최신 패치 단독(표본 부족 시 직전 패치 30% 혼합),
    카운터표는 최근 3패치 표본 적응형(55/30/15, 1000판+ 시 최신 80%)으로 합산하여 champions 갱신
    """
    patches = history.get("patches", {})
    if not patches:
        return meta, champions, {"updatedChamps": 0, "updatedMatchups": 0}

    sorted_patches = sorted(patches.keys(), key=patch_sort_key, reverse=True)
    active_patch = current_patch if current_patch in patches else sorted_patches[0]
    window_patches = sorted_patches[:3]

    # 1) 최신 패치 챔피언별 승률·픽률·밴률 계산
    cur_bucket = patches[active_patch]
    cur_total_matches = max(1, cur_bucket.get("totalMatches", 0))
    cur_champs = cur_bucket.get("champs", {})

    # 패치 1~2일 차 표본 부족(< 500판) 시 직전 패치 30% 혼합
    prev_patch = window_patches[1] if len(window_patches) > 1 else None
    blend_prev = (cur_total_matches < 500) and (prev_patch is not None)
    prev_bucket = patches.get(prev_patch, {}) if blend_prev else {}
    prev_total_matches = max(1, prev_bucket.get("totalMatches", 0)) if blend_prev else 1
    prev_champs = prev_bucket.get("champs", {}) if blend_prev else {}

    champ_wr_map = {}
    all_eff_wins = 0.0
    all_eff_games = 0.0

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

        if eff_games > 0:
            all_eff_wins += eff_wins
            all_eff_games += eff_games

        if eff_games >= min_champ_games:
            wr = round((eff_wins / eff_games) * 100.0, 2)
            # 탑 라인 기준 픽률(%) = 해당 챔프 탑 등장 판수 / 전체 경기 수 * 100
            pr = round((eff_games / max(1.0, eff_matches)) * 100.0, 2)
            br = round((eff_bans / max(1.0, eff_matches)) * 100.0, 2)
            c_data["stats"] = {
                "wr": wr,
                "pr": pr,
                "br": br,
                "games": int(round(eff_games)),
            }
            champ_wr_map[c_name] = wr

    # 전체 기록된 탑 1:1 판수 기준 평균 승률 (초반 소수 인기 챔프 편향 차단)
    if all_eff_games > 0:
        avg_wr = round((all_eff_wins / all_eff_games) * 100.0, 2)
    else:
        avg_wr = meta.get("tierAvgWinRate", 50.0)

    # 2) 최근 3패치 표본 적응형 매치업 집계
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

        # 모든 상대 후보 수집
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

            # 현재 패치 판수 확인 -> 표본 적응형 가중치 선택
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
            w_sk_sum = 0.0
            w_sk_cnt = 0.0
            raw_sk_cnt = 0
            w_pl_sum = 0.0
            w_pl_cnt = 0.0
            raw_pl_cnt = 0
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

                sk_c = vs_rec.get("skCount", 0)
                if sk_c > 0:
                    w_sk_sum += vs_rec.get("skDiffSum", 0.0) * wt
                    w_sk_cnt += sk_c * wt
                    raw_sk_cnt += sk_c

                pl_c = vs_rec.get("plateCount", 0)
                if pl_c > 0:
                    w_pl_sum += vs_rec.get("plateDiffSum", 0.0) * wt
                    w_pl_cnt += pl_c * wt
                    raw_pl_cnt += pl_c

            total_c_matchup_games += raw_sum_games
            if raw_sum_games < min_matchup_games or w_games <= 0:
                continue

            my_wr = round((w_wins / w_games) * 100.0, 1)
            # Lolalytics 스타일 정규화 Delta2 (내 체급·상대 체급 보정 후 순수 상성 편차)
            my_base = champ_wr_map.get(c_name, avg_wr)
            opp_base = champ_wr_map.get(opp, avg_wr)
            delta2 = round((my_wr - 50.0) - (my_base - avg_wr) * 0.5 + (opp_base - avg_wr) * 0.5, 2)

            prev_entry = dict(existing_ms.get(opp) or {})
            solo_kill_val = round(w_sk_sum / w_sk_cnt, 2) if (raw_sk_cnt >= min_matchup_games and w_sk_cnt > 0) else prev_entry.get("soloKill")
            plates_val = round(w_pl_sum / w_pl_cnt, 2) if (raw_pl_cnt >= min_matchup_games and w_pl_cnt > 0) else prev_entry.get("plates")

            prev_entry.update({
                "wr": my_wr,
                "delta2": delta2,
                "gd15": prev_entry.get("gd15"),
                "games": raw_sum_games,
                "patches": patches_used,
                "tip": prev_entry.get("tip"),
                "firstTower": prev_entry.get("firstTower"),
                "plates": plates_val,
                "soloKill": solo_kill_val,
                "csAdv": prev_entry.get("csAdv"),
                "archetype": prev_entry.get("archetype"),
            })
            merged_ms[opp] = prev_entry
            updated_matchups += 1

            # 상대 우세도(winAxis = -delta2) 기준 카운터 분류
            opp_adv = -delta2
            if opp_adv >= 5.5:
                auto_hard.append((opp_adv, opp))
            elif opp_adv >= 2.5:
                auto_soft.append((opp_adv, opp))

        c_data["matchupStats"] = merged_ms

        # 누적 판수가 충분히 성숙했을 때만 수동 카운터 목록을 API 실측 카운터로 전환
        if total_c_matchup_games >= min_counter_champ_games and (auto_hard or auto_soft):
            auto_hard.sort(reverse=True)
            auto_soft.sort(reverse=True)
            c_data["hard"] = [name for _, name in auto_hard[:6]]
            c_data["counter"] = [name for _, name in auto_soft[:6]]

    # Bug 4 방어: A↔B 상호 카운터 충돌 자동 해소 (API 전환·수동 혼재 경계 보호)
    champ_names_list = list(champions.keys())
    for i, a in enumerate(champ_names_list):
        ca = champions[a]
        for b in champ_names_list[i + 1:]:
            cb = champions[b]
            a_has_b = (b in ca.get("hard", [])) or (b in ca.get("counter", []))
            b_has_a = (a in cb.get("hard", [])) or (a in cb.get("counter", []))
            if not (a_has_b and b_has_a):
                continue
            ms_a = (ca.get("matchupStats") or {}).get(b) or {}
            ms_b = (cb.get("matchupStats") or {}).get(a) or {}
            # 상대 우세도(-delta2) 비교; API 실측 판수 보유 쪽 우선
            adv_b_over_a = -(ms_a["delta2"]) if ms_a.get("delta2") is not None else (5.5 if b in ca.get("hard", []) else 2.5)
            adv_a_over_b = -(ms_b["delta2"]) if ms_b.get("delta2") is not None else (5.5 if a in cb.get("hard", []) else 2.5)
            score_b_over_a = (1 if (ms_a.get("games") or 0) >= min_matchup_games else 0, adv_b_over_a)
            score_a_over_b = (1 if (ms_b.get("games") or 0) >= min_matchup_games else 0, adv_a_over_b)
            if score_b_over_a >= score_a_over_b:
                cb["hard"] = [x for x in cb.get("hard", []) if x != a]
                cb["counter"] = [x for x in cb.get("counter", []) if x != a]
            else:
                ca["hard"] = [x for x in ca.get("hard", []) if x != b]
                ca["counter"] = [x for x in ca.get("counter", []) if x != b]

    # 메타 헤더 최신화
    today_str = datetime.date.today().isoformat()
    meta["patch"] = active_patch
    meta["tierAvgWinRate"] = avg_wr
    meta["totalPatchMatches"] = cur_total_matches
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

    # 하단 IIFE 검증·전역 바인딩 코드 보존
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
        rf'\g<1>{data_version}"',
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

    # 가상 Match-V5 경기 200판 생성 (잭스 vs 가렌, 제이스 vs 이렐리아, 럼블 vs 아트록스 등)
    fake_history = {"schemaVersion": "1.0", "patches": {}}
    sample_pairs = [
        ("가렌", "잭스", 0.62, 60),
        ("이렐리아", "제이스", 0.60, 50),
        ("럼블", "아트록스", 0.56, 45),
        ("암베사", "크산테", 0.61, 45),
    ]
    mid = 1
    # Bug 1 회귀 검증: patch_sort_key 정상 정렬 확인
    assert patch_sort_key("26.24") > patch_sort_key("26.23") > patch_sort_key("26.9"), "patch_sort_key 정렬 오류!"
    # v1.2.0 휴면 계정 필터 & 판수 우선 정렬 검증
    mock_entries = [
        {"puuid": "parked", "inactive": True, "wins": 200, "losses": 200},
        {"puuid": "low_act", "inactive": False, "wins": 10, "losses": 10},
        {"puuid": "high_act", "inactive": False, "wins": 120, "losses": 110},
    ]
    assert pick_active_puuids(mock_entries, 5) == ["high_act", "low_act"], "pick_active_puuids 필터 오류!" 

    for winner_c, loser_c, win_prob, n_games in sample_pairs:
        for i in range(n_games):
            c1_win = (i / n_games) < win_prob
            rec = {
                "matchId": f"KR_TEST_{mid}",
                "patch": meta.get("patch", "26.23"),
                "blue": {"champ": winner_c, "win": c1_win, "soloKills": 2, "turretPlates": 3},
                "red": {"champ": loser_c, "win": not c1_win, "soloKills": 1, "turretPlates": 1},
                "bans": ["다리우스", "말파이트"],
            }
            assert ingest_match_into_history(fake_history, rec) is True
            # 중복 경기 무시 확인
            assert ingest_match_into_history(fake_history, rec) is False
            mid += 1

    # 원본 수동 팁 보존 여부 확인
    orig_tip = champs["잭스"]["matchupStats"]["가렌"]["tip"]
    assert orig_tip, "기존 잭스 vs 가렌 수동 팁이 비어 있음"

    new_meta, new_champs, summary = aggregate_and_merge(
        meta, ext, champs, fake_history, meta.get("patch", "26.23"),
        min_champ_games=10, min_counter_champ_games=30, min_matchup_games=10
    )
    assert summary["totalPatchMatches"] == 200
    assert new_meta["totalPatchMatches"] == 200
    assert new_meta["tierAvgWinRate"] == 50.0, f"avg_wr 왜곡 감지: {new_meta['tierAvgWinRate']}"
    assert new_champs["잭스"]["stats"]["games"] == 60
    assert new_champs["잭스"]["matchupStats"]["가렌"]["tip"] == orig_tip, "수동 팁 유실!"
    assert new_champs["잭스"]["matchupStats"]["가렌"]["wr"] == 36.7
    assert new_champs["잭스"]["matchupStats"]["가렌"]["soloKill"] == -1.0
    assert new_champs["잭스"]["matchupStats"]["가렌"]["plates"] == -2.0
    assert "가렌" in new_champs["잭스"]["hard"]
    assert "잭스" not in new_champs["가렌"]["hard"] and "잭스" not in new_champs["가렌"]["counter"]
    print(f"  [PASS] 200판 가상 집계 · 패치정렬 · 솔킬/채굴 · 평균승률 · 상호충돌방어 검증 완료: {summary}")


# ==============================================================================
# 8. 메인 실행 엔트리포인트
# ==============================================================================
def main():
    parser = argparse.ArgumentParser(description="BANPICK KR 솔랭 탑 데이터 자동 수집기")
    parser.add_argument("--api-key", default=os.environ.get("RIOT_API_KEY", ""), help="Riot API Key (기본: RIOT_API_KEY 환경변수)")
    parser.add_argument("--max-matches", type=int, default=int(os.environ.get("MAX_MATCHES", "120")), help="1회 실행당 최대 신규 수집 경기 수")
    parser.add_argument("--seed-users", type=int, default=90, help="현역 시드 PUUID 확보 인원 수")
    parser.add_argument("--lookback-days", type=int, default=7, help="최근 N일 이내 경기만 조회 (구패치 휴면 경기 원천 차단)")
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

    # 1) 최신 DDragon 패치 버전 확인
    versions = client.get_json(DDRAGON_VERSIONS_URL, use_api_key=False)
    dd_full = versions[0] if (isinstance(versions, list) and versions) else "26.23.1"
    vp = dd_full.split(".")
    current_patch = f"{vp[0]}.{vp[1]}" if len(vp) >= 2 else meta.get("patch", "26.23")
    print(f"[1/4] 최신 패치 확인: {current_patch} (DDragon {dd_full})")

    num_to_ko, en_to_ko = build_champion_key_maps(champs, ext, dd_full, client)

    # 2) KR 에메랄드+ 현역 시드 유저 조회
    puuids = fetch_seed_puuids(client, target_puuids=args.seed_users)
    print(f"[2/4] KR 에메랄드+ 현역 시드 유저 {len(puuids)}명 확보 (API 호출 {client.total_requests}회)")

    # 3) 최근 lookback_days일 이내 신규 솔랭 경기 수집 (구패치 휴면 경기 차단)
    already_seen = set()
    for p_data in history.get("patches", {}).values():
        already_seen.update(p_data.get("seenMatchIds", []))

    start_ts = int(time.time()) - max(1, args.lookback_days) * 86400
    target_candidates = int(args.max_matches * 1.25)
    candidate_queue = collections.deque()
    seen_cand = set()
    queried_puuids = set()
    snowball_queue = collections.deque()
    snowball_seen = set(puuids)

    def fetch_user_candidates(p_id: str, count: int = 12):
        queried_puuids.add(p_id)
        ids_url = (
            f"{REGIONAL_HOST}/lol/match/v5/matches/by-puuid/{urllib.parse.quote(p_id)}/ids"
            f"?queue=420&type=ranked&startTime={start_ts}&count={count}"
        )
        m_ids = client.get_json(ids_url, use_api_key=True)
        added = 0
        if isinstance(m_ids, list) and m_ids:
            for mid in m_ids:
                if mid not in already_seen and mid not in seen_cand:
                    seen_cand.add(mid)
                    candidate_queue.append(mid)
                    added += 1
            return True, added
        return False, 0

    checked_users = 0
    active_users = 0
    for puuid in puuids:
        if len(candidate_queue) >= target_candidates:
            break
        checked_users += 1
        is_act, _ = fetch_user_candidates(puuid, count=12)
        if is_act:
            active_users += 1

    print(
        f"[3/4] 최근 {args.lookback_days}일 기준 현역 {active_users}/{checked_users}명에서 "
        f"신규 후보 {len(candidate_queue)}건 확보 → 최대 {args.max_matches}건 수집 시작..."
    )
    collected_valid = 0
    inspected = 0
    snowball_used = 0
    patch_counts = collections.Counter()

    while collected_valid < args.max_matches:
        # 후보가 바닥나면 방금 수집한 경기 참가자(100% 현역 에메랄드+)에서 추가 후보 자동 보충
        if not candidate_queue:
            refilled = 0
            while snowball_queue and len(candidate_queue) < min(60, (args.max_matches - collected_valid) + 15):
                next_p = snowball_queue.popleft()
                if next_p in queried_puuids:
                    continue
                snowball_used += 1
                _, added = fetch_user_candidates(next_p, count=12)
                refilled += added
                if snowball_used >= 25:
                    break
            if not candidate_queue:
                break
            print(f"  · [현역 스노우볼 확장] 방금 수집한 경기 참가자에서 신규 후보 {refilled}건 추가 확보")

        mid = candidate_queue.popleft()
        inspected += 1
        m_json = client.get_json(f"{REGIONAL_HOST}/lol/match/v5/matches/{urllib.parse.quote(mid)}", use_api_key=True)
        rec = extract_top_match_record(m_json, num_to_ko, en_to_ko)
        if rec and ingest_match_into_history(history, rec):
            collected_valid += 1
            patch_counts[rec["patch"]] += 1
            for pp in rec.get("participantPuuids", []):
                if pp not in snowball_seen and len(snowball_queue) < 200:
                    snowball_seen.add(pp)
                    snowball_queue.append(pp)
            if collected_valid % 20 == 0:
                print(f"  · 진행률: 유효 탑 매치 {collected_valid}/{args.max_matches}판 수집 완료 (API 호출 {client.total_requests}회)")

    dist_str = ", ".join(f"{p}={cnt}판" for p, cnt in patch_counts.most_common()) or "없음"
    sb_note = f" · 스노우볼 {snowball_used}명" if snowball_used > 0 else ""
    print(
        f"  · 수집 종료: 조회 {inspected}건 중 유효 탑 1:1 경기 {collected_valid}판 신규 반영 "
        f"(패치 분포: {dist_str}{sb_note} / 총 API 호출 {client.total_requests}회)"
    )

    # 4) 저장 및 data_top.js / index.html 갱신
    save_history(args.history, history)
    today_tag = datetime.date.today().strftime("%Y%m%d")
    meta["dataVersion"] = f"2.4.1-{today_tag}"
    meta, champs, summary = aggregate_and_merge(meta, ext, champs, history, current_patch)
    write_updated_data_js(args.data_js, meta, ext, champs)
    sync_index_html_cache_tag(args.index_html, meta["dataVersion"])

    print(f"[4/4] 완료! 패치={summary['activePatch']}, 누적판수={summary['totalPatchMatches']}, 통계갱신챔프={summary['updatedChamps']}종, 매치업={summary['updatedMatchups']}건")


if __name__ == "__main__":
    main()
