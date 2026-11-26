/**
 * BANPICK - 순수 계산 & 분석 엔진 (engine.js v2.3.3)
 * - DOM / HTML과 완전히 분리된 순수 연산 모듈 (향후 UI 교체 및 미드·바텀 확장 공용)
 * - 티켓 1 반영: 50:50 평균 합산 폐기 -> 2축 분리 카운터 판정(승률 축 / 라인전 축)
 *   · 승률(+) & 라인전(+) -> 🔥 라인전 압도 (정석 카운터)
 *   · 승률(+) & 라인전(-) -> ⏳ 중후반 역전 (정식 카운터 인정, 초반 사림 안내)
 *   · 승률(-) & 라인전(+) -> ⚠ 초반 압박 주의 (정식 카운터 제외, 주의 섹션 분리)
 */
window.BANPICK_ENGINE = (function () {
  const VERSION = "2.3.3";

  const TIER_BASE = { "OP": 95, "1티어": 83, "2티어": 69, "3티어": 55, "4티어": 41, "5티어": 28 };
  const TIER_ORDER = { "OP": 0, "1티어": 1, "2티어": 2, "3티어": 3, "4티어": 4, "5티어": 5 };
  const ENEMY_THREAT_WEIGHT = { "OP": 1.35, "1티어": 1.20, "2티어": 1.0, "3티어": 0.8, "4티어": 0.65, "5티어": 0.5 };
  const TIER_FREQ_WEIGHT = { "OP": 1.48, "1티어": 1.28, "2티어": 1.0, "3티어": 0.72, "4티어": 0.48, "5티어": 0.32 };
  const SNIPE_WEIGHT = {
    "OP": [18, 10],
    "1티어": [13, 7],
    "2티어": [8, 4],
    "3티어": [4, 2],
    "4티어": [2, 1],
    "5티어": [1, 0.5]
  };

  const DEFAULT_ARCHETYPES = {
    lane_dominate: "🔥 라인전 압도",
    late_turnaround: "⏳ 중후반 역전",
    lane_trap: "⚠ 초반 압박 주의"
  };

  const CHOSUNG = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  function getChosung(str) {
    let res = "";
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i) - 0xAC00;
      if (code >= 0 && code <= 11171) {
        res += CHOSUNG[Math.floor(code / 588)];
      } else {
        res += str[i];
      }
    }
    return res;
  }

  function normalizeSearch(str) {
    return String(str || "").toLowerCase().replace(/\s+/g, "");
  }

  function scoreToGrade(score) {
    if (score >= 76) return "S";
    if (score >= 63) return "A";
    if (score >= 50) return "B";
    if (score >= 36) return "C";
    return "D";
  }

  function scoreToUnifiedTier(score, fallbackTier) {
    if (fallbackTier) return fallbackTier;
    if (score >= 90) return "OP";
    if (score >= 78) return "1티어";
    if (score >= 64) return "2티어";
    if (score >= 50) return "3티어";
    if (score >= 36) return "4티어";
    return "5티어";
  }

  /**
   * 2축 분리 카운터 판정기 (승률 축과 라인전 축을 절대 평균 내지 않고 분리 유지)
   * - mStat: 대상 챔피언 입장에서 상대(카운터 후보)를 만났을 때의 통계
   *   (wr < 50 또는 gd15 < 0 일수록 상대가 우세)
   * - 반환값: { archetype, label, winState, laneState, isOfficialCounter, source }
   */
  function evaluateMatchupTwoAxis(mStat, counterModel) {
    if (!mStat) return null;
    const labels = (counterModel && counterModel.archetypes) || DEFAULT_ARCHETYPES;

    // Axis 1: 게임 승률 / Win Delta (상대 기준 플러스 = 상대가 게임 승리 우세)
    let winAxis = null;
    if (mStat.delta2 != null) {
      winAxis = -mStat.delta2; // delta2가 음수면 대상이 불리 -> 상대 우세(+)
    } else if (mStat.wr != null) {
      winAxis = 50 - mStat.wr; // 대상 wr이 42%면 상대 우세(+8)
    }
    const winState = winAxis === null ? null : (winAxis >= 1.5 ? "+" : (winAxis <= -1.5 ? "-" : "0"));

    // Axis 2: 라인전 주도권 (첫 포탑 · 채굴 · 솔킬 · CS 격차 · 15분 골드 격차)
    const laneParts = [];
    if (mStat.gd15 != null) laneParts.push(Math.max(-1, Math.min(1, (-mStat.gd15) / 1000)));
    if (mStat.firstTower != null) laneParts.push(Math.max(-1, Math.min(1, (50 - mStat.firstTower) / 25)));
    if (mStat.plates != null) laneParts.push(Math.max(-1, Math.min(1, (-mStat.plates) / 1.5)));
    if (mStat.soloKill != null) laneParts.push(Math.max(-1, Math.min(1, (-mStat.soloKill) / 0.7)));
    if (mStat.csAdv != null) laneParts.push(Math.max(-1, Math.min(1, (-mStat.csAdv) / 20)));

    const laneAxis = laneParts.length
      ? laneParts.reduce((a, b) => a + b, 0) / laneParts.length
      : null;
    const laneState = laneAxis === null ? null : (laneAxis >= 0.15 ? "+" : (laneAxis <= -0.15 ? "-" : "0"));

    // 1) API 2축 수치가 모두 존재할 때: 자동 판정 (최우선)
    if (winState !== null && laneState !== null) {
      if (winState === "+" && laneState === "-") {
        return {
          archetype: "late_turnaround",
          label: labels.late_turnaround,
          winState,
          laneState,
          isOfficialCounter: true,
          source: "auto_2axis"
        };
      }
      if (winState === "+" && (laneState === "+" || laneState === "0")) {
        return {
          archetype: "lane_dominate",
          label: labels.lane_dominate,
          winState,
          laneState,
          isOfficialCounter: true,
          source: "auto_2axis"
        };
      }
      if (winState !== "+" && laneState === "+") {
        return {
          archetype: "lane_trap",
          label: labels.lane_trap,
          winState,
          laneState,
          isOfficialCounter: false,
          source: "auto_2axis"
        };
      }
    }

    // 2) API 2축 중 한쪽 수치가 비어 있을 때: 수동 검증 성향 태그 우선 적용
    //    (예: 제이스 vs 이렐리아처럼 정식 카운터로 확정됐으나 현재 gd15만 입력된 매치업 보호)
    if (mStat.archetype && labels[mStat.archetype]) {
      return {
        archetype: mStat.archetype,
        label: labels[mStat.archetype],
        winState,
        laneState,
        isOfficialCounter: mStat.archetype !== "lane_trap",
        source: "manual_fallback"
      };
    }

    // 3) 성향 태그 없이 라인전 압박 수치만 단독으로 들어왔을 때: 초반 압박 주의로 분류
    if (winState === null && laneState === "+") {
      return {
        archetype: "lane_trap",
        label: labels.lane_trap,
        winState: null,
        laneState: "+",
        isOfficialCounter: false,
        source: "auto_lane_only"
      };
    }

    return null;
  }

  function computeTopAnalytics(topBundle) {
    const meta = topBundle.meta || {};
    const raw = topBundle.champions || {};
    const external = topBundle.externalChampions || {};
    const names = Object.keys(raw);
    const priorGames = (meta.rosterCutline && meta.rosterCutline.bayesianPriorGames) || 200;
    const avgWr = meta.tierAvgWinRate || 51.8;
    const counterModel = meta.counterModel || {
      type: "two_axis_separated",
      archetypes: DEFAULT_ARCHETYPES
    };

    // Build reverse matchup map: who does champion X counter?
    // (2-Axis rule: lane_trap is excluded from official counters; late_turnaround IS included!)
    const effectiveHardMap = {};
    const effectiveSoftMap = {};
    const reverseHard = {};
    const reverseSoft = {};
    names.forEach((n) => {
      reverseHard[n] = [];
      reverseSoft[n] = [];
    });

    names.forEach((enemy) => {
      const c = raw[enemy];
      const eHard = (c.hard || []).filter((h) => {
        const ev = evaluateMatchupTwoAxis(c.matchupStats && c.matchupStats[h], counterModel);
        return !(ev && ev.isOfficialCounter === false);
      });
      const eSoft = (c.counter || []).filter((s) => {
        const ev = evaluateMatchupTwoAxis(c.matchupStats && c.matchupStats[s], counterModel);
        return !(ev && ev.isOfficialCounter === false);
      });
      effectiveHardMap[enemy] = eHard;
      effectiveSoftMap[enemy] = eSoft;

      eHard.forEach((h) => {
        if (reverseHard[h]) reverseHard[h].push(enemy);
      });
      eSoft.forEach((s) => {
        if (reverseSoft[s]) reverseSoft[s].push(enemy);
      });
    });

    const items = names.map((name) => {
      const c = raw[name];
      const rosterType = c.rosterType || "main";
      const effectiveHard = effectiveHardMap[name] || [];
      const effectiveSoft = effectiveSoftMap[name] || [];

      // Pre-evaluate 2-axis metadata for all documented matchups of this champion
      const matchupMeta = {};
      Object.keys(c.matchupStats || {}).forEach((opp) => {
        const ev = evaluateMatchupTwoAxis(c.matchupStats[opp], counterModel);
        if (ev) matchupMeta[opp] = ev;
      });

      // 1) Blind Pick Stability (0~100)
      let hardPenalty = 0;
      const threatDetails = [];
      effectiveHard.forEach((h) => {
        const t = raw[h] ? raw[h].tier : "3티어";
        hardPenalty += 11.0 * (ENEMY_THREAT_WEIGHT[t] || 0.8);
        threatDetails.push({ name: h, tier: t, type: "hard" });
      });

      let softPenalty = 0;
      effectiveSoft.forEach((s) => {
        const t = raw[s] ? raw[s].tier : "3티어";
        softPenalty += 3.8 * (ENEMY_THREAT_WEIGHT[t] || 0.8);
      });

      const tierResilience = ((TIER_BASE[c.tier] || 55) - 65) * 0.28;
      const jokerBlindPenalty = rosterType === "joker" ? -7.0 : 0.0;
      const blindScore = Math.max(12, Math.min(99, +(95 - hardPenalty - softPenalty + tierResilience + jokerBlindPenalty).toFixed(1)));

      threatDetails.sort((a, b) => (TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9));

      // 2) Counter-Pick Joker Value (0~100) — NO joker penalty!
      let snipeRaw = 0;
      const snipedHard = reverseHard[name] || [];
      const snipedSoft = reverseSoft[name] || [];
      const metaTargets = [];

      snipedHard.forEach((target) => {
        const t = raw[target] ? raw[target].tier : "3티어";
        snipeRaw += (SNIPE_WEIGHT[t] || [4, 2])[0];
        if (t === "OP" || t === "1티어") {
          metaTargets.push({ name: target, tier: t, type: "hard" });
        }
      });
      snipedSoft.forEach((target) => {
        const t = raw[target] ? raw[target].tier : "3티어";
        snipeRaw += (SNIPE_WEIGHT[t] || [4, 2])[1];
        if (t === "OP" || t === "1티어") {
          metaTargets.push({ name: target, tier: t, type: "soft" });
        }
      });
      metaTargets.sort((a, b) => {
        if (a.type !== b.type) return a.type === "hard" ? -1 : 1;
        return (TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9);
      });

      const counterScore = Math.min(99, +(15 + 84 * (1 - Math.exp(-snipeRaw / 75.0))).toFixed(1));

      // 3) Comprehensive Meta Score (0~100)
      const stats = c.stats || {};
      let metaScore;
      let smoothedWr = null;
      let usedApiStats = false;

      if (stats.wr != null && stats.games) {
        usedApiStats = true;
        smoothedWr = +(((stats.wr * stats.games) + (avgWr * priorGames)) / (stats.games + priorGames)).toFixed(2);
        const winDelta = smoothedWr - avgWr;
        const pr = stats.pr || 1.0;
        const br = stats.br || 0.0;
        metaScore = Math.max(15, Math.min(99, +(65 + winDelta * 7.5 + Math.min(12, pr * 0.9) + Math.min(8, br * 0.35)).toFixed(1)));
      } else {
        const base = TIER_BASE[c.tier] || 55;
        const pfStatus = c.patchFlag && c.patchFlag.status;
        const patchAdj = (pfStatus === "meta_up" || pfStatus === "buff") ? 2.5 : (pfStatus === "nerf" ? -2.5 : 0);
        const utilityAdj = ((blindScore - 60) * 0.08) + ((counterScore - 55) * 0.08);
        const jokerMetaAdj = rosterType === "joker" ? -3.0 : 0.0;
        metaScore = Math.max(15, Math.min(99, +(base + patchAdj + utilityAdj + jokerMetaAdj).toFixed(1)));
      }

      const unifiedTier = scoreToUnifiedTier(metaScore, usedApiStats ? null : c.tier);

      const rawTokens = [
        name,
        getChosung(name),
        c.id || "",
        ...(c.aliases || []),
        ...(c.aliases || []).map((a) => getChosung(a))
      ];
      const searchTokens = rawTokens.map((t) => normalizeSearch(t)).join(" ");

      return {
        name,
        id: c.id,
        rosterType,
        tier: unifiedTier,
        damageType: c.damageType,
        rangeType: c.rangeType,
        roleTags: c.roleTags || [],
        difficulty: c.difficulty,
        timing: c.timing,
        playstyleTags: c.playstyleTags || [],
        patchFlag: c.patchFlag || { status: null, label: null },
        hard: effectiveHard,
        counter: effectiveSoft,
        matchupStats: c.matchupStats || {},
        matchupMeta,
        note: c.note || "",
        stats,
        smoothedWr,
        usedApiStats,
        metaScore,
        blindScore,
        blindGrade: scoreToGrade(blindScore),
        counterScore,
        counterGrade: scoreToGrade(counterScore),
        worstThreats: threatDetails.slice(0, 3),
        snipedHard,
        snipedSoft,
        metaTargets,
        searchTokens
      };
    });

    const byName = {};
    items.forEach((it) => { byName[it.name] = it; });

    return { meta, items, byName, external, counterModel };
  }

  function diagnosePool(pool, byName, items) {
    if (!pool.length) return null;
    const poolSet = new Set(pool);
    const topMeta = items.filter((it) => it.tier === "OP" || it.tier === "1티어");
    let coveredCount = 0;
    topMeta.forEach((enemy) => {
      const hasCounter = enemy.hard.some((c) => poolSet.has(c)) || enemy.counter.some((c) => poolSet.has(c));
      if (hasCounter) coveredCount++;
    });
    const hasAP = pool.some((n) => byName[n] && (byName[n].damageType === "AP" || byName[n].damageType === "혼합"));
    const hasRangeAnswer = pool.some((n) => {
      const it = byName[n];
      if (!it) return false;
      if (it.rangeType === "원거리") return true;
      return it.snipedHard.some((t) => byName[t] && byName[t].rangeType === "원거리");
    });
    return {
      count: pool.length,
      topMetaTotal: topMeta.length,
      coveredCount,
      coveragePct: topMeta.length ? Math.round((coveredCount / topMeta.length) * 100) : 0,
      hasAP,
      hasRangeAnswer
    };
  }


  /**
   * 티켓 2: 상대 선픽(enemyName) 대비 내 챔프폭 4단계 대응 판정 + 전원 불리 시 '피해 최소화(차악) 픽' 자동 선정
   * - 1순위 optimal: 내 챔프가 상대의 하드(7:3) 또는 일반(6:4) 카운터
   * - 2순위 neutral: 서로 카운터 관계 없음 (단, 상대가 초반 압박(lane_trap)이면 주의 배지 부착)
   * - 3순위 disadvantage: 상대가 내 챔프의 일반 카운터 (6:4 불리)
   * - 4순위 forbidden: 상대가 내 챔프의 하드카운터 (7:3 역상성 금지)
   * - 자기 자신은 추천 후보에서 제외 (상대가 내 주력 챔프를 뺏어간 상황 대응)
   */
  function evaluatePoolVsEnemy(pool, enemyName, byName, counterModel) {
    const enemy = enemyName && byName && byName[enemyName];
    if (!enemy) return null;

    if (!pool || !pool.length) {
      return {
        state: "empty",
        verdict: "empty",
        enemyName,
        excludedSelf: false,
        allHardCountered: false,
        bestPick: null,
        candidates: [],
        tiers: { optimal: [], neutral: [], disadvantage: [], forbidden: [] }
      };
    }

    const excludedSelf = pool.includes(enemyName);
    const available = pool.filter((n) => n !== enemyName && byName[n]);

    if (!available.length) {
      return {
        state: "only_self",
        verdict: "only_self",
        enemyName,
        excludedSelf,
        allHardCountered: false,
        bestPick: null,
        candidates: [],
        tiers: { optimal: [], neutral: [], disadvantage: [], forbidden: [] }
      };
    }

    const tiers = { optimal: [], neutral: [], disadvantage: [], forbidden: [] };

    available.forEach((pName) => {
      const pObj = byName[pName];
      const isHardCounter = enemy.hard.includes(pName);
      const isSoftCounter = !isHardCounter && enemy.counter.includes(pName);
      const isHardCountered = pObj.hard.includes(enemyName);
      const isSoftCountered = !isHardCountered && pObj.counter.includes(enemyName);

      // 상대 입장 데이터 (내가 카운터일 때 성향·승률 참조)
      const vsEnemyStat = enemy.matchupStats && enemy.matchupStats[pName];
      const vsEnemyMeta = (enemy.matchupMeta && enemy.matchupMeta[pName]) ||
        (vsEnemyStat ? evaluateMatchupTwoAxis(vsEnemyStat, counterModel) : null);

      // 내 입장 데이터 (내가 불리/초반압박일 때 생존 팁 참조 — 시점 일치!)
      const myStat = pObj.matchupStats && pObj.matchupStats[enemyName];
      const myMeta = (pObj.matchupMeta && pObj.matchupMeta[enemyName]) ||
        (myStat ? evaluateMatchupTwoAxis(myStat, counterModel) : null);

      const isTeamfight = (pObj.playstyleTags || []).includes("#한타");
      const isTank = (pObj.roleTags || []).includes("탱커");
      const isRange = pObj.rangeType === "원거리";
      const diffBonus = pObj.difficulty === "쉬움" ? 6 : (pObj.difficulty === "보통" ? 3 : 0);

      if (isHardCounter || isSoftCounter) {
        const strength = isHardCounter ? "hard" : "soft";
        const winHint = vsEnemyMeta && vsEnemyMeta.archetype === "late_turnaround"
          ? "초반 무리 금지 · 6렙/1코어 이후 역전"
          : (vsEnemyMeta && vsEnemyMeta.archetype === "lane_dominate"
            ? "초반 라인전부터 주도권 잡고 압박"
            : null);

        tiers.optimal.push({
          name: pName,
          tier: 1,
          tierKey: "optimal",
          tierLabel: isHardCounter ? "최적 후픽 (7:3)" : "우세 후픽 (6:4)",
          strength,
          archetype: vsEnemyMeta ? vsEnemyMeta.archetype : null,
          archetypeLabel: vsEnemyMeta ? vsEnemyMeta.label : null,
          enemyWr: vsEnemyStat && vsEnemyStat.wr != null ? +(100 - vsEnemyStat.wr).toFixed(1) : null,
          hint: winHint,
          rankScore: (isHardCounter ? 200 : 100) + pObj.metaScore * 0.6 + pObj.counterScore * 0.4,
          metaScore: pObj.metaScore,
          blindScore: pObj.blindScore,
          difficulty: pObj.difficulty
        });
      } else if (isHardCountered || isSoftCountered) {
        const isHardRev = isHardCountered;
        const dcReasons = [];
        if (!isHardRev) dcReasons.push("6:4 일반 불리");
        else dcReasons.push("7:3 하드 역상성");
        if (isTank && isTeamfight) dcReasons.push("탱커·한타 기여");
        else if (isTeamfight) dcReasons.push("한타 기여");
        else if (isTank) dcReasons.push("탱커 버티기");
        else if (isRange) dcReasons.push("원거리 파밍");
        else if (pObj.difficulty === "쉬움") dcReasons.push("안정적 운용");

        const fallbackSurvivalTip = (isTank || isTeamfight)
          ? "라인전 킬 욕심을 버리고 경험치·CS 손실만 줄이며 한타·오브젝트 타이밍 1인분을 노리세요."
          : (pObj.timing === "후반"
            ? "초반 딜교를 피하고 포탑 앞 파밍에 집중해 1~2코어 이후 반전을 노리세요."
            : "초반 무리한 맞다이를 피하고 정글 콜이나 합류전으로 변수를 만드세요.");

        const damageControlScore =
          (isHardRev ? 0 : 100) +
          (isTeamfight ? 18 : 0) +
          (isTank ? 14 : 0) +
          (isRange ? 6 : 0) +
          diffBonus +
          pObj.blindScore * 0.25 +
          pObj.metaScore * 0.15;

        const entry = {
          name: pName,
          tier: isHardRev ? 4 : 3,
          tierKey: isHardRev ? "forbidden" : "disadvantage",
          tierLabel: isHardRev ? "역상성 금지 (3:7)" : "불리 · 주의 (4:6)",
          strength: isHardRev ? "hard_rev" : "soft_rev",
          archetype: myMeta ? myMeta.archetype : null,
          archetypeLabel: myMeta ? myMeta.label : null,
          myWr: myStat && myStat.wr != null ? myStat.wr : null,
          survivalTip: (myStat && myStat.tip) ? myStat.tip : fallbackSurvivalTip,
          hasCustomTip: Boolean(myStat && myStat.tip),
          damageControlScore: +damageControlScore.toFixed(1),
          damageControlReasons: dcReasons,
          rankScore: +damageControlScore.toFixed(1),
          metaScore: pObj.metaScore,
          blindScore: pObj.blindScore,
          difficulty: pObj.difficulty
        };

        if (isHardRev) tiers.forbidden.push(entry);
        else tiers.disadvantage.push(entry);
      } else {
        const laneTrapWarning = Boolean(myMeta && myMeta.archetype === "lane_trap");
        tiers.neutral.push({
          name: pName,
          tier: 2,
          tierKey: "neutral",
          tierLabel: laneTrapWarning ? "반반 (초반 압박 주의)" : "차선책 · 반반 (5:5)",
          strength: "neutral",
          laneTrapWarning,
          archetype: laneTrapWarning ? "lane_trap" : null,
          archetypeLabel: laneTrapWarning ? myMeta.label : null,
          survivalTip: laneTrapWarning && myStat && myStat.tip ? myStat.tip : null,
          rankScore: +(pObj.blindScore * 0.6 + pObj.metaScore * 0.4 - (laneTrapWarning ? 10 : 0)).toFixed(1),
          metaScore: pObj.metaScore,
          blindScore: pObj.blindScore,
          difficulty: pObj.difficulty
        });
      }
    });

    tiers.optimal.sort((a, b) => b.rankScore - a.rankScore || b.metaScore - a.metaScore);
    tiers.neutral.sort((a, b) => b.rankScore - a.rankScore || b.blindScore - a.blindScore);
    tiers.disadvantage.sort((a, b) => b.damageControlScore - a.damageControlScore);
    tiers.forbidden.sort((a, b) => b.damageControlScore - a.damageControlScore);

    let verdict = "neutral";
    let bestPick = null;
    let allHardCountered = false;

    if (tiers.optimal.length > 0) {
      verdict = "optimal";
      bestPick = tiers.optimal[0];
    } else if (tiers.neutral.length > 0) {
      verdict = "neutral";
      bestPick = tiers.neutral[0];
    } else {
      verdict = "damage_control";
      const fallbackPool = [...tiers.disadvantage, ...tiers.forbidden].sort(
        (a, b) => b.damageControlScore - a.damageControlScore
      );
      bestPick = fallbackPool[0] || null;
      allHardCountered = tiers.disadvantage.length === 0 && tiers.forbidden.length > 0;
    }

    const candidates = [
      ...tiers.optimal,
      ...tiers.neutral,
      ...tiers.disadvantage,
      ...tiers.forbidden
    ];

    return {
      state: "ready",
      verdict,
      enemyName,
      excludedSelf,
      allHardCountered,
      bestPick,
      candidates,
      tiers
    };
  }


  /**
   * 티켓 3: 내 챔프폭 종합 코치 (필밴 Top 3 + Greedy 1픽 보완 추천 + 구조 약점 진단)
   * - options: { beginnerOnly: boolean, includeJoker: boolean }
   * - 필밴 Top 3: 내 챔프폭을 가장 많이 역상성으로 망가뜨리면서 자주 만나는(티어/픽률 가중) 적 Top 3
   *   (이미 내 폭에 7:3 하드카운터가 있으면 밴 우선순위 대폭 하향)
   * - Greedy 보완 픽 Top 3: 1명 추가 시 OP·1티어 대응률 상승폭(+N%) + 전원불리 구출 + 올AD/원거리 약점 해소 종합 점수
   */
  function buildPoolCoach(pool, analytics, options) {
    if (!pool || !pool.length || !analytics || !analytics.items) return null;

    const opts = Object.assign({ beginnerOnly: false, includeJoker: true }, options || {});
    const byName = analytics.byName;
    const items = analytics.items;
    const counterModel = analytics.counterModel;
    const poolSet = new Set(pool.filter((n) => byName[n]));
    const cleanPool = Array.from(poolSet);
    if (!cleanPool.length) return null;

    const diag = diagnosePool(cleanPool, byName, items);
    const topMeta = items.filter((it) => it.tier === "OP" || it.tier === "1티어");

    const coveredTopMeta = new Set();
    topMeta.forEach((enemy) => {
      if (enemy.hard.some((c) => poolSet.has(c)) || enemy.counter.some((c) => poolSet.has(c))) {
        coveredTopMeta.add(enemy.name);
      }
    });

    // Check blind-pick safety across pool
    const maxBlindScore = cleanPool.reduce((mx, n) => Math.max(mx, byName[n].blindScore), 0);
    const hasSafeBlind = maxBlindScore >= 63; // A등급 이상 선픽 보유 여부

    const warnings = [];
    if (!diag.hasAP) warnings.push({ key: "all_ad", label: "올 AD 조합 취약 (AP·혼합 없음)" });
    if (!diag.hasRangeAnswer) warnings.push({ key: "no_range", label: "원거리 견제 대응 약함" });
    if (!hasSafeBlind) warnings.push({ key: "no_blind", label: "안전한 선픽(A등급↑) 부재" });

    // 1) 필밴 Top 3 & 현재 전원 불리(damage_control) 적 목록 동시 산출
    const banCandidates = [];
    const allBadEnemies = new Set();

    items.forEach((enemy) => {
      if (poolSet.has(enemy.name)) return;
      const pv = evaluatePoolVsEnemy(cleanPool, enemy.name, byName, counterModel);
      if (!pv || pv.state !== "ready") return;

      const hardHitNames = pv.tiers.forbidden.map((c) => c.name);
      const softHitNames = pv.tiers.disadvantage.map((c) => c.name);
      const hardHitCount = hardHitNames.length;
      const softHitCount = softHitNames.length;
      const isAllBad = pv.verdict === "damage_control";

      if (isAllBad && (enemy.tier === "OP" || enemy.tier === "1티어" || enemy.tier === "2티어")) {
        allBadEnemies.add(enemy.name);
      }

      const freqWeight = (enemy.stats && enemy.stats.pr != null)
        ? Math.min(1.6, Math.max(0.4, 0.55 + enemy.stats.pr * 0.12))
        : (TIER_FREQ_WEIGHT[enemy.tier] || 0.7) * (enemy.rosterType === "joker" ? 0.65 : 1.0);

      let rawThreat = 0;
      let isMetaFallback = false;

      if (hardHitCount > 0 || softHitCount > 0) {
        const hardRatio = hardHitCount / cleanPool.length;
        rawThreat =
          hardHitCount * 24 +
          softHitCount * 11 +
          (isAllBad ? 40 : 0) +
          (pv.allHardCountered ? 22 : 0) +
          (hardRatio >= 0.5 ? 14 : 0);

        // 내 폭에 이미 확실한 카운터가 있다면 밴할 이유가 크게 줄어듦
        if (pv.verdict === "optimal") {
          const isHardAns = pv.bestPick && pv.bestPick.strength === "hard";
          rawThreat *= isHardAns ? 0.22 : 0.48;
        }
      } else if (pv.verdict === "neutral" && (enemy.tier === "OP" || enemy.tier === "1티어")) {
        // 역상성이 아예 없는 넓은 폭일 때만 메타 OP 견제 폴백
        rawThreat = enemy.metaScore * 0.18;
        isMetaFallback = true;
      }

      if (rawThreat <= 0) return;

      const banScore = +(rawThreat * freqWeight).toFixed(1);
      const reasons = [];
      if (isAllBad) {
        reasons.push(pv.allHardCountered ? "전원 3:7 역상성" : "전원 불리");
      } else if (hardHitCount > 0) {
        reasons.push(`하드 ${hardHitCount}명 저격 (${hardHitNames.slice(0, 2).join("·")})`);
      } else if (softHitCount > 0) {
        reasons.push(`불리 ${softHitCount}명 (${softHitNames.slice(0, 2).join("·")})`);
      } else if (isMetaFallback) {
        reasons.push("미대응 상위 메타");
      }

      if (pv.verdict === "optimal" && pv.bestPick) {
        reasons.push(`${pv.bestPick.name} 대응 가능`);
      } else if (enemy.tier === "OP" || enemy.tier === "1티어") {
        reasons.push(`${enemy.tier} 고빈도`);
      }

      banCandidates.push({
        name: enemy.name,
        tier: enemy.tier,
        rosterType: enemy.rosterType,
        banScore,
        isAllBad,
        hardHitCount,
        softHitCount,
        hardHitNames,
        softHitNames,
        reasons
      });
    });

    banCandidates.sort((a, b) => b.banScore - a.banScore || b.hardHitCount - a.hardHitCount);
    const mustBans = banCandidates.slice(0, 3);

    // 2) Greedy 1픽 보완 추천 (Top 3)
    const recCandidates = [];
    const currentCovPct = diag.coveragePct;

    items.forEach((cand) => {
      if (poolSet.has(cand.name)) return;
      if (opts.beginnerOnly && cand.difficulty === "어려움") return;
      if (!opts.includeJoker && cand.rosterType === "joker") return;

      const newlyCoveredHard = [];
      const newlyCoveredSoft = [];

      topMeta.forEach((enemy) => {
        if (coveredTopMeta.has(enemy.name)) return;
        if (enemy.hard.includes(cand.name)) newlyCoveredHard.push(enemy.name);
        else if (enemy.counter.includes(cand.name)) newlyCoveredSoft.push(enemy.name);
      });

      const newlyCoveredNames = [...newlyCoveredHard, ...newlyCoveredSoft].sort((a, b) => {
        const aOwn = poolSet.has(a) ? 1 : 0;
        const bOwn = poolSet.has(b) ? 1 : 0;
        return aOwn - bOwn;
      });
      const extHardCnt = newlyCoveredHard.filter((n) => !poolSet.has(n)).length;
      const ownHardCnt = newlyCoveredHard.length - extHardCnt;
      const extSoftCnt = newlyCoveredSoft.filter((n) => !poolSet.has(n)).length;
      const ownSoftCnt = newlyCoveredSoft.length - extSoftCnt;
      const afterCoveredCount = coveredTopMeta.size + newlyCoveredNames.length;
      const afterCoveragePct = topMeta.length ? Math.round((afterCoveredCount / topMeta.length) * 100) : 100;
      const gainPct = Math.max(0, afterCoveragePct - currentCovPct);

      // 전원 불리 적 구출 여부 (최소 5:5 반반 이상으로 끌어올려 주거나 카운터 쳐줌)
      const rescuedAllBad = [];
      allBadEnemies.forEach((enemyName) => {
        const enemy = byName[enemyName];
        if (!enemy) return;
        const countersEnemy = enemy.hard.includes(cand.name) || enemy.counter.includes(cand.name);
        const notCounteredByEnemy = !cand.hard.includes(enemyName) && !cand.counter.includes(enemyName);
        if (countersEnemy || notCounteredByEnemy) {
          rescuedAllBad.push(enemyName);
        }
      });

      const fixesAP = !diag.hasAP && (cand.damageType === "AP" || cand.damageType === "혼합");
      const fixesRange = !diag.hasRangeAnswer && (
        cand.rangeType === "원거리" ||
        cand.snipedHard.some((t) => byName[t] && byName[t].rangeType === "원거리")
      );
      const fixesBlind = !hasSafeBlind && cand.blindScore >= 68;

      const addsRealValue = newlyCoveredNames.length > 0 || rescuedAllBad.length > 0 || fixesAP || fixesRange || fixesBlind;
      if (!addsRealValue && coveredTopMeta.size < topMeta.length) return;

      const recScore = +(
        extHardCnt * 28 + ownHardCnt * 12 +
        extSoftCnt * 18 + ownSoftCnt * 8 +
        rescuedAllBad.length * 12 +
        (fixesAP ? 16 : 0) +
        (fixesRange ? 14 : 0) +
        (fixesBlind ? 12 : 0) +
        cand.metaScore * 0.22 +
        cand.blindScore * 0.12 -
        (cand.rosterType === "joker" ? 6 : 0)
      ).toFixed(1);

      const tags = [];
      if (gainPct > 0) tags.push(`대응률 +${gainPct}%`);
      if (rescuedAllBad.length > 0) tags.push(`전원불리 ${rescuedAllBad.length}종 해소`);
      if (fixesAP) tags.push("AP 보강");
      if (fixesRange) tags.push("원거리 대응");
      if (fixesBlind) tags.push("선픽 보강");
      if (!tags.length) tags.push(`체급 ${cand.metaScore}점`);

      recCandidates.push({
        name: cand.name,
        tier: cand.tier,
        rosterType: cand.rosterType,
        difficulty: cand.difficulty,
        damageType: cand.damageType,
        rangeType: cand.rangeType,
        recScore,
        gainPct,
        afterCoveragePct,
        newlyCoveredNames,
        newlyCoveredHardCount: newlyCoveredHard.length,
        rescuedAllBad,
        fixesAP,
        fixesRange,
        fixesBlind,
        tags
      });
    });

    recCandidates.sort((a, b) => b.recScore - a.recScore || b.gainPct - a.gainPct);
    const recommendations = recCandidates.slice(0, 3);

    return {
      diag,
      hasSafeBlind,
      maxBlindScore,
      warnings,
      allBadCount: allBadEnemies.size,
      mustBans,
      recommendations,
      isFullMetaCovered: coveredTopMeta.size >= topMeta.length,
      filterApplied: {
        beginnerOnly: opts.beginnerOnly,
        includeJoker: opts.includeJoker
      }
    };
  }

  return {
    VERSION,
    computeTopAnalytics,
    evaluateMatchupTwoAxis,
    evaluatePoolVsEnemy,
    diagnosePool,
    buildPoolCoach,
    getChosung,
    normalizeSearch
  };
})();
