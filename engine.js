/**
 * BANPICK - 순수 계산 & 분석 엔진 (engine.js v2.3.0)
 * - DOM / HTML과 완전히 분리된 순수 연산 모듈 (향후 UI 교체 및 미드·바텀 확장 공용)
 * - 티켓 1 반영: 50:50 평균 합산 폐기 -> 2축 분리 카운터 판정(승률 축 / 라인전 축)
 *   · 승률(+) & 라인전(+) -> 🔥 라인전 압도 (정석 카운터)
 *   · 승률(+) & 라인전(-) -> ⏳ 중후반 역전 (정식 카운터 인정, 초반 사림 안내)
 *   · 승률(-) & 라인전(+) -> ⚠ 초반 압박 주의 (정식 카운터 제외, 주의 섹션 분리)
 */
window.BANPICK_ENGINE = (function () {
  const VERSION = "2.3.0";

  const TIER_BASE = { "OP": 95, "1티어": 83, "2티어": 69, "3티어": 55, "4티어": 41, "5티어": 28 };
  const TIER_ORDER = { "OP": 0, "1티어": 1, "2티어": 2, "3티어": 3, "4티어": 4, "5티어": 5 };
  const ENEMY_THREAT_WEIGHT = { "OP": 1.35, "1티어": 1.20, "2티어": 1.0, "3티어": 0.8, "4티어": 0.65, "5티어": 0.5 };
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

    // 2) 승률 미검증 + 라인전 압박 수치만 있을 때 (예: 15분 골드 격차 단독 지표)
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

    // 3) API 라인전 수치가 아직 비어 있을 때: 수동 성향 태그 폴백
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
        const t = raw[target].tier;
        snipeRaw += (SNIPE_WEIGHT[t] || [4, 2])[0];
        if (t === "OP" || t === "1티어") {
          metaTargets.push({ name: target, tier: t, type: "hard" });
        }
      });
      snipedSoft.forEach((target) => {
        const t = raw[target].tier;
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

  return {
    VERSION,
    computeTopAnalytics,
    evaluateMatchupTwoAxis,
    diagnosePool,
    getChosung,
    normalizeSearch
  };
})();
