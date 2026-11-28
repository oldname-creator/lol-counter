/**
 * BANPICK - LoL 16.23 패치 탑 라인 통합 데이터 (data_top.js v2.4.1-20261128)
 * - 총 65종 탑 챔피언 + 목록 외 조커 픽(1종) 안전 매핑
 * - 스키마 v2.4.1-20261128: Riot API KR 에메랄드+ 자동 수집 + 2축 분리 카운터 & 3패치 표본 적응형
 */

window.BANPICK_DATA = window.BANPICK_DATA || {};

window.BANPICK_DATA.top = {
  meta: {
  "schemaVersion": "2.3.4",
  "lane": "top",
  "patch": "16.23",
  "tierScope": "EMERALD_PLUS",
  "tierAvgWinRate": 50.04,
  "isCollecting": false,
  "updatedAt": "2026-11-28",
  "rosterCutline": {
    "mainMinPickRate": 0.5,
    "jokerMinPickRate": 0.15,
    "newOrReworkMinPickRate": 1.0,
    "bayesianPriorGames": 200
  },
  "dataVersion": "2.4.1-20261128",
  "counterModel": {
    "type": "two_axis_separated",
    "aggregation": "sample_adaptive_3patch",
    "patchWindow": [
      "16.23",
      "16.22",
      "16.21"
    ],
    "defaultPatchWeights": [
      0.55,
      0.3,
      0.15
    ],
    "highSampleThreshold": 1000,
    "highSampleCurrentWeight": 0.8,
    "laningMetrics": [
      "firstTower",
      "plates",
      "soloKill",
      "csAdv",
      "gd15"
    ],
    "archetypes": {
      "lane_dominate": "🔥 라인전 압도",
      "late_turnaround": "⏳ 중후반 역전",
      "lane_trap": "⚠ 초반 압박 주의"
    }
  },
  "totalPatchMatches": 12088
},
  externalChampions: {
  "카르마": {
    "id": "Karma",
    "aliases": [
      "카르마"
    ],
    "damageType": "AP",
    "rangeType": "원거리",
    "roleTags": [
      "메이지",
      "서포터"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#한타"
    ],
    "isExternal": true,
    "rosterType": "joker"
  }
},
  champions: {
  "가렌": {
    "id": "Garen",
    "aliases": [
      "가렌",
      "ㄱㄹ",
      "가붕이"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저",
      "탱커"
    ],
    "difficulty": "쉬움",
    "timing": "중반",
    "playstyleTags": [
      "#사이드",
      "#유동적"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 50.79,
      "pr": 2.62,
      "br": 0.9,
      "games": 317
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "트린다미어",
      "카밀",
      "모데카이저",
      "퀸",
      "제이스",
      "베인"
    ],
    "counter": [
      "다리우스",
      "요릭",
      "세트",
      "티모"
    ],
    "matchupStats": {
      "카밀": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "카밀 패시브 보호막이 빠진 뒤 Q-E로 딜교하고, E(갈고리) 각을 주지 마세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "모데카이저": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "6렙 이후 모데 궁극기 안에서는 정면 맞다이가 밀리므로 짧은 Q-E 후 W로 빠지세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "잭스": {
        "wr": 58.0,
        "delta2": 6.92,
        "gd15": null,
        "games": 50,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.88,
        "soloKill": 1.78,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 54.2,
        "delta2": 3.02,
        "gd15": null,
        "games": 24,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.62,
        "soloKill": 0.67,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 62.5,
        "delta2": 11.0,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.44,
        "soloKill": 2.44,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 크산테·잭스·피오라 후픽 카운터로 가치가 높음",
    "laneExtra": {},
    "rosterType": "main"
  },
  "갱플랭크": {
    "id": "Gangplank",
    "aliases": [
      "갱플",
      "GP",
      "선장"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "스커미셔",
      "딜러"
    ],
    "difficulty": "어려움",
    "timing": "후반",
    "playstyleTags": [
      "#한타",
      "#사이드"
    ],
    "tier": "OP",
    "stats": {
      "wr": 52.28,
      "pr": 5.08,
      "br": 25.22,
      "games": 614
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 탑 1위(OP)",
      "resetHistory": false
    },
    "hard": [
      "제이스",
      "요네",
      "아트록스"
    ],
    "counter": [
      "모데카이저",
      "잭스"
    ],
    "matchupStats": {
      "사이온": {
        "wr": 44.6,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "사이온 Q 차징을 화약통이나 패시브 이속으로 피하고, 귤(W)은 궁극기 에어본 해제에 아끼세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "이렐리아": {
        "wr": 55.9,
        "delta2": 5.91,
        "gd15": null,
        "games": 34,
        "patches": 1,
        "tip": "이렐리아 Q로 화약통을 지우기 쉬우므로 발밑에 통을 미리 깔아두고 4스택 타이밍을 피하세요.",
        "firstTower": null,
        "plates": -3.65,
        "soloKill": -1.03,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "아트록스": {
        "wr": 43.8,
        "delta2": -6.98,
        "gd15": null,
        "games": 32,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.12,
        "soloKill": -0.69,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 35.0,
        "delta2": -17.05,
        "gd15": null,
        "games": 40,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.93,
        "soloKill": -0.68,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 60.0,
        "delta2": 8.07,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.25,
        "soloKill": -0.85,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 42.9,
        "delta2": -9.34,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.43,
        "soloKill": -1.57,
        "csAdv": null,
        "archetype": null
      },
      "모데카이저": {
        "wr": 47.1,
        "delta2": -3.37,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.47,
        "soloKill": -2.53,
        "csAdv": null,
        "archetype": null
      },
      "트린다미어": {
        "wr": 46.7,
        "delta2": -1.99,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -6.4,
        "soloKill": -1.53,
        "csAdv": null,
        "archetype": null
      },
      "올라프": {
        "wr": 60.0,
        "delta2": 10.58,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.6,
        "soloKill": -1.4,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 49.1,
        "delta2": -2.72,
        "gd15": null,
        "games": 16,
        "patches": 3,
        "tip": null,
        "firstTower": null,
        "plates": -1.05,
        "soloKill": -0.24,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 53.3,
        "delta2": 3.22,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.0,
        "soloKill": -0.93,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 탑 1위(OP). 지표상 사이온(55.4%)·이렐리아(52.5%) 승률 우위. 반면 제이스·아트록스·잭스 상대로는 갱플 지표 우세",
    "laneExtra": {},
    "rosterType": "main"
  },
  "그라가스": {
    "id": "Gragas",
    "aliases": [
      "그라",
      "술통",
      "돼지"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "탱커",
      "메이지"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#유동적"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 52.5,
      "pr": 2.65,
      "br": 0.25,
      "games": 320
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "요릭"
    ],
    "counter": [
      "크산테",
      "아트록스"
    ],
    "matchupStats": {
      "요릭": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "요릭 구울에 배치기(E)가 막히므로 벽(W)에 갇혔을 때만 탈출용으로 아끼세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "잭스": {
        "wr": 55.3,
        "delta2": 3.36,
        "gd15": null,
        "games": 38,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.45,
        "soloKill": -0.21,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 51.5,
        "delta2": -0.66,
        "gd15": null,
        "games": 33,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.21,
        "soloKill": -0.12,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "선픽 안정성이 높아 하드 카운터가 적은 편",
    "laneExtra": {},
    "rosterType": "main"
  },
  "그웬": {
    "id": "Gwen",
    "aliases": [
      "그웬",
      "가위"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "스커미셔",
      "브루저"
    ],
    "difficulty": "보통",
    "timing": "후반",
    "playstyleTags": [
      "#사이드",
      "#한타"
    ],
    "tier": "4티어",
    "stats": {
      "wr": 49.19,
      "pr": 2.56,
      "br": 0.77,
      "games": 309
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "트린다미어",
      "워윅",
      "올라프",
      "아칼리",
      "제이스"
    ],
    "counter": [
      "잭스",
      "우르곳"
    ],
    "matchupStats": {
      "크산테": {
        "wr": 56.2,
        "delta2": 5.82,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.69,
        "soloKill": -0.75,
        "csAdv": null,
        "archetype": null
      },
      "사이온": {
        "wr": 41.2,
        "delta2": -7.22,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.35,
        "soloKill": 0.18,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 탑 4~5티어권. 탱커 후픽 전용",
    "laneExtra": {},
    "rosterType": "main"
  },
  "나르": {
    "id": "Gnar",
    "aliases": [
      "나르",
      "메가나르"
    ],
    "damageType": "AD",
    "rangeType": "원거리",
    "roleTags": [
      "브루저",
      "탱커"
    ],
    "difficulty": "어려움",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#사이드"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 50.24,
      "pr": 5.09,
      "br": 2.99,
      "games": 615
    },
    "patchFlag": {
      "status": "buff",
      "label": "26.23 Q 계수 버프",
      "resetHistory": false
    },
    "hard": [
      "이렐리아",
      "카밀",
      "레넥톤",
      "암베사",
      "신지드",
      "잭스"
    ],
    "counter": [
      "사일러스"
    ],
    "matchupStats": {
      "암베사": {
        "wr": 38.9,
        "delta2": -11.61,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": "미니 나르 상태에서 암베사 연속 돌진에 취약하므로 E(폴짝)를 아끼고 분노를 관리하세요.",
        "firstTower": null,
        "plates": -0.28,
        "soloKill": -0.39,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "제이스": {
        "wr": 54.1,
        "delta2": 3.07,
        "gd15": null,
        "games": 37,
        "patches": 1,
        "tip": "제이스 해머 Q 진입 타이밍에 E로 거리를 벌리고 메가 나르 타이밍에 반격하세요.",
        "firstTower": null,
        "plates": -3.89,
        "soloKill": -1.54,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "크산테": {
        "wr": 54.2,
        "delta2": 3.3,
        "gd15": null,
        "games": 59,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.29,
        "soloKill": -0.56,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 58.3,
        "delta2": 7.08,
        "gd15": null,
        "games": 24,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.12,
        "soloKill": 0.04,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 39.1,
        "delta2": -12.79,
        "gd15": null,
        "games": 23,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.74,
        "soloKill": 0.04,
        "csAdv": null,
        "archetype": null
      },
      "사일러스": {
        "wr": 47.6,
        "delta2": -3.76,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.05,
        "soloKill": -1.81,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 42.1,
        "delta2": -8.7,
        "gd15": null,
        "games": 18,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -4.94,
        "soloKill": 0.47,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 26.3,
        "delta2": -22.66,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -4.84,
        "soloKill": -2.0,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 47.4,
        "delta2": -2.36,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.21,
        "soloKill": -0.21,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 28.6,
        "delta2": -20.45,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.05,
        "soloKill": -0.48,
        "csAdv": null,
        "archetype": null
      },
      "신지드": {
        "wr": 40.0,
        "delta2": -8.85,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 7.67,
        "soloKill": 1.87,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 Q 버프. 지표상 암베사(62.5%)·제이스(55.2%)가 최강 카운터",
    "laneExtra": {},
    "rosterType": "main"
  },
  "나서스": {
    "id": "Nasus",
    "aliases": [
      "나서스",
      "개",
      "스택"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저",
      "탱커"
    ],
    "difficulty": "쉬움",
    "timing": "후반",
    "playstyleTags": [
      "#사이드"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 45.88,
      "pr": 2.31,
      "br": 2.48,
      "games": 279
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "크산테",
      "럼블",
      "올라프"
    ],
    "counter": [
      "일라오이",
      "가렌",
      "아트록스"
    ],
    "matchupStats": {
      "말파이트": {
        "wr": 49.2,
        "delta2": 1.46,
        "gd15": null,
        "games": 17,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 3.31,
        "soloKill": 0.75,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "초반 라인 프리징·다이브 압박이 강한 픽에 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "다리우스": {
    "id": "Darius",
    "aliases": [
      "다리",
      "다리우스"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "보통",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#유동적"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 51.49,
      "pr": 4.45,
      "br": 6.66,
      "games": 538
    },
    "patchFlag": {
      "status": "buff",
      "label": "최근 Q 쿨 버프 여파",
      "resetHistory": false
    },
    "hard": [
      "올라프"
    ],
    "counter": [
      "아트록스",
      "세트",
      "피오라"
    ],
    "matchupStats": {
      "베인": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "부쉬를 활용해 선고(E) 각을 보고, 유체화 없이는 무리한 추격을 피하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "크산테": {
        "wr": 55.0,
        "delta2": 3.47,
        "gd15": null,
        "games": 40,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.55,
        "soloKill": -0.1,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 66.7,
        "delta2": 15.27,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.67,
        "soloKill": -0.29,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 45.0,
        "delta2": -5.39,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.1,
        "soloKill": 0.4,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 63.6,
        "delta2": 12.46,
        "gd15": null,
        "games": 22,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.45,
        "soloKill": 0.95,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 65.0,
        "delta2": 12.48,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.45,
        "soloKill": 1.0,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 50.0,
        "delta2": -1.85,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.33,
        "soloKill": -0.44,
        "csAdv": null,
        "archetype": null
      },
      "올라프": {
        "wr": 35.0,
        "delta2": -14.03,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.3,
        "soloKill": 0.75,
        "csAdv": null,
        "archetype": null
      },
      "세트": {
        "wr": 46.7,
        "delta2": -3.28,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.4,
        "soloKill": 0.6,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 47.1,
        "delta2": -2.52,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -6.65,
        "soloKill": 0.12,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 상위권(5위). 최근 Q 쿨타임 버프 여파로 근접 브루저 대다수 압도",
    "laneExtra": {},
    "rosterType": "main"
  },
  "라이즈": {
    "id": "Ryze",
    "aliases": [
      "라이즈",
      "빡빡이"
    ],
    "damageType": "AP",
    "rangeType": "원거리",
    "roleTags": [
      "메이지"
    ],
    "difficulty": "보통",
    "timing": "후반",
    "playstyleTags": [
      "#사이드",
      "#로밍"
    ],
    "tier": "4티어",
    "stats": {
      "wr": 48.11,
      "pr": 0.88,
      "br": 0.55,
      "games": 106
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "이렐리아"
    ],
    "counter": [
      "야스오",
      "요릭"
    ],
    "matchupStats": {},
    "note": "사거리 내 순간 돌진·지속 추격형 브루저에 취약",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "럼블": {
    "id": "Rumble",
    "aliases": [
      "럼블",
      "고철"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "메이지",
      "브루저"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#라인전",
      "#한타"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 44.51,
      "pr": 2.86,
      "br": 1.92,
      "games": 346
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [],
    "counter": [
      "요릭",
      "요네",
      "라이즈",
      "아트록스"
    ],
    "matchupStats": {
      "제이스": {
        "wr": 66.7,
        "delta2": 18.54,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": "포킹을 W 보호막으로 막고 열 관리 50 이상에서 E 둔화 후 진입하세요.",
        "firstTower": null,
        "plates": -2.8,
        "soloKill": 0.73,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "요네": {
        "wr": 30.4,
        "delta2": -17.96,
        "gd15": null,
        "games": 23,
        "patches": 1,
        "tip": "요네 E 영혼 해방 진입 때 화염방사기(Q)를 켜고 과열 평타로 맞딜하세요.",
        "firstTower": null,
        "plates": -6.17,
        "soloKill": -1.7,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "아트록스": {
        "wr": 47.1,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "아트록스 Q1~2 끝자락을 피하면서 근접 과열 딜교를 노리세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "이렐리아": {
        "wr": null,
        "delta2": null,
        "gd15": -1642,
        "games": null,
        "patches": 1,
        "tip": "라인을 밀면 이렐리아 추격에 죽으므로 포탑 앞 프리징을 유지하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_trap"
      },
      "크산테": {
        "wr": 57.1,
        "delta2": 9.06,
        "gd15": null,
        "games": 28,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.0,
        "soloKill": -0.64,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "라인전 순수 7:3은 적으나 26.23 지표상 제이스(56.9%), 요네(53.1%), 아트록스(52.9%) 우위. 15분 골드는 이렐리아(+1,642G)·암베사·다리우스 강세",
    "laneExtra": {},
    "rosterType": "main"
  },
  "레넥톤": {
    "id": "Renekton",
    "aliases": [
      "레넥",
      "악어"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#유동적"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 46.45,
      "pr": 6.18,
      "br": 4.8,
      "games": 747
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 12계단 급상승",
      "resetHistory": false
    },
    "hard": [
      "판테온",
      "다리우스",
      "모데카이저",
      "세트",
      "아트록스"
    ],
    "counter": [
      "잭스"
    ],
    "matchupStats": {
      "요네": {
        "wr": 53.4,
        "delta2": 4.07,
        "gd15": null,
        "games": 58,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.64,
        "soloKill": 0.38,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 47.8,
        "delta2": -0.82,
        "gd15": null,
        "games": 67,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.49,
        "soloKill": 1.1,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 48.4,
        "delta2": -0.61,
        "gd15": null,
        "games": 31,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.39,
        "soloKill": -0.19,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 54.3,
        "delta2": 7.14,
        "gd15": null,
        "games": 35,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.0,
        "soloKill": 0.57,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 50.0,
        "delta2": 2.93,
        "gd15": null,
        "games": 30,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.93,
        "soloKill": -0.63,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 40.3,
        "delta2": -7.57,
        "gd15": null,
        "games": 33,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -0.88,
        "soloKill": 0.06,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 45.8,
        "delta2": -3.11,
        "gd15": null,
        "games": 24,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.17,
        "soloKill": -0.38,
        "csAdv": null,
        "archetype": null
      },
      "나르": {
        "wr": 60.9,
        "delta2": 12.79,
        "gd15": null,
        "games": 23,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.74,
        "soloKill": -0.04,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 48.1,
        "delta2": 1.0,
        "gd15": null,
        "games": 20,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -5.4,
        "soloKill": -0.19,
        "csAdv": null,
        "archetype": null
      },
      "자헨": {
        "wr": 47.6,
        "delta2": -0.82,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.9,
        "soloKill": 0.29,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 57.1,
        "delta2": 7.97,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.1,
        "soloKill": -1.24,
        "csAdv": null,
        "archetype": null
      },
      "모데카이저": {
        "wr": 37.5,
        "delta2": -10.05,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.19,
        "soloKill": -1.19,
        "csAdv": null,
        "archetype": null
      },
      "다리우스": {
        "wr": 35.0,
        "delta2": -12.48,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.45,
        "soloKill": -1.0,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 50.0,
        "delta2": 1.98,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 4.44,
        "soloKill": 0.69,
        "csAdv": null,
        "archetype": null
      },
      "세트": {
        "wr": 37.5,
        "delta2": -9.96,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.81,
        "soloKill": 0.69,
        "csAdv": null,
        "archetype": null
      },
      "아칼리": {
        "wr": 60.0,
        "delta2": 13.12,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.47,
        "soloKill": 1.07,
        "csAdv": null,
        "archetype": null
      },
      "판테온": {
        "wr": 31.2,
        "delta2": -16.46,
        "gd15": null,
        "games": 15,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 2.38,
        "soloKill": 0.38,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 12계단 급상승(10위). 브루저·탱커 메타 수혜",
    "laneExtra": {},
    "rosterType": "main"
  },
  "렝가": {
    "id": "Rengar",
    "aliases": [
      "렝가",
      "고양이"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "암살자",
      "브루저"
    ],
    "difficulty": "어려움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#사이드"
    ],
    "tier": "4티어",
    "stats": {
      "wr": 53.97,
      "pr": 0.52,
      "br": 2.06,
      "games": 63
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "다리우스",
      "워윅",
      "트런들"
    ],
    "counter": [
      "뽀삐"
    ],
    "matchupStats": {},
    "note": "부쉬 장악을 정면 맞다이·이동 차단으로 깨는 픽에 극약",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "리븐": {
    "id": "Riven",
    "aliases": [
      "리븐"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "스커미셔",
      "브루저"
    ],
    "difficulty": "어려움",
    "timing": "중반",
    "playstyleTags": [
      "#유동적",
      "#사이드"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 51.7,
      "pr": 1.46,
      "br": 0.14,
      "games": 176
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "레넥톤",
      "뽀삐",
      "볼리베어",
      "케넨",
      "퀸"
    ],
    "counter": [
      "트린다미어",
      "가렌",
      "나서스",
      "우르곳",
      "제이스"
    ],
    "matchupStats": {
      "뽀삐": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "뽀삐 W(굳건한 태세)가 빠지기 전에는 Q3타·E 진입을 자제하고 벽각을 피하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "레넥톤": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "분노 50 이상 레넥톤의 강화 W는 리븐 E 보호막을 부수므로 1~2렙 외엔 짧은 딜교만 하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "잭스": {
        "wr": 53.3,
        "delta2": 1.76,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.67,
        "soloKill": 1.33,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "뽀삐(W 돌진 차단)·레넥톤·볼리베어 상대로 주도권 상실",
    "laneExtra": {},
    "rosterType": "main"
  },
  "리산드라": {
    "id": "Lissandra",
    "aliases": [
      "리산",
      "얼음마녀"
    ],
    "damageType": "AP",
    "rangeType": "원거리",
    "roleTags": [
      "메이지"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#로밍"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 41.49,
      "pr": 0.78,
      "br": 2.16,
      "games": 94
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 고승률 조커픽",
      "resetHistory": false
    },
    "hard": [
      "볼리베어",
      "아칼리",
      "세트"
    ],
    "counter": [
      "그웬",
      "케일",
      "올라프"
    ],
    "matchupStats": {},
    "note": "26.23 고승률 조커픽(20위). 유지력·강제 진입 브루저나 후반 스케일링 픽에 취약",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "마오카이": {
    "id": "Maokai",
    "aliases": [
      "마오",
      "나무"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "탱커"
    ],
    "difficulty": "쉬움",
    "timing": "중반",
    "playstyleTags": [
      "#한타"
    ],
    "tier": "4티어",
    "stats": {
      "wr": 47.37,
      "pr": 0.79,
      "br": 0.19,
      "games": 95
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "그웬",
      "럼블",
      "일라오이",
      "피오라"
    ],
    "counter": [
      "레넥톤",
      "모데카이저"
    ],
    "matchupStats": {},
    "note": "체력 비례 피해·고정 피해 브루저 상대로 라인전 붕괴",
    "laneExtra": {},
    "rosterType": "main"
  },
  "말파이트": {
    "id": "Malphite",
    "aliases": [
      "말파",
      "돌덩이"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "탱커"
    ],
    "difficulty": "쉬움",
    "timing": "중반",
    "playstyleTags": [
      "#한타"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 50.41,
      "pr": 6.07,
      "br": 11.46,
      "games": 734
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 3위 꿀챔",
      "resetHistory": false
    },
    "hard": [
      "요네",
      "사일러스",
      "아칼리",
      "문도 박사"
    ],
    "counter": [],
    "matchupStats": {
      "사일러스": {
        "wr": 34.4,
        "delta2": -17.04,
        "gd15": null,
        "games": 32,
        "patches": 1,
        "tip": "사일러스가 말파 궁을 뺏으면 한타 가치가 역전되므로 선픽 금지, 밴 필수 상성입니다.",
        "firstTower": null,
        "plates": -0.47,
        "soloKill": -2.28,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "제이스": {
        "wr": 55.1,
        "delta2": 3.99,
        "gd15": null,
        "games": 94,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -1.02,
        "soloKill": 0.56,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 50.0,
        "delta2": 0.95,
        "gd15": null,
        "games": 30,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -4.57,
        "soloKill": -1.1,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 31.0,
        "delta2": -20.3,
        "gd15": null,
        "games": 29,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -4.03,
        "soloKill": -0.86,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 57.1,
        "delta2": 6.21,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.1,
        "soloKill": -0.86,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 48.3,
        "delta2": -0.78,
        "gd15": null,
        "games": 29,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -6.31,
        "soloKill": 0.14,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 63.2,
        "delta2": 12.21,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.89,
        "soloKill": -1.11,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 52.6,
        "delta2": 2.01,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.74,
        "soloKill": -0.53,
        "csAdv": null,
        "archetype": null
      },
      "케넨": {
        "wr": 68.4,
        "delta2": 17.71,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.37,
        "soloKill": 0.53,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 50.0,
        "delta2": -1.98,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -4.44,
        "soloKill": -0.69,
        "csAdv": null,
        "archetype": null
      },
      "나서스": {
        "wr": 50.8,
        "delta2": -1.46,
        "gd15": null,
        "games": 17,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -3.31,
        "soloKill": -0.75,
        "csAdv": null,
        "archetype": null
      },
      "판테온": {
        "wr": 56.2,
        "delta2": 6.56,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.88,
        "soloKill": 0.56,
        "csAdv": null,
        "archetype": null
      },
      "트린다미어": {
        "wr": 47.1,
        "delta2": -0.65,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -7.06,
        "soloKill": -0.35,
        "csAdv": null,
        "archetype": null
      },
      "사이온": {
        "wr": 49.0,
        "delta2": -0.03,
        "gd15": null,
        "games": 15,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -3.09,
        "soloKill": -0.27,
        "csAdv": null,
        "archetype": null
      },
      "문도 박사": {
        "wr": 44.4,
        "delta2": -6.75,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -4.72,
        "soloKill": 1.28,
        "csAdv": null,
        "archetype": null
      },
      "아칼리": {
        "wr": 40.0,
        "delta2": -8.85,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.73,
        "soloKill": -0.8,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 3위 꿀챔. AP 지속딜·체급 탱커 후픽에 극도로 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "모데카이저": {
    "id": "Mordekaiser",
    "aliases": [
      "모데",
      "깡통"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "중반",
    "playstyleTags": [
      "#라인전",
      "#유동적"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 51.34,
      "pr": 3.08,
      "br": 1.38,
      "games": 372
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 21계단 급상승",
      "resetHistory": false
    },
    "hard": [
      "아트록스",
      "잭스"
    ],
    "counter": [
      "크산테"
    ],
    "matchupStats": {
      "아칼리": {
        "wr": 36.1,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "아칼리 장막(W)이 깔리면 궁극기를 써도 안에서 시간을 끌리므로 W가 빠진 뒤 R을 쓰세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "갱플랭크": {
        "wr": 52.9,
        "delta2": 3.37,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": "갱플 귤(W)이 모데 궁을 바로 해제하므로 귤이 빠진 걸 확인하거나 1:1 킬각을 무리하지 마세요.",
        "firstTower": null,
        "plates": 0.47,
        "soloKill": 2.53,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "올라프": {
        "wr": 41.1,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "올라프 R은 모데 궁극기를 무효화합니다. 존야나 파수꾼의 갑옷으로 6렙 이후를 버티세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "잭스": {
        "wr": 40.0,
        "delta2": -11.36,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.27,
        "soloKill": 1.07,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 62.5,
        "delta2": 10.05,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.19,
        "soloKill": 1.19,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 47.1,
        "delta2": -4.36,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.29,
        "soloKill": -0.06,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 68.8,
        "delta2": 17.22,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.31,
        "soloKill": 2.0,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 33.3,
        "delta2": -17.01,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.8,
        "soloKill": 0.67,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 21계단 급상승(13위). 지표상 아칼리(63.9%), 갱플랭크(59.1%), 올라프(58.9%) 및 하이머딩거 라인전 강세",
    "laneExtra": {},
    "rosterType": "main"
  },
  "문도 박사": {
    "id": "DrMundo",
    "aliases": [
      "문도",
      "문도박사"
    ],
    "damageType": "혼합",
    "rangeType": "근접",
    "roleTags": [
      "탱커",
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "후반",
    "playstyleTags": [
      "#사이드",
      "#한타"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 48.12,
      "pr": 2.65,
      "br": 0.44,
      "games": 320
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "아트록스",
      "그웬",
      "피오라",
      "요릭"
    ],
    "counter": [
      "요네",
      "이렐리아",
      "올라프",
      "일라오이",
      "크산테"
    ],
    "matchupStats": {
      "크산테": {
        "wr": 42.5,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "패시브 CC 면역이 빠진 상태에서 크산테 W-R 벽 넘김 각을 주지 마세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "잭스": {
        "wr": 27.3,
        "delta2": -22.44,
        "gd15": null,
        "games": 22,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.82,
        "soloKill": -0.41,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 50.0,
        "delta2": -0.16,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.35,
        "soloKill": -1.2,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 88.2,
        "delta2": 38.23,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 9.82,
        "soloKill": 1.35,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 55.6,
        "delta2": 6.75,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 4.72,
        "soloKill": -1.28,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 지표상 크산테(57.5%) 상대로도 고전",
    "laneExtra": {},
    "rosterType": "main"
  },
  "바루스": {
    "id": "Varus",
    "aliases": [
      "바루스",
      "탑바루스"
    ],
    "damageType": "혼합",
    "rangeType": "원거리",
    "roleTags": [
      "원딜"
    ],
    "difficulty": "보통",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#한타"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 32.93,
      "pr": 0.68,
      "br": 0.9,
      "games": 82
    },
    "patchFlag": {
      "status": "nerf",
      "label": "최근 W 너프 여파",
      "resetHistory": false
    },
    "hard": [
      "잭스",
      "올라프",
      "야스오"
    ],
    "counter": [
      "이렐리아"
    ],
    "matchupStats": {},
    "note": "최근 W 너프 여파로 탱커 분쇄력 하락. 돌진·저지불가에 취약",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "베인": {
    "id": "Vayne",
    "aliases": [
      "베인",
      "탑베인"
    ],
    "damageType": "AD",
    "rangeType": "원거리",
    "roleTags": [
      "원딜",
      "스커미셔"
    ],
    "difficulty": "어려움",
    "timing": "후반",
    "playstyleTags": [
      "#라인전",
      "#사이드"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 49.35,
      "pr": 1.91,
      "br": 2.2,
      "games": 231
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "말파이트",
      "티모"
    ],
    "counter": [
      "나서스",
      "블라디미르"
    ],
    "matchupStats": {
      "말파이트": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "말파이트 Q 견제와 6렙 궁 킬각에 극약. 마법 저항력과 흡혈 낫을 빠르게 섞어야 버팁니다.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "크산테": {
        "wr": 47.8,
        "delta2": -2.66,
        "gd15": null,
        "games": 36,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -0.89,
        "soloKill": -0.23,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "타겟팅·실명·공속 감소 스킬에 무력화",
    "laneExtra": {},
    "rosterType": "main"
  },
  "볼리베어": {
    "id": "Volibear",
    "aliases": [
      "볼베",
      "곰"
    ],
    "damageType": "혼합",
    "rangeType": "근접",
    "roleTags": [
      "브루저",
      "탱커"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#유동적"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 53.87,
      "pr": 3.1,
      "br": 1.06,
      "games": 375
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "제이스"
    ],
    "counter": [
      "아칼리",
      "케넨",
      "나르",
      "티모"
    ],
    "matchupStats": {
      "잭스": {
        "wr": 57.9,
        "delta2": 5.28,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": "잭스 반격(E)에 볼베 Q 스턴과 W가 모두 막힙니다. E가 빠진 뒤에 Q로 추격하세요.",
        "firstTower": null,
        "plates": 0.63,
        "soloKill": -0.58,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "이렐리아": {
        "wr": 37.5,
        "delta2": -13.28,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.5,
        "soloKill": -0.56,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 56.2,
        "delta2": 3.48,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.69,
        "soloKill": 0.25,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 52.9,
        "delta2": -0.14,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.59,
        "soloKill": 1.65,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "평타 차단(잭스 E)·거리 유지형 원거리 포킹에 약함",
    "laneExtra": {},
    "rosterType": "main"
  },
  "블라디미르": {
    "id": "Vladimir",
    "aliases": [
      "블라디",
      "모기"
    ],
    "damageType": "AP",
    "rangeType": "원거리",
    "roleTags": [
      "메이지"
    ],
    "difficulty": "보통",
    "timing": "후반",
    "playstyleTags": [
      "#한타",
      "#사이드"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 39.23,
      "pr": 1.08,
      "br": 0.34,
      "games": 130
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "요릭",
      "럼블"
    ],
    "counter": [
      "이렐리아",
      "나서스",
      "암베사",
      "라이즈"
    ],
    "matchupStats": {},
    "note": "초반 웨이브 장악력·강한 돌진기 보유 픽에 압박받음",
    "laneExtra": {},
    "rosterType": "main"
  },
  "뽀삐": {
    "id": "Poppy",
    "aliases": [
      "뽀삐"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "탱커"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#유동적"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 51.16,
      "pr": 1.42,
      "br": 9.85,
      "games": 172
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 9위(승률 53.7%)",
      "resetHistory": false
    },
    "hard": [
      "갱플랭크",
      "럼블",
      "워윅",
      "올라프"
    ],
    "counter": [
      "다리우스",
      "가렌",
      "케넨",
      "블라디미르"
    ],
    "matchupStats": {},
    "note": "26.23 9위(승률 53.7%). 돌진기 카운터 후픽으로 최상급",
    "laneExtra": {},
    "rosterType": "main"
  },
  "사이온": {
    "id": "Sion",
    "aliases": [
      "사이온"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "탱커"
    ],
    "difficulty": "보통",
    "timing": "후반",
    "playstyleTags": [
      "#한타",
      "#사이드"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 52.34,
      "pr": 3.89,
      "br": 0.64,
      "games": 470
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 11위 꿀챔",
      "resetHistory": false
    },
    "hard": [
      "올라프",
      "암베사"
    ],
    "counter": [],
    "matchupStats": {
      "제이스": {
        "wr": 53.9,
        "delta2": 1.82,
        "gd15": null,
        "games": 32,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -2.87,
        "soloKill": -0.55,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 66.2,
        "delta2": 13.93,
        "gd15": null,
        "games": 36,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -0.2,
        "soloKill": -0.54,
        "csAdv": null,
        "archetype": null
      },
      "올라프": {
        "wr": 38.9,
        "delta2": -10.55,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.72,
        "soloKill": -1.06,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 41.2,
        "delta2": -10.36,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.71,
        "soloKill": -0.82,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 52.6,
        "delta2": 0.64,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.37,
        "soloKill": -0.89,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 64.7,
        "delta2": 13.89,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.24,
        "soloKill": -1.47,
        "csAdv": null,
        "archetype": null
      },
      "그웬": {
        "wr": 58.8,
        "delta2": 7.22,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.35,
        "soloKill": -0.18,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 51.0,
        "delta2": 0.03,
        "gd15": null,
        "games": 15,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 3.09,
        "soloKill": 0.27,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 11위 꿀챔. 체급·궁 버프와 벼락폭풍검 너프 수혜. Q 차징을 끊거나 체력 비례 딜러에게 약함",
    "laneExtra": {},
    "rosterType": "main"
  },
  "사일러스": {
    "id": "Sylas",
    "aliases": [
      "사일",
      "사일러스"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "브루저",
      "암살자"
    ],
    "difficulty": "어려움",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#유동적"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 47.52,
      "pr": 1.67,
      "br": 24.07,
      "games": 202
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "다리우스",
      "워윅",
      "볼리베어"
    ],
    "counter": [
      "일라오이",
      "세트",
      "판테온",
      "뽀삐",
      "제이스"
    ],
    "matchupStats": {
      "말파이트": {
        "wr": 65.6,
        "delta2": 17.04,
        "gd15": null,
        "games": 32,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.47,
        "soloKill": 2.28,
        "csAdv": null,
        "archetype": null
      },
      "나르": {
        "wr": 52.4,
        "delta2": 3.76,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.05,
        "soloKill": 1.81,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "초반 1:1 체급이 강한 정통 탑 브루저 상대로 라인전 열세",
    "laneExtra": {},
    "rosterType": "main"
  },
  "세트": {
    "id": "Sett",
    "aliases": [
      "세트",
      "주먹"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#한타"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 51.53,
      "pr": 2.97,
      "br": 0.54,
      "games": 359
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "볼리베어",
      "판테온"
    ],
    "counter": [
      "모데카이저",
      "아트록스",
      "제이스",
      "티모",
      "베인"
    ],
    "matchupStats": {
      "판테온": {
        "wr": 37.4,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "판테온 E가 세트 W 강펀치를 통째로 막으므로, E가 빠진 걸 확인한 뒤 W를 쓰세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "다리우스": {
        "wr": 53.3,
        "delta2": 3.28,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.4,
        "soloKill": -0.6,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 36.4,
        "delta2": -13.21,
        "gd15": null,
        "games": 22,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.73,
        "soloKill": -0.59,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 62.5,
        "delta2": 9.96,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.81,
        "soloKill": -0.69,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 82.4,
        "delta2": 30.54,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.29,
        "soloKill": 1.53,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 지표상 판테온(62.6%)도 W 보호막·스턴 교전 구도로 매우 강력",
    "laneExtra": {},
    "rosterType": "main"
  },
  "쉔": {
    "id": "Shen",
    "aliases": [
      "쉔"
    ],
    "damageType": "혼합",
    "rangeType": "근접",
    "roleTags": [
      "탱커"
    ],
    "difficulty": "보통",
    "timing": "초반",
    "playstyleTags": [
      "#로밍",
      "#한타"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 48.11,
      "pr": 1.75,
      "br": 0.23,
      "games": 212
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "요릭",
      "모데카이저",
      "나르"
    ],
    "counter": [
      "아트록스",
      "가렌",
      "다리우스",
      "럼블",
      "제이스",
      "라이즈"
    ],
    "matchupStats": {
      "요릭": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "궁극기 로밍 한 번에 1~2차 포탑이 통째로 날아가므로 웨이브를 끝까지 민 뒤에만 합류하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      }
    },
    "note": "궁극기 로밍 시 포탑 채굴 속도가 압도적인 픽(요릭 등)에 치명적",
    "laneExtra": {},
    "rosterType": "main"
  },
  "스카너": {
    "id": "Skarner",
    "aliases": [
      "스카너",
      "전갈"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "탱커"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타"
    ],
    "tier": "4티어",
    "stats": {
      "wr": 58.33,
      "pr": 0.2,
      "br": 0.17,
      "games": 24
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "모데카이저",
      "럼블"
    ],
    "counter": [
      "그웬",
      "피오라",
      "일라오이"
    ],
    "matchupStats": {},
    "note": "정통 안티탱커 3종으로 보완",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "신 짜오": {
    "id": "XinZhao",
    "aliases": [
      "신짜오",
      "짜오"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#유동적"
    ],
    "tier": "4티어",
    "stats": {
      "wr": 48.84,
      "pr": 0.36,
      "br": 0.85,
      "games": 43
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "볼리베어",
      "잭스",
      "세트"
    ],
    "counter": [
      "워윅"
    ],
    "matchupStats": {},
    "note": "탑 채용 시 순수 맞다이 체급이 더 높은 브루저에 밀림",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "신지드": {
    "id": "Singed",
    "aliases": [
      "신지드",
      "방귀"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "브루저",
      "탱커"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#로밍"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 52.54,
      "pr": 2.28,
      "br": 0.7,
      "games": 276
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 잭스 카운터 부상",
      "resetHistory": false
    },
    "hard": [
      "다리우스",
      "럼블",
      "갱플랭크",
      "베인"
    ],
    "counter": [
      "제이스",
      "케넨",
      "라이즈"
    ],
    "matchupStats": {
      "나르": {
        "wr": 60.0,
        "delta2": 8.85,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -7.67,
        "soloKill": -1.87,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 잭스 하드 카운터(66.7%)로 지표 상승. 원거리 카이팅·둔화 픽에 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "아칼리": {
    "id": "Akali",
    "aliases": [
      "아칼리"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "암살자"
    ],
    "difficulty": "어려움",
    "timing": "중반",
    "playstyleTags": [
      "#유동적",
      "#사이드"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 52.7,
      "pr": 3.67,
      "br": 19.48,
      "games": 444
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "레넥톤",
      "크산테",
      "잭스"
    ],
    "counter": [
      "제이스"
    ],
    "matchupStats": {
      "요네": {
        "wr": 68.6,
        "delta2": 16.15,
        "gd15": null,
        "games": 35,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.77,
        "soloKill": 2.51,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 43.6,
        "delta2": -8.43,
        "gd15": null,
        "games": 25,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -2.27,
        "soloKill": 2.03,
        "csAdv": null,
        "archetype": null
      },
      "올라프": {
        "wr": 58.8,
        "delta2": 9.17,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.41,
        "soloKill": 0.41,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 47.4,
        "delta2": -4.86,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.16,
        "soloKill": 0.26,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 65.0,
        "delta2": 14.8,
        "gd15": null,
        "games": 15,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 40.0,
        "delta2": -13.12,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.47,
        "soloKill": -1.07,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 60.0,
        "delta2": 8.85,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.73,
        "soloKill": 0.8,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 40.0,
        "delta2": -12.14,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.87,
        "soloKill": -0.67,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "장막(W) 내 확정 CC·광역기 보유 및 체급 탱커에 까다로움",
    "laneExtra": {},
    "rosterType": "main"
  },
  "아트록스": {
    "id": "Aatrox",
    "aliases": [
      "아트",
      "아트록스"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#유동적"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 50.72,
      "pr": 5.76,
      "br": 2.9,
      "games": 696
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "카밀",
      "사이온",
      "판테온",
      "이렐리아",
      "잭스"
    ],
    "counter": [
      "크산테"
    ],
    "matchupStats": {
      "갱플랭크": {
        "wr": 56.2,
        "delta2": 6.98,
        "gd15": null,
        "games": 32,
        "patches": 1,
        "tip": "갱플 귤(W)이 아트록스 W 사슬을 끊으므로 W 대신 Q1-E 포킹으로 피를 깎으세요.",
        "firstTower": null,
        "plates": 2.12,
        "soloKill": 0.69,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "레넥톤": {
        "wr": 59.7,
        "delta2": 7.57,
        "gd15": null,
        "games": 33,
        "patches": 2,
        "tip": "레넥톤 E 진입 시 Q1을 미리 깔고 뒤로 E를 써서 Q2 끝자락을 맞추는 거리 조절이 핵심입니다.",
        "firstTower": null,
        "plates": 0.88,
        "soloKill": -0.06,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "카밀": {
        "wr": 35.0,
        "delta2": -14.29,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": "카밀 궁극기가 아트록스 Q3타를 씹으므로 6렙 이후 맞딜은 쿨을 보고 들어가세요.",
        "firstTower": null,
        "plates": -1.4,
        "soloKill": -0.5,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "하이머딩거": {
        "wr": null,
        "delta2": null,
        "gd15": -1004,
        "games": null,
        "patches": 1,
        "tip": "포탑을 Q로 지우며 6렙 전까지 무리하지 말고 1코어 타이밍을 노리세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_trap"
      },
      "제이스": {
        "wr": 48.8,
        "delta2": -2.47,
        "gd15": null,
        "games": 41,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.07,
        "soloKill": 0.29,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 63.7,
        "delta2": 12.24,
        "gd15": null,
        "games": 31,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 0.07,
        "soloKill": -1.03,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 53.1,
        "delta2": 3.87,
        "gd15": null,
        "games": 32,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -4.91,
        "soloKill": 0.06,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 64.5,
        "delta2": 13.75,
        "gd15": null,
        "games": 23,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 1.95,
        "soloKill": 0.58,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 45.0,
        "delta2": -6.04,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.65,
        "soloKill": -0.45,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 46.2,
        "delta2": -4.94,
        "gd15": null,
        "games": 26,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.35,
        "soloKill": -0.27,
        "csAdv": null,
        "archetype": null
      },
      "자헨": {
        "wr": 52.6,
        "delta2": 2.04,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.0,
        "soloKill": -0.84,
        "csAdv": null,
        "archetype": null
      },
      "다리우스": {
        "wr": 55.0,
        "delta2": 5.39,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.1,
        "soloKill": -0.4,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 37.5,
        "delta2": -11.7,
        "gd15": null,
        "games": 24,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.54,
        "soloKill": -0.33,
        "csAdv": null,
        "archetype": null
      },
      "나르": {
        "wr": 52.6,
        "delta2": 2.36,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.21,
        "soloKill": 0.21,
        "csAdv": null,
        "archetype": null
      },
      "사이온": {
        "wr": 35.3,
        "delta2": -13.89,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.24,
        "soloKill": 1.47,
        "csAdv": null,
        "archetype": null
      },
      "판테온": {
        "wr": 37.5,
        "delta2": -12.29,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.06,
        "soloKill": -0.31,
        "csAdv": null,
        "archetype": null
      },
      "모데카이저": {
        "wr": 66.7,
        "delta2": 17.01,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.8,
        "soloKill": -0.67,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 지표상 갱플랭크(60.5%), 레넥톤(58.3%), 카밀(56.6%), 하이머딩거(15분 +1,004G)가 매우 강력",
    "laneExtra": {},
    "rosterType": "main"
  },
  "암베사": {
    "id": "Ambessa",
    "aliases": [
      "암베사"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저",
      "스커미셔"
    ],
    "difficulty": "어려움",
    "timing": "중반",
    "playstyleTags": [
      "#사이드",
      "#한타"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 49.22,
      "pr": 6.34,
      "br": 3.18,
      "games": 766
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "아트록스",
      "다리우스",
      "제이스"
    ],
    "counter": [],
    "matchupStats": {
      "아트록스": {
        "wr": 35.5,
        "delta2": -13.75,
        "gd15": null,
        "games": 23,
        "patches": 2,
        "tip": "스킬 후 돌진으로 아트록스 Q 끝자락 안쪽으로 파고들면 딜교 이득을 볼 수 있습니다.",
        "firstTower": null,
        "plates": -1.95,
        "soloKill": -0.58,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "레넥톤": {
        "wr": 52.2,
        "delta2": 0.82,
        "gd15": null,
        "games": 67,
        "patches": 1,
        "tip": "강화 W로 보호막(W)이 깨지므로 레넥톤 분노 50 미만일 때만 짧게 딜교하세요.",
        "firstTower": null,
        "plates": -1.49,
        "soloKill": -1.1,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "자헨": {
        "wr": 58.4,
        "delta2": 8.59,
        "gd15": null,
        "games": 21,
        "patches": 2,
        "tip": "장기전으로 가면 밀리므로 스킬 사이클을 돌린 뒤 빠르게 빠져나오세요.",
        "firstTower": null,
        "plates": 1.65,
        "soloKill": 0.25,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "이렐리아": {
        "wr": 52.0,
        "delta2": 3.55,
        "gd15": -1324,
        "games": 25,
        "patches": 1,
        "tip": "이렐리아 4스택 타이밍에는 맞딜을 피하고 W 보호막으로 핵심 딜만 받아내세요.",
        "firstTower": null,
        "plates": -5.36,
        "soloKill": -0.76,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "크산테": {
        "wr": 51.3,
        "delta2": 0.9,
        "gd15": null,
        "games": 39,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.74,
        "soloKill": -0.46,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 42.1,
        "delta2": -8.41,
        "gd15": null,
        "games": 38,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.47,
        "soloKill": -1.08,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 50.0,
        "delta2": -0.71,
        "gd15": null,
        "games": 38,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.29,
        "soloKill": 1.0,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 51.3,
        "delta2": 2.75,
        "gd15": null,
        "games": 39,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.74,
        "soloKill": -0.21,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 55.2,
        "delta2": 4.91,
        "gd15": null,
        "games": 29,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.62,
        "soloKill": 0.83,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 52.2,
        "delta2": 3.72,
        "gd15": null,
        "games": 23,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.57,
        "soloKill": 0.3,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 47.4,
        "delta2": -2.01,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.74,
        "soloKill": 0.53,
        "csAdv": null,
        "archetype": null
      },
      "다리우스": {
        "wr": 36.4,
        "delta2": -12.46,
        "gd15": null,
        "games": 22,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.45,
        "soloKill": -0.95,
        "csAdv": null,
        "archetype": null
      },
      "사이온": {
        "wr": 58.8,
        "delta2": 10.36,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.71,
        "soloKill": 0.82,
        "csAdv": null,
        "archetype": null
      },
      "트린다미어": {
        "wr": 56.2,
        "delta2": 9.04,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.06,
        "soloKill": 0.19,
        "csAdv": null,
        "archetype": null
      },
      "나르": {
        "wr": 61.1,
        "delta2": 11.61,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.28,
        "soloKill": 0.39,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 지표 최강 카운터는 아트록스(58.8%)·레넥톤(58.7%)·자헨(57.6%), 라인전은 이렐리아(+1,324G)",
    "laneExtra": {},
    "rosterType": "main"
  },
  "야스오": {
    "id": "Yasuo",
    "aliases": [
      "야스오",
      "야소",
      "과학"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "스커미셔"
    ],
    "difficulty": "어려움",
    "timing": "중반",
    "playstyleTags": [
      "#사이드",
      "#유동적"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 49.17,
      "pr": 2.49,
      "br": 19.66,
      "games": 301
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "잭스",
      "레넥톤"
    ],
    "counter": [
      "볼리베어",
      "쉔"
    ],
    "matchupStats": {
      "제이스": {
        "wr": 58.8,
        "delta2": 8.31,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.41,
        "soloKill": 1.24,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 50.7,
        "delta2": 0.02,
        "gd15": null,
        "games": 19,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 1.8,
        "soloKill": 0.48,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 47.4,
        "delta2": -2.87,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.21,
        "soloKill": -1.47,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "근접 확정 CC 및 평타 무효화 픽에 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "애니비아": {
    "id": "Anivia",
    "aliases": [
      "애니비아",
      "빙닭"
    ],
    "damageType": "AP",
    "rangeType": "원거리",
    "roleTags": [
      "메이지"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 51.06,
      "pr": 1.17,
      "br": 2.36,
      "games": 141
    },
    "patchFlag": {
      "status": null,
      "label": "조커픽",
      "resetHistory": false
    },
    "hard": [
      "클레드",
      "요릭",
      "암베사"
    ],
    "counter": [
      "아트록스",
      "아칼리",
      "카밀",
      "피오라"
    ],
    "matchupStats": {},
    "note": "26.23 고승률 조커픽(36위). 벽 넘기·궁 끊기·기동성이 뛰어난 브루저에 취약",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "오공": {
    "id": "MonkeyKing",
    "aliases": [
      "오공",
      "원숭이",
      "wukong",
      "우콩"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#유동적"
    ],
    "tier": "4티어",
    "stats": {
      "wr": 53.96,
      "pr": 1.15,
      "br": 4.19,
      "games": 139
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "모데카이저"
    ],
    "counter": [
      "볼리베어",
      "잭스",
      "말파이트",
      "럼블",
      "일라오이"
    ],
    "matchupStats": {},
    "note": "AP 브루저(모데·럼블) 및 맞다이 우위 픽에 약함",
    "laneExtra": {},
    "rosterType": "main"
  },
  "오로라": {
    "id": "Aurora",
    "aliases": [
      "오로라",
      "토끼"
    ],
    "damageType": "AP",
    "rangeType": "원거리",
    "roleTags": [
      "메이지",
      "암살자"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#라인전"
    ],
    "tier": "4티어",
    "stats": {
      "wr": 52.04,
      "pr": 0.81,
      "br": 0.57,
      "games": 98
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "이렐리아",
      "케넨",
      "카르마"
    ],
    "counter": [
      "제이스",
      "아칼리",
      "요네"
    ],
    "matchupStats": {},
    "note": "26.23 지표상 돌진·라인전 우위 픽(이렐리아 등)과 더 긴 견제 사거리에 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "오른": {
    "id": "Ornn",
    "aliases": [
      "오른",
      "대장장이"
    ],
    "damageType": "혼합",
    "rangeType": "근접",
    "roleTags": [
      "탱커"
    ],
    "difficulty": "보통",
    "timing": "후반",
    "playstyleTags": [
      "#한타"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 52.28,
      "pr": 2.36,
      "br": 0.12,
      "games": 285
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 24계단 급상승",
      "resetHistory": false
    },
    "hard": [
      "일라오이",
      "워윅",
      "피오라"
    ],
    "counter": [
      "다리우스",
      "뽀삐",
      "이렐리아",
      "올라프",
      "요네"
    ],
    "matchupStats": {
      "요네": {
        "wr": 39.6,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "요네 Q3타 에어본을 오른 W(저지불가)로 씹어야 반격 각이 나옵니다.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "올라프": {
        "wr": 40.2,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "올라프 R에 모든 CC가 무력화되므로 6렙 이후엔 타워 앞 파밍 위주로 운영하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "제이스": {
        "wr": 66.7,
        "delta2": 14.66,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.67,
        "soloKill": 0.6,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 46.7,
        "delta2": -5.22,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.27,
        "soloKill": -1.13,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 24계단 급상승(18위). 지표상 요네(60.4%), 올라프(59.8%)가 매우 강력",
    "laneExtra": {},
    "rosterType": "main"
  },
  "올라프": {
    "id": "Olaf",
    "aliases": [
      "올라프"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#사이드"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 53.44,
      "pr": 5.42,
      "br": 8.14,
      "games": 655
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "트런들",
      "갱플랭크",
      "크산테",
      "아칼리"
    ],
    "counter": [],
    "matchupStats": {
      "아칼리": {
        "wr": 41.2,
        "delta2": -9.17,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": "장막(W)이 켜지면 궁극기 지속 시간이 끊기므로 장막이 빠진 뒤 궁+유체화를 켜세요.",
        "firstTower": null,
        "plates": -1.41,
        "soloKill": -0.41,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "제이스": {
        "wr": 59.3,
        "delta2": 6.67,
        "gd15": null,
        "games": 52,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 2.49,
        "soloKill": 0.71,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 48.6,
        "delta2": -2.05,
        "gd15": null,
        "games": 37,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.08,
        "soloKill": 0.32,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 64.3,
        "delta2": 11.89,
        "gd15": null,
        "games": 42,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.9,
        "soloKill": 0.55,
        "csAdv": null,
        "archetype": null
      },
      "사이온": {
        "wr": 61.1,
        "delta2": 10.55,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.72,
        "soloKill": 1.06,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 55.6,
        "delta2": 2.78,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.56,
        "soloKill": 1.11,
        "csAdv": null,
        "archetype": null
      },
      "티모": {
        "wr": 57.1,
        "delta2": 5.73,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.43,
        "soloKill": 1.48,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 42.9,
        "delta2": -9.61,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.1,
        "soloKill": 0.43,
        "csAdv": null,
        "archetype": null
      },
      "다리우스": {
        "wr": 65.0,
        "delta2": 14.03,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.3,
        "soloKill": -0.75,
        "csAdv": null,
        "archetype": null
      },
      "갱플랭크": {
        "wr": 40.0,
        "delta2": -10.58,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.6,
        "soloKill": 1.4,
        "csAdv": null,
        "archetype": null
      },
      "클레드": {
        "wr": 50.0,
        "delta2": -0.53,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.81,
        "soloKill": -1.0,
        "csAdv": null,
        "archetype": null
      },
      "자헨": {
        "wr": 62.5,
        "delta2": 10.58,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.75,
        "soloKill": 0.75,
        "csAdv": null,
        "archetype": null
      },
      "트런들": {
        "wr": 40.0,
        "delta2": -10.86,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.4,
        "soloKill": 0.53,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 상위권(6위). 궁극기 지속 시간을 장막(아칼리)·회피/이동기로 흘리는 픽에 약함",
    "laneExtra": {},
    "rosterType": "main"
  },
  "요네": {
    "id": "Yone",
    "aliases": [
      "요네"
    ],
    "damageType": "혼합",
    "rangeType": "근접",
    "roleTags": [
      "스커미셔"
    ],
    "difficulty": "보통",
    "timing": "후반",
    "playstyleTags": [
      "#사이드",
      "#한타"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 47.8,
      "pr": 8.48,
      "br": 13.59,
      "games": 1025
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "세트",
      "티모",
      "아칼리",
      "사이온",
      "아트록스",
      "가렌"
    ],
    "counter": [
      "레넥톤",
      "올라프"
    ],
    "matchupStats": {
      "잭스": {
        "wr": 55.4,
        "delta2": 5.82,
        "gd15": null,
        "games": 65,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.55,
        "soloKill": -1.52,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 40.8,
        "delta2": -9.01,
        "gd15": null,
        "games": 62,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -2.38,
        "soloKill": -0.59,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 46.6,
        "delta2": -4.07,
        "gd15": null,
        "games": 58,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.64,
        "soloKill": -0.38,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 54.9,
        "delta2": 5.21,
        "gd15": null,
        "games": 46,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 1.8,
        "soloKill": -0.22,
        "csAdv": null,
        "archetype": null
      },
      "아칼리": {
        "wr": 31.4,
        "delta2": -16.15,
        "gd15": null,
        "games": 35,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.77,
        "soloKill": -2.51,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 50.0,
        "delta2": 0.71,
        "gd15": null,
        "games": 38,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.29,
        "soloKill": -1.0,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 57.5,
        "delta2": 9.76,
        "gd15": null,
        "games": 37,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -3.47,
        "soloKill": -1.61,
        "csAdv": null,
        "archetype": null
      },
      "나르": {
        "wr": 41.7,
        "delta2": -7.08,
        "gd15": null,
        "games": 24,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.12,
        "soloKill": -0.04,
        "csAdv": null,
        "archetype": null
      },
      "사이온": {
        "wr": 33.8,
        "delta2": -13.93,
        "gd15": null,
        "games": 36,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 0.2,
        "soloKill": 0.54,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 36.3,
        "delta2": -12.24,
        "gd15": null,
        "games": 31,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -0.07,
        "soloKill": 1.03,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 40.0,
        "delta2": -7.77,
        "gd15": null,
        "games": 35,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.34,
        "soloKill": -0.8,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 69.0,
        "delta2": 20.3,
        "gd15": null,
        "games": 29,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 4.03,
        "soloKill": 0.86,
        "csAdv": null,
        "archetype": null
      },
      "럼블": {
        "wr": 69.6,
        "delta2": 17.95,
        "gd15": null,
        "games": 23,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 6.17,
        "soloKill": 1.7,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 50.0,
        "delta2": 2.17,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.45,
        "soloKill": -0.1,
        "csAdv": null,
        "archetype": null
      },
      "올라프": {
        "wr": 44.4,
        "delta2": -2.78,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.56,
        "soloKill": -1.11,
        "csAdv": null,
        "archetype": null
      },
      "야스오": {
        "wr": 49.3,
        "delta2": -0.02,
        "gd15": null,
        "games": 19,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -1.8,
        "soloKill": -0.48,
        "csAdv": null,
        "archetype": null
      },
      "갱플랭크": {
        "wr": 57.1,
        "delta2": 9.34,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.43,
        "soloKill": 1.57,
        "csAdv": null,
        "archetype": null
      },
      "자헨": {
        "wr": 50.0,
        "delta2": 0.9,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.94,
        "soloKill": -0.44,
        "csAdv": null,
        "archetype": null
      },
      "문도 박사": {
        "wr": 50.0,
        "delta2": 0.16,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.35,
        "soloKill": 1.2,
        "csAdv": null,
        "archetype": null
      },
      "판테온": {
        "wr": 50.0,
        "delta2": 1.67,
        "gd15": null,
        "games": 22,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.68,
        "soloKill": -0.36,
        "csAdv": null,
        "archetype": null
      },
      "다리우스": {
        "wr": 50.0,
        "delta2": 1.85,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.33,
        "soloKill": 0.44,
        "csAdv": null,
        "archetype": null
      },
      "볼리베어": {
        "wr": 47.1,
        "delta2": 0.14,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.59,
        "soloKill": -1.65,
        "csAdv": null,
        "archetype": null
      },
      "케넨": {
        "wr": 66.7,
        "delta2": 17.32,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.4,
        "soloKill": -0.33,
        "csAdv": null,
        "archetype": null
      },
      "가렌": {
        "wr": 37.5,
        "delta2": -11.0,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.44,
        "soloKill": -2.44,
        "csAdv": null,
        "archetype": null
      },
      "티모": {
        "wr": 20.0,
        "delta2": -28.55,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.13,
        "soloKill": -0.27,
        "csAdv": null,
        "archetype": null
      },
      "세트": {
        "wr": 17.6,
        "delta2": -30.53,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.29,
        "soloKill": -1.53,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "초반 라인전 압박이 극심한 돌진형 브루저·암살자에 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "요릭": {
    "id": "Yorick",
    "aliases": [
      "요릭",
      "삽"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "중반",
    "playstyleTags": [
      "#사이드"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 45.1,
      "pr": 2.37,
      "br": 3.46,
      "games": 286
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "이렐리아",
      "요네"
    ],
    "counter": [
      "그웬",
      "잭스",
      "모데카이저"
    ],
    "matchupStats": {
      "모데카이저": {
        "wr": 40.7,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "모데 궁극기에 끌려가면 마녀와 분리되므로, W(벽)를 아꼈다가 궁 안에서 시간 끄는 용도로 쓰세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "이렐리아": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "구울이 이렐리아 Q 스택 먹이가 되므로 6렙 전 무리한 E 소환을 자제하고 덤불 조끼를 고려하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "제이스": {
        "wr": 38.7,
        "delta2": -9.75,
        "gd15": null,
        "games": 31,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.29,
        "soloKill": 0.06,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 60.0,
        "delta2": 11.66,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.2,
        "soloKill": -0.47,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 46.7,
        "delta2": -1.53,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.2,
        "soloKill": -1.2,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 지표상 모데카이저(59.3%)도 궁극기로 안개 마녀를 분리해 강력한 카운터로 작용",
    "laneExtra": {},
    "rosterType": "main"
  },
  "우디르": {
    "id": "Udyr",
    "aliases": [
      "우디르",
      "우딜"
    ],
    "damageType": "혼합",
    "rangeType": "근접",
    "roleTags": [
      "탱커",
      "브루저"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#유동적",
      "#사이드"
    ],
    "tier": "4티어",
    "stats": {
      "wr": 43.75,
      "pr": 0.53,
      "br": 0.15,
      "games": 64
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "제이스",
      "바루스"
    ],
    "counter": [
      "다리우스",
      "그웬",
      "나르"
    ],
    "matchupStats": {},
    "note": "뚜벅이 특성상 거리 조절·카이팅이 뛰어난 원거리 픽에 극약",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "우르곳": {
    "id": "Urgot",
    "aliases": [
      "우르곳",
      "게",
      "우가"
    ],
    "damageType": "AD",
    "rangeType": "원거리",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "중반",
    "playstyleTags": [
      "#유동적",
      "#사이드"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 53.85,
      "pr": 1.29,
      "br": 0.14,
      "games": 156
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 잭스 카운터 부각",
      "resetHistory": false
    },
    "hard": [
      "올라프"
    ],
    "counter": [
      "요릭",
      "이렐리아"
    ],
    "matchupStats": {},
    "note": "26.23 잭스 카운터(64.3%)로 부각. 궁(R) 처형을 저지불가로 씹는 올라프에 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "워윅": {
    "id": "Warwick",
    "aliases": [
      "워윅",
      "늑대"
    ],
    "damageType": "혼합",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#사이드"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 49.14,
      "pr": 1.45,
      "br": 0.42,
      "games": 175
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "케넨",
      "베인"
    ],
    "counter": [
      "볼리베어",
      "잭스",
      "바루스"
    ],
    "matchupStats": {},
    "note": "원거리 카이팅·치감 및 근접 맞다이 최상위권(볼베·잭스)에 약함",
    "laneExtra": {},
    "rosterType": "main"
  },
  "이렐리아": {
    "id": "Irelia",
    "aliases": [
      "이렐",
      "이렐리아"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저",
      "스커미셔"
    ],
    "difficulty": "어려움",
    "timing": "중반",
    "playstyleTags": [
      "#라인전",
      "#사이드"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 52.31,
      "pr": 6.28,
      "br": 24.98,
      "games": 759
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 2위 꿀챔",
      "resetHistory": false
    },
    "hard": [
      "카밀",
      "아칼리",
      "잭스",
      "요네",
      "갱플랭크"
    ],
    "counter": [
      "암베사",
      "레넥톤"
    ],
    "matchupStats": {
      "자헨": {
        "wr": 52.4,
        "delta2": 1.04,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": "초반 정면 맞다이가 밀리므로 4스택과 몰왕 타이밍을 맞춰 교전하세요.",
        "firstTower": null,
        "plates": 2.57,
        "soloKill": 1.0,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "볼리베어": {
        "wr": 62.5,
        "delta2": 13.28,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": "볼베 W 표식이 찍히면 절대 장기전을 하지 말고 미니언 Q로 빠져나오세요.",
        "firstTower": null,
        "plates": 3.5,
        "soloKill": 0.56,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "레넥톤": {
        "wr": 50.0,
        "delta2": -2.93,
        "gd15": null,
        "games": 30,
        "patches": 1,
        "tip": "레넥톤 강화 W 스턴을 이렐리아 W(피해 감소)로 받아내는 타이밍이 핵심입니다.",
        "firstTower": null,
        "plates": 1.93,
        "soloKill": 0.63,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "제이스": {
        "wr": 54.2,
        "delta2": 2.14,
        "gd15": null,
        "games": 48,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.12,
        "soloKill": 1.98,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 42.5,
        "delta2": -9.76,
        "gd15": null,
        "games": 37,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 3.47,
        "soloKill": 1.61,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 39.4,
        "delta2": -12.44,
        "gd15": null,
        "games": 33,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.82,
        "soloKill": -1.55,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 62.9,
        "delta2": 10.96,
        "gd15": null,
        "games": 35,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.11,
        "soloKill": -0.29,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 50.0,
        "delta2": -0.95,
        "gd15": null,
        "games": 30,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 4.57,
        "soloKill": 1.1,
        "csAdv": null,
        "archetype": null
      },
      "갱플랭크": {
        "wr": 44.1,
        "delta2": -5.91,
        "gd15": null,
        "games": 34,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.65,
        "soloKill": 1.03,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 48.0,
        "delta2": -3.55,
        "gd15": null,
        "games": 25,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.36,
        "soloKill": 0.76,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 53.3,
        "delta2": 3.27,
        "gd15": null,
        "games": 30,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.67,
        "soloKill": 0.0,
        "csAdv": null,
        "archetype": null
      },
      "나르": {
        "wr": 73.7,
        "delta2": 22.67,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 4.84,
        "soloKill": 2.0,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 62.5,
        "delta2": 11.7,
        "gd15": null,
        "games": 24,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.54,
        "soloKill": 0.33,
        "csAdv": null,
        "archetype": null
      },
      "세트": {
        "wr": 63.6,
        "delta2": 13.21,
        "gd15": null,
        "games": 22,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.73,
        "soloKill": 0.59,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 31.6,
        "delta2": -18.49,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.68,
        "soloKill": -0.63,
        "csAdv": null,
        "archetype": null
      },
      "아칼리": {
        "wr": 35.0,
        "delta2": -14.8,
        "gd15": null,
        "games": 15,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 2위 꿀챔. 지표상 자헨(60.5%), 볼리베어(59.6%), 레넥톤(55.3%)이 최상위 카운터",
    "laneExtra": {},
    "rosterType": "main"
  },
  "일라오이": {
    "id": "Illaoi",
    "aliases": [
      "일라",
      "문어",
      "촉수"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "중반",
    "playstyleTags": [
      "#라인전",
      "#사이드"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 56.6,
      "pr": 1.75,
      "br": 1.27,
      "games": 212
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "요릭",
      "케넨",
      "카시오페아"
    ],
    "counter": [
      "제이스",
      "티모",
      "라이즈",
      "베인"
    ],
    "matchupStats": {
      "요릭": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "요릭 구울이 일라오이 E(영혼의 시험)를 막아주므로 구울이 없을 때만 E를 던지세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "잭스": {
        "wr": 68.8,
        "delta2": 14.81,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.94,
        "soloKill": 0.81,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "E(영혼의 시험)를 소환수로 막는 요릭과 원거리 지속딜 픽에 무력",
    "laneExtra": {},
    "rosterType": "main"
  },
  "자크": {
    "id": "Zac",
    "aliases": [
      "자크",
      "젤리"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "탱커"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 54.79,
      "pr": 0.6,
      "br": 0.68,
      "games": 73
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "모데카이저",
      "볼리베어",
      "일라오이"
    ],
    "counter": [
      "다리우스",
      "럼블",
      "크산테",
      "베인"
    ],
    "matchupStats": {},
    "note": "젤리 회수 방해·지속전 체급 우위 픽에 취약",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "자헨": {
    "id": "Zaahen",
    "aliases": [
      "자헨"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#유동적",
      "#라인전"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 49.6,
      "pr": 4.15,
      "br": 0.56,
      "games": 502
    },
    "patchFlag": {
      "status": "meta_up",
      "label": "26.23 14위 꿀챔(벼폭검 너프 수혜)",
      "resetHistory": false
    },
    "hard": [
      "잭스",
      "올라프",
      "피오라",
      "암베사"
    ],
    "counter": [],
    "matchupStats": {
      "티모": {
        "wr": 34.1,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "실명(Q)에 딜이 끊기므로 선 2렙이나 정글 갱킹 없이는 무리한 진입을 피하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "크산테": {
        "wr": 53.8,
        "delta2": 3.21,
        "gd15": null,
        "games": 26,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.69,
        "soloKill": -0.15,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 47.6,
        "delta2": -1.04,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.57,
        "soloKill": -1.0,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 37.5,
        "delta2": -12.98,
        "gd15": null,
        "games": 24,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.29,
        "soloKill": -0.92,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 47.4,
        "delta2": -2.04,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.0,
        "soloKill": 0.84,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 40.0,
        "delta2": -8.67,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -6.45,
        "soloKill": -1.6,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 41.6,
        "delta2": -8.59,
        "gd15": null,
        "games": 21,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -1.65,
        "soloKill": -0.25,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 50.0,
        "delta2": -0.9,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.94,
        "soloKill": 0.44,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 52.4,
        "delta2": 0.82,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.9,
        "soloKill": -0.29,
        "csAdv": null,
        "archetype": null
      },
      "올라프": {
        "wr": 37.5,
        "delta2": -10.58,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.75,
        "soloKill": -0.75,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 53.3,
        "delta2": 4.56,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.33,
        "soloKill": -0.47,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 14위 꿀챔(26.22 Q 버프+벼폭검 너프 수혜). 지표상 티모(65.9%) 압도적 하드카운터. 팔이 길거나 평타 차단 픽에 약함",
    "laneExtra": {},
    "rosterType": "main"
  },
  "잭스": {
    "id": "Jax",
    "aliases": [
      "잭스"
    ],
    "damageType": "혼합",
    "rangeType": "근접",
    "roleTags": [
      "스커미셔",
      "브루저"
    ],
    "difficulty": "보통",
    "timing": "후반",
    "playstyleTags": [
      "#사이드",
      "#유동적"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 48.63,
      "pr": 9.05,
      "br": 16.59,
      "games": 1094
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "다리우스",
      "일라오이",
      "올라프",
      "크산테",
      "트린다미어",
      "피오라"
    ],
    "counter": [
      "볼리베어",
      "암베사",
      "그라가스"
    ],
    "matchupStats": {
      "신지드": {
        "wr": 33.3,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "접착제(W) 위에서 Q 도약이 막히므로 신지드 뒤를 쫓지 말고 라인 파밍에 집중하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "우르곳": {
        "wr": 35.7,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "반격(E) 타이밍에 우르곳 E(경멸)로 넘겨지지 않게 거리 조절을 유지하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "갱플랭크": {
        "wr": 50.9,
        "delta2": 2.72,
        "gd15": null,
        "games": 16,
        "patches": 3,
        "tip": "반격(E)으로 갱플 Q를 막을 수 있지만 화약통은 못 막으니 통을 먼저 지우세요.",
        "firstTower": null,
        "plates": 1.05,
        "soloKill": 0.24,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "가렌": {
        "wr": 42.0,
        "delta2": -6.92,
        "gd15": null,
        "games": 50,
        "patches": 1,
        "tip": "반격(E)으로 가렌 Q는 막지만 심판(E)은 못 막습니다. 가렌 E가 돌 때는 Q로 빠져나오세요.",
        "firstTower": null,
        "plates": -2.88,
        "soloKill": -1.78,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "말파이트": {
        "wr": 42.9,
        "delta2": -6.21,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": "말파이트 E 공속 감소가 치명적이므로 착취·짧은 W 딜교 위주로 버티세요.",
        "firstTower": null,
        "plates": 2.1,
        "soloKill": 0.86,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "하이머딩거": {
        "wr": null,
        "delta2": null,
        "gd15": -1907,
        "games": null,
        "patches": 1,
        "tip": "초반 포탑 압박이 극심하므로 도란 방패+재바 세팅으로 CS 손실만 최소화하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_trap"
      },
      "요네": {
        "wr": 44.6,
        "delta2": -5.82,
        "gd15": null,
        "games": 65,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.55,
        "soloKill": 1.52,
        "csAdv": null,
        "archetype": null
      },
      "그라가스": {
        "wr": 44.7,
        "delta2": -3.36,
        "gd15": null,
        "games": 38,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.45,
        "soloKill": 0.21,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 39.2,
        "delta2": -10.9,
        "gd15": null,
        "games": 51,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.14,
        "soloKill": -0.98,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 59.4,
        "delta2": 11.15,
        "gd15": null,
        "games": 50,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 5.95,
        "soloKill": 1.14,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 53.7,
        "delta2": 3.48,
        "gd15": null,
        "games": 54,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.41,
        "soloKill": 0.39,
        "csAdv": null,
        "archetype": null
      },
      "올라프": {
        "wr": 35.7,
        "delta2": -11.89,
        "gd15": null,
        "games": 42,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.9,
        "soloKill": -0.55,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 41.0,
        "delta2": -7.19,
        "gd15": null,
        "games": 39,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.21,
        "soloKill": -0.31,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 60.6,
        "delta2": 12.44,
        "gd15": null,
        "games": 33,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.82,
        "soloKill": 1.55,
        "csAdv": null,
        "archetype": null
      },
      "판테온": {
        "wr": 51.9,
        "delta2": 3.15,
        "gd15": null,
        "games": 27,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.22,
        "soloKill": -0.7,
        "csAdv": null,
        "archetype": null
      },
      "케넨": {
        "wr": 61.1,
        "delta2": 11.3,
        "gd15": null,
        "games": 36,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.83,
        "soloKill": -0.67,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 44.8,
        "delta2": -4.91,
        "gd15": null,
        "games": 29,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.62,
        "soloKill": -0.83,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 54.2,
        "delta2": 3.11,
        "gd15": null,
        "games": 24,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.17,
        "soloKill": 0.38,
        "csAdv": null,
        "archetype": null
      },
      "다리우스": {
        "wr": 33.3,
        "delta2": -15.27,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.67,
        "soloKill": 0.29,
        "csAdv": null,
        "archetype": null
      },
      "자헨": {
        "wr": 62.5,
        "delta2": 12.98,
        "gd15": null,
        "games": 24,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.29,
        "soloKill": 0.92,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 55.0,
        "delta2": 6.04,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.65,
        "soloKill": 0.45,
        "csAdv": null,
        "archetype": null
      },
      "아칼리": {
        "wr": 56.4,
        "delta2": 8.43,
        "gd15": null,
        "games": 25,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 2.27,
        "soloKill": -2.03,
        "csAdv": null,
        "archetype": null
      },
      "나르": {
        "wr": 57.9,
        "delta2": 8.7,
        "gd15": null,
        "games": 18,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 4.94,
        "soloKill": -0.47,
        "csAdv": null,
        "archetype": null
      },
      "트린다미어": {
        "wr": 38.1,
        "delta2": -8.77,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -4.19,
        "soloKill": -1.19,
        "csAdv": null,
        "archetype": null
      },
      "문도 박사": {
        "wr": 72.7,
        "delta2": 22.45,
        "gd15": null,
        "games": 22,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.82,
        "soloKill": 0.41,
        "csAdv": null,
        "archetype": null
      },
      "볼리베어": {
        "wr": 42.1,
        "delta2": -5.28,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.63,
        "soloKill": 0.58,
        "csAdv": null,
        "archetype": null
      },
      "모데카이저": {
        "wr": 60.0,
        "delta2": 11.36,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.27,
        "soloKill": -1.07,
        "csAdv": null,
        "archetype": null
      },
      "야스오": {
        "wr": 52.6,
        "delta2": 2.87,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.21,
        "soloKill": 1.47,
        "csAdv": null,
        "archetype": null
      },
      "일라오이": {
        "wr": 31.2,
        "delta2": -14.82,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.94,
        "soloKill": -0.81,
        "csAdv": null,
        "archetype": null
      },
      "리븐": {
        "wr": 46.7,
        "delta2": -1.76,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.67,
        "soloKill": -1.33,
        "csAdv": null,
        "archetype": null
      },
      "요릭": {
        "wr": 53.3,
        "delta2": 1.53,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.2,
        "soloKill": 1.2,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 상위권(4위). 지표상 신지드(66.7%), 우르곳(64.3%), 갱플랭크(63.0%), 가렌(58.1%), 말파이트(54.5%), 하이머딩거(15분 +1,907G) 강세",
    "laneExtra": {},
    "rosterType": "main"
  },
  "제드": {
    "id": "Zed",
    "aliases": [
      "제드",
      "탑제드"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "암살자"
    ],
    "difficulty": "어려움",
    "timing": "중반",
    "playstyleTags": [
      "#사이드",
      "#유동적"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 44.32,
      "pr": 0.73,
      "br": 22.34,
      "games": 88
    },
    "patchFlag": {
      "status": "nerf",
      "label": "26.23 벼락폭풍검 너프 직격탄",
      "resetHistory": false
    },
    "hard": [
      "말파이트",
      "가렌",
      "초가스"
    ],
    "counter": [
      "이렐리아",
      "리산드라",
      "아칼리",
      "레넥톤"
    ],
    "matchupStats": {},
    "note": "26.23 벼락폭풍검 너프 직격탄(39위). 방어력 탱커·체급 브루저 상대로 킬각 차단",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "제이스": {
    "id": "Jayce",
    "aliases": [
      "제이스"
    ],
    "damageType": "AD",
    "rangeType": "원거리",
    "roleTags": [
      "브루저",
      "딜러"
    ],
    "difficulty": "어려움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#사이드"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 48.19,
      "pr": 10.28,
      "br": 23.95,
      "games": 1243
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "문도 박사",
      "럼블",
      "모데카이저",
      "오른",
      "트린다미어",
      "야스오"
    ],
    "counter": [
      "크산테",
      "말파이트",
      "잭스",
      "피오라",
      "나르"
    ],
    "matchupStats": {
      "카밀": {
        "wr": 52.5,
        "delta2": 4.47,
        "gd15": null,
        "games": 40,
        "patches": 1,
        "tip": "카밀 E(갈고리) 돌진을 해머 E(천둥 강타)로 밀쳐내는 반응 속도가 생명입니다.",
        "firstTower": null,
        "plates": 2.53,
        "soloKill": 0.2,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "갱플랭크": {
        "wr": 65.0,
        "delta2": 17.05,
        "gd15": null,
        "games": 40,
        "patches": 1,
        "tip": "초반 평타 사거리로 화약통을 먼저 깨면서 주도권을 잡아야 합니다.",
        "firstTower": null,
        "plates": 3.93,
        "soloKill": 0.68,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "사이온": {
        "wr": 46.1,
        "delta2": -1.82,
        "gd15": null,
        "games": 32,
        "patches": 2,
        "tip": "초반 킬각을 못 내면 방어력 1코어 이후 뚫기 어려워지므로 초반 압박이 필수입니다.",
        "firstTower": null,
        "plates": 2.87,
        "soloKill": 0.55,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "말파이트": {
        "wr": 44.9,
        "delta2": -3.99,
        "gd15": null,
        "games": 94,
        "patches": 2,
        "tip": "6렙 전까지 말파이트 패시브 보호막을 계속 깨두고 6렙 궁 킬각을 조심하세요.",
        "firstTower": null,
        "plates": 1.02,
        "soloKill": -0.56,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "이렐리아": {
        "wr": 45.8,
        "delta2": -2.14,
        "gd15": -830,
        "games": 48,
        "patches": 1,
        "tip": "라인을 밀면 쫓겨 죽으므로 웨이브를 당겨서 포탑 앞을 유지하세요.",
        "firstTower": null,
        "plates": -5.12,
        "soloKill": -1.98,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "요네": {
        "wr": 59.2,
        "delta2": 9.01,
        "gd15": null,
        "games": 62,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 2.38,
        "soloKill": 0.59,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 44.9,
        "delta2": -4.98,
        "gd15": null,
        "games": 69,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.49,
        "soloKill": -0.8,
        "csAdv": null,
        "archetype": null
      },
      "올라프": {
        "wr": 40.7,
        "delta2": -6.67,
        "gd15": null,
        "games": 52,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -2.49,
        "soloKill": -0.71,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 46.3,
        "delta2": -3.48,
        "gd15": null,
        "games": 54,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.41,
        "soloKill": -0.39,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 57.9,
        "delta2": 8.41,
        "gd15": null,
        "games": 38,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.47,
        "soloKill": 1.08,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 44.7,
        "delta2": -3.26,
        "gd15": null,
        "games": 38,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.18,
        "soloKill": 0.08,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 51.2,
        "delta2": 2.47,
        "gd15": null,
        "games": 41,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.07,
        "soloKill": -0.29,
        "csAdv": null,
        "archetype": null
      },
      "나르": {
        "wr": 45.9,
        "delta2": -3.07,
        "gd15": null,
        "games": 37,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.89,
        "soloKill": 1.54,
        "csAdv": null,
        "archetype": null
      },
      "요릭": {
        "wr": 61.3,
        "delta2": 9.75,
        "gd15": null,
        "games": 31,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.29,
        "soloKill": -0.06,
        "csAdv": null,
        "archetype": null
      },
      "그라가스": {
        "wr": 48.5,
        "delta2": 0.66,
        "gd15": null,
        "games": 33,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.21,
        "soloKill": 0.12,
        "csAdv": null,
        "archetype": null
      },
      "판테온": {
        "wr": 41.3,
        "delta2": -7.23,
        "gd15": null,
        "games": 26,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 1.18,
        "soloKill": -1.08,
        "csAdv": null,
        "archetype": null
      },
      "야스오": {
        "wr": 41.2,
        "delta2": -8.31,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.41,
        "soloKill": -1.24,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 42.9,
        "delta2": -7.97,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.1,
        "soloKill": 1.24,
        "csAdv": null,
        "archetype": null
      },
      "트린다미어": {
        "wr": 36.8,
        "delta2": -9.85,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -6.16,
        "soloKill": -1.32,
        "csAdv": null,
        "archetype": null
      },
      "아칼리": {
        "wr": 52.6,
        "delta2": 4.86,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.16,
        "soloKill": -0.26,
        "csAdv": null,
        "archetype": null
      },
      "문도 박사": {
        "wr": 11.8,
        "delta2": -38.24,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -9.82,
        "soloKill": -1.35,
        "csAdv": null,
        "archetype": null
      },
      "럼블": {
        "wr": 33.3,
        "delta2": -18.54,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.8,
        "soloKill": -0.73,
        "csAdv": null,
        "archetype": null
      },
      "모데카이저": {
        "wr": 31.2,
        "delta2": -17.22,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.31,
        "soloKill": -2.0,
        "csAdv": null,
        "archetype": null
      },
      "오른": {
        "wr": 33.3,
        "delta2": -14.66,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.67,
        "soloKill": -0.6,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 지표상 카밀(63.6%), 갱플랭크(60.3%), 사이온(58.8%), 말파이트(56.0%)가 매우 강하며 15분 골드는 이렐리아(+830G) 최강",
    "laneExtra": {},
    "rosterType": "main"
  },
  "초가스": {
    "id": "Chogath",
    "aliases": [
      "초가스",
      "초가"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "탱커"
    ],
    "difficulty": "쉬움",
    "timing": "후반",
    "playstyleTags": [
      "#한타"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 51.09,
      "pr": 1.13,
      "br": 0.84,
      "games": 137
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "모데카이저",
      "올라프",
      "베인"
    ],
    "counter": [
      "그웬",
      "피오라",
      "아트록스"
    ],
    "matchupStats": {},
    "note": "체력 비례 피해 브루저에 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "카밀": {
    "id": "Camille",
    "aliases": [
      "카밀"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "스커미셔",
      "브루저"
    ],
    "difficulty": "어려움",
    "timing": "후반",
    "playstyleTags": [
      "#사이드",
      "#유동적"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 52.13,
      "pr": 5.43,
      "br": 1.22,
      "games": 656
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "잭스",
      "레넥톤"
    ],
    "counter": [
      "자헨",
      "제이스",
      "갱플랭크",
      "암베사"
    ],
    "matchupStats": {
      "잭스": {
        "wr": 40.6,
        "delta2": -11.15,
        "gd15": null,
        "games": 50,
        "patches": 2,
        "tip": "카밀 Q2타 고정 피해가 잭스 반격(E)에 막힙니다. 잭스 E가 돌 때 E(갈고리)로 빠지세요.",
        "firstTower": null,
        "plates": -5.95,
        "soloKill": -1.14,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "올라프": {
        "wr": 51.4,
        "delta2": 2.05,
        "gd15": null,
        "games": 37,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.08,
        "soloKill": -0.32,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 45.7,
        "delta2": -7.14,
        "gd15": null,
        "games": 35,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.0,
        "soloKill": -0.57,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 47.5,
        "delta2": -4.47,
        "gd15": null,
        "games": 40,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.53,
        "soloKill": -0.2,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 48.7,
        "delta2": -2.75,
        "gd15": null,
        "games": 39,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.74,
        "soloKill": 0.21,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 58.4,
        "delta2": 6.55,
        "gd15": null,
        "games": 23,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 3.73,
        "soloKill": -0.18,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 60.1,
        "delta2": 10.16,
        "gd15": null,
        "games": 18,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -4.41,
        "soloKill": 0.06,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 50.0,
        "delta2": -2.17,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.45,
        "soloKill": 0.1,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 65.0,
        "delta2": 14.29,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.4,
        "soloKill": 0.5,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 68.4,
        "delta2": 18.49,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.68,
        "soloKill": 0.63,
        "csAdv": null,
        "archetype": null
      },
      "나르": {
        "wr": 71.4,
        "delta2": 20.46,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.05,
        "soloKill": 0.48,
        "csAdv": null,
        "archetype": null
      },
      "자헨": {
        "wr": 46.7,
        "delta2": -4.56,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.33,
        "soloKill": 0.47,
        "csAdv": null,
        "archetype": null
      },
      "갱플랭크": {
        "wr": 46.7,
        "delta2": -3.22,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.0,
        "soloKill": 0.93,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 상위권(7위). 평타 차단(잭스·티모)과 초반 정면 맞다이 강자에 약함",
    "laneExtra": {},
    "rosterType": "main"
  },
  "카시오페아": {
    "id": "Cassiopeia",
    "aliases": [
      "카시",
      "뱀"
    ],
    "damageType": "AP",
    "rangeType": "원거리",
    "roleTags": [
      "메이지"
    ],
    "difficulty": "어려움",
    "timing": "후반",
    "playstyleTags": [
      "#한타",
      "#라인전"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 51.35,
      "pr": 0.61,
      "br": 2.13,
      "games": 74
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "올라프"
    ],
    "counter": [
      "이렐리아",
      "제이스",
      "요릭"
    ],
    "matchupStats": {},
    "note": "독 장판(W) 위에서도 CC 면제로 돌진하는 올라프가 천적",
    "laneExtra": {},
    "rosterType": "joker"
  },
  "케넨": {
    "id": "Kennen",
    "aliases": [
      "케넨",
      "피카츄"
    ],
    "damageType": "AP",
    "rangeType": "원거리",
    "roleTags": [
      "메이지"
    ],
    "difficulty": "보통",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#라인전"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 49.03,
      "pr": 3.42,
      "br": 3.02,
      "games": 414
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "말파이트",
      "요네",
      "크산테",
      "잭스"
    ],
    "counter": [],
    "matchupStats": {
      "피오라": {
        "wr": 55.0,
        "delta2": 6.61,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.15,
        "soloKill": 1.45,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 38.9,
        "delta2": -11.3,
        "gd15": null,
        "games": 36,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.83,
        "soloKill": 0.67,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 31.6,
        "delta2": -17.71,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.37,
        "soloKill": -0.53,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 33.3,
        "delta2": -17.32,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.4,
        "soloKill": 0.33,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 33.3,
        "delta2": -17.0,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.67,
        "soloKill": 0.2,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 천상계 피오라 카운터로 자주 기용. 유지력·라인 푸시 압박(요릭·나서스)과 맞포킹(제이스)에 약함",
    "laneExtra": {},
    "rosterType": "main"
  },
  "케일": {
    "id": "Kayle",
    "aliases": [
      "케일",
      "천사"
    ],
    "damageType": "혼합",
    "rangeType": "원거리",
    "roleTags": [
      "스커미셔",
      "딜러"
    ],
    "difficulty": "보통",
    "timing": "후반",
    "playstyleTags": [
      "#한타",
      "#사이드"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 51.26,
      "pr": 0.98,
      "br": 0.22,
      "games": 119
    },
    "patchFlag": {
      "status": "buff",
      "label": "최근 Q·R 쿨 버프",
      "resetHistory": false
    },
    "hard": [
      "이렐리아",
      "잭스",
      "나서스",
      "럼블",
      "제이스",
      "티모"
    ],
    "counter": [
      "라이즈"
    ],
    "matchupStats": {
      "크산테": {
        "wr": 60.0,
        "delta2": 8.59,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.6,
        "soloKill": 1.2,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "최근 Q·R 쿨타임 버프 후 후반 승률 최상위권. 초반 다이브·추격형 픽에 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "퀸": {
    "id": "Quinn",
    "aliases": [
      "퀸",
      "새"
    ],
    "damageType": "AD",
    "rangeType": "원거리",
    "roleTags": [
      "원딜",
      "암살자"
    ],
    "difficulty": "보통",
    "timing": "초반",
    "playstyleTags": [
      "#로밍",
      "#라인전"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 52.48,
      "pr": 0.84,
      "br": 0.38,
      "games": 101
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "말파이트",
      "럼블",
      "이렐리아",
      "티모"
    ],
    "counter": [
      "요릭",
      "사이온",
      "다리우스"
    ],
    "matchupStats": {
      "이렐리아": {
        "wr": 32.3,
        "delta2": null,
        "gd15": -1932,
        "games": null,
        "patches": 1,
        "tip": "퀸 E(공중제비)를 써도 이렐리아 Q로 바로 따라붙습니다. 6렙 전 타워 앞 파밍 후 로밍으로 푸세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "티모": {
        "wr": 36.7,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "실명(Q)이 빠지기 전엔 정면 평타 딜교를 피하고 시야 확보 후 로밍을 노리세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "다리우스": {
        "wr": 41.0,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "다리우스 E(선고)로 퀸 E가 끊기면 즉사합니다. E를 선진입용으로 절대 쓰지 마세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      }
    },
    "note": "26.23 지표상 이렐리아(67.7%, 15분 +1,932G), 티모(63.3%), 다리우스(59.0%)가 최강 카운터",
    "laneExtra": {},
    "rosterType": "main"
  },
  "크산테": {
    "id": "KSante",
    "aliases": [
      "크산",
      "산테"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "탱커",
      "브루저"
    ],
    "difficulty": "어려움",
    "timing": "중반",
    "playstyleTags": [
      "#한타",
      "#유동적"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 48.43,
      "pr": 8.71,
      "br": 5.56,
      "games": 1053
    },
    "patchFlag": {
      "status": "buff",
      "label": "26.23 W 버프",
      "resetHistory": false
    },
    "hard": [
      "말파이트",
      "요릭",
      "이렐리아",
      "피오라",
      "럼블",
      "케일"
    ],
    "counter": [
      "요네",
      "판테온",
      "볼리베어",
      "다리우스",
      "나르",
      "자헨"
    ],
    "matchupStats": {
      "암베사": {
        "wr": 48.7,
        "delta2": -0.9,
        "gd15": null,
        "games": 39,
        "patches": 1,
        "tip": "암베사의 기동성 때문에 Q3·W 적중이 어렵습니다. 포탑 쪽 벽각을 노려 반격하세요.",
        "firstTower": null,
        "plates": -0.74,
        "soloKill": 0.46,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "가렌": {
        "wr": 45.8,
        "delta2": -3.02,
        "gd15": null,
        "games": 24,
        "patches": 1,
        "tip": "가렌 침묵(Q)과 궁극기 고정 피해에 총공세(R) 상태가 매우 취약합니다. 반피 이하로 R을 쓰지 마세요.",
        "firstTower": null,
        "plates": -3.62,
        "soloKill": -0.67,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "갱플랭크": {
        "wr": 40.0,
        "delta2": -8.07,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": "갱플 귤(W)이 크산테 R을 풀 수 있으므로 귤이 빠진 타이밍을 노리세요.",
        "firstTower": null,
        "plates": 1.25,
        "soloKill": 0.85,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "럼블": {
        "wr": 42.9,
        "delta2": -9.06,
        "gd15": null,
        "games": 28,
        "patches": 1,
        "tip": "초반 마방 1코어(케이닉 루컨 등) 전까지 과열 딜교를 피하세요.",
        "firstTower": null,
        "plates": 1.0,
        "soloKill": 0.64,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "나르": {
        "wr": 45.8,
        "delta2": -3.3,
        "gd15": -563,
        "games": 59,
        "patches": 1,
        "tip": "도란 방패+재바로 버티며 6렙 이후 벽각을 노리세요.",
        "firstTower": null,
        "plates": 0.29,
        "soloKill": 0.56,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "제이스": {
        "wr": 55.1,
        "delta2": 4.98,
        "gd15": null,
        "games": 69,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.49,
        "soloKill": 0.8,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 60.8,
        "delta2": 10.9,
        "gd15": null,
        "games": 51,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.14,
        "soloKill": 0.98,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 51.6,
        "delta2": 0.61,
        "gd15": null,
        "games": 31,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.39,
        "soloKill": 0.19,
        "csAdv": null,
        "archetype": null
      },
      "다리우스": {
        "wr": 45.0,
        "delta2": -3.47,
        "gd15": null,
        "games": 40,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.55,
        "soloKill": 0.1,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 45.1,
        "delta2": -5.21,
        "gd15": null,
        "games": 46,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -1.8,
        "soloKill": 0.22,
        "csAdv": null,
        "archetype": null
      },
      "베인": {
        "wr": 52.2,
        "delta2": 2.66,
        "gd15": null,
        "games": 36,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 0.89,
        "soloKill": 0.23,
        "csAdv": null,
        "archetype": null
      },
      "자헨": {
        "wr": 46.2,
        "delta2": -3.21,
        "gd15": null,
        "games": 26,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.69,
        "soloKill": 0.15,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 37.1,
        "delta2": -10.96,
        "gd15": null,
        "games": 35,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.11,
        "soloKill": 0.29,
        "csAdv": null,
        "archetype": null
      },
      "피오라": {
        "wr": 38.2,
        "delta2": -9.88,
        "gd15": null,
        "games": 34,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -8.59,
        "soloKill": -2.32,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 41.6,
        "delta2": -6.55,
        "gd15": null,
        "games": 23,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -3.73,
        "soloKill": 0.18,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 53.8,
        "delta2": 4.94,
        "gd15": null,
        "games": 26,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.35,
        "soloKill": 0.27,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 36.8,
        "delta2": -12.21,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.89,
        "soloKill": 1.11,
        "csAdv": null,
        "archetype": null
      },
      "그웬": {
        "wr": 43.8,
        "delta2": -5.82,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -0.69,
        "soloKill": 0.75,
        "csAdv": null,
        "archetype": null
      },
      "올라프": {
        "wr": 57.1,
        "delta2": 9.61,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.1,
        "soloKill": -0.43,
        "csAdv": null,
        "archetype": null
      },
      "판테온": {
        "wr": 44.4,
        "delta2": -4.25,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.28,
        "soloKill": 0.39,
        "csAdv": null,
        "archetype": null
      },
      "케일": {
        "wr": 40.0,
        "delta2": -8.59,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.6,
        "soloKill": -1.2,
        "csAdv": null,
        "archetype": null
      },
      "사이온": {
        "wr": 47.4,
        "delta2": -0.64,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.37,
        "soloKill": 0.89,
        "csAdv": null,
        "archetype": null
      },
      "볼리베어": {
        "wr": 43.8,
        "delta2": -3.48,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.69,
        "soloKill": -0.25,
        "csAdv": null,
        "archetype": null
      },
      "모데카이저": {
        "wr": 52.9,
        "delta2": 4.36,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 1.29,
        "soloKill": 0.06,
        "csAdv": null,
        "archetype": null
      },
      "케넨": {
        "wr": 66.7,
        "delta2": 17.0,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.67,
        "soloKill": -0.2,
        "csAdv": null,
        "archetype": null
      },
      "아칼리": {
        "wr": 60.0,
        "delta2": 12.14,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.87,
        "soloKill": 0.67,
        "csAdv": null,
        "archetype": null
      },
      "요릭": {
        "wr": 40.0,
        "delta2": -11.66,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -5.2,
        "soloKill": 0.47,
        "csAdv": null,
        "archetype": null
      },
      "오른": {
        "wr": 53.3,
        "delta2": 5.22,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.27,
        "soloKill": 1.13,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 W 버프. 지표상 암베사(61.9%), 가렌(61.8%), 갱플랭크(58.9%), 럼블(54.9%) 및 나르(15분 +563G)가 매우 강함",
    "laneExtra": {},
    "rosterType": "main"
  },
  "클레드": {
    "id": "Kled",
    "aliases": [
      "클레드",
      "스칼"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "보통",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#로밍"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 52.38,
      "pr": 1.74,
      "br": 0.75,
      "games": 210
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "피오라",
      "바루스"
    ],
    "counter": [
      "볼리베어",
      "잭스",
      "말파이트",
      "뽀삐",
      "가렌",
      "케넨"
    ],
    "matchupStats": {
      "피오라": {
        "wr": null,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 3,
        "tip": "클레드 Q 밧줄 당겨지는 타이밍이 피오라 응수(W) 확정 기절 각이므로 선픽을 피하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "올라프": {
        "wr": 50.0,
        "delta2": 0.53,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.81,
        "soloKill": 1.0,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "Q 밧줄 응수(피오라) 및 재탑승 차단·처형 픽에 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "탐 켄치": {
    "id": "TahmKench",
    "aliases": [
      "탐켄치",
      "켄치",
      "메기"
    ],
    "damageType": "AP",
    "rangeType": "근접",
    "roleTags": [
      "탱커"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#한타"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 44.44,
      "pr": 0.67,
      "br": 0.32,
      "games": 81
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "요릭"
    ],
    "counter": [
      "일라오이",
      "베인"
    ],
    "matchupStats": {},
    "note": "소환수로 Q(혀 채찍) 각을 원천 차단하는 요릭이 극상성",
    "laneExtra": {},
    "rosterType": "main"
  },
  "트런들": {
    "id": "Trundle",
    "aliases": [
      "트런들",
      "트롤"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#사이드",
      "#라인전"
    ],
    "tier": "3티어",
    "stats": {
      "wr": 51.72,
      "pr": 0.72,
      "br": 0.12,
      "games": 87
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "볼리베어",
      "잭스",
      "나르"
    ],
    "counter": [
      "아칼리"
    ],
    "matchupStats": {
      "올라프": {
        "wr": 60.0,
        "delta2": 10.86,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.4,
        "soloKill": -0.53,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 피오라 라인전 카운터(+1,197G). 평타 차단(잭스)과 카이팅(나르)에 취약",
    "laneExtra": {},
    "rosterType": "main"
  },
  "트린다미어": {
    "id": "Tryndamere",
    "aliases": [
      "트린",
      "트린다"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "스커미셔"
    ],
    "difficulty": "쉬움",
    "timing": "중반",
    "playstyleTags": [
      "#사이드"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 54.9,
      "pr": 2.53,
      "br": 1.11,
      "games": 306
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "암베사"
    ],
    "counter": [],
    "matchupStats": {
      "티모": {
        "wr": 37.1,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "티모 실명(Q) 지속 시간 동안 딜이 0이 되므로 Q가 빠진 걸 확인하고 E+유체화로 진입하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "잭스": {
        "wr": 61.9,
        "delta2": 8.77,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 4.19,
        "soloKill": 1.19,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 63.2,
        "delta2": 9.85,
        "gd15": null,
        "games": 19,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 6.16,
        "soloKill": 1.32,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 52.9,
        "delta2": 0.65,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 7.06,
        "soloKill": 0.35,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 43.8,
        "delta2": -9.04,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 2.06,
        "soloKill": -0.19,
        "csAdv": null,
        "archetype": null
      },
      "갱플랭크": {
        "wr": 53.3,
        "delta2": 1.99,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 6.4,
        "soloKill": 1.53,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 지표상 티모(62.9%)도 실명으로 트린다미어 상대로 압도적 우위",
    "laneExtra": {},
    "rosterType": "main"
  },
  "티모": {
    "id": "Teemo",
    "aliases": [
      "티모",
      "버섯"
    ],
    "damageType": "AP",
    "rangeType": "원거리",
    "roleTags": [
      "원딜",
      "메이지"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#사이드"
    ],
    "tier": "2티어",
    "stats": {
      "wr": 50.7,
      "pr": 2.95,
      "br": 4.89,
      "games": 357
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "올라프",
      "라이즈",
      "카시오페아"
    ],
    "counter": [
      "사이온",
      "나서스",
      "모데카이저",
      "말파이트"
    ],
    "matchupStats": {
      "모데카이저": {
        "wr": 40.5,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "6렙 이후 모데 궁극기 안에서는 버섯이 지워지므로 E 끌림 각을 절대 주지 마세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "사이온": {
        "wr": 43.0,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "사이온 E 둔화 후 Q 차징에 맞으면 킬각이 나오므로 W 이속으로 옆으로 피하세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "말파이트": {
        "wr": 45.3,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "말파이트 Q 포킹과 6렙 원콤을 버티기 위해 초반 마방·체력 아이템을 섞으세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "이렐리아": {
        "wr": null,
        "delta2": null,
        "gd15": -954,
        "games": null,
        "patches": 1,
        "tip": "실명(Q)을 이렐리아가 Q로 붙은 직후에 아껴 써야 맞딜을 버팁니다.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_trap"
      },
      "올라프": {
        "wr": 42.9,
        "delta2": -5.73,
        "gd15": null,
        "games": 21,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.43,
        "soloKill": -1.48,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 80.0,
        "delta2": 28.55,
        "gd15": null,
        "games": 15,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.13,
        "soloKill": 0.27,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 지표상 모데카이저(59.5%), 사이온(57.0%), 말파이트(54.7%), 이렐리아(15분 +954G)가 강세",
    "laneExtra": {},
    "rosterType": "main"
  },
  "판테온": {
    "id": "Pantheon",
    "aliases": [
      "판테",
      "빵테"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "브루저",
      "암살자"
    ],
    "difficulty": "쉬움",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#로밍"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 51.13,
      "pr": 3.66,
      "br": 4.86,
      "games": 442
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "말파이트"
    ],
    "counter": [
      "잭스"
    ],
    "matchupStats": {
      "피오라": {
        "wr": 40.6,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "판테온 W 스턴이 피오라 응수(W)에 막히면 역기절 당하므로 Q 포킹 위주로 깎아두세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "late_turnaround"
      },
      "잭스": {
        "wr": 48.1,
        "delta2": -3.15,
        "gd15": null,
        "games": 27,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -2.22,
        "soloKill": 0.7,
        "csAdv": null,
        "archetype": null
      },
      "제이스": {
        "wr": 58.7,
        "delta2": 7.23,
        "gd15": null,
        "games": 26,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -1.18,
        "soloKill": 1.08,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 50.0,
        "delta2": -1.67,
        "gd15": null,
        "games": 22,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.68,
        "soloKill": 0.36,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 55.6,
        "delta2": 4.25,
        "gd15": null,
        "games": 18,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.28,
        "soloKill": -0.39,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 43.8,
        "delta2": -6.56,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -3.88,
        "soloKill": -0.56,
        "csAdv": null,
        "archetype": null
      },
      "레넥톤": {
        "wr": 68.7,
        "delta2": 16.36,
        "gd15": null,
        "games": 15,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": -2.38,
        "soloKill": -0.38,
        "csAdv": null,
        "archetype": null
      },
      "아트록스": {
        "wr": 62.5,
        "delta2": 12.29,
        "gd15": null,
        "games": 16,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": -1.06,
        "soloKill": 0.31,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 상위권(12위). 지표상 피오라(59.4%)도 W 응수 구도로 판테온에게 강함",
    "laneExtra": {},
    "rosterType": "main"
  },
  "피오라": {
    "id": "Fiora",
    "aliases": [
      "피오라"
    ],
    "damageType": "AD",
    "rangeType": "근접",
    "roleTags": [
      "스커미셔"
    ],
    "difficulty": "어려움",
    "timing": "후반",
    "playstyleTags": [
      "#사이드"
    ],
    "tier": "1티어",
    "stats": {
      "wr": 52.26,
      "pr": 5.67,
      "br": 5.87,
      "games": 685
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "카밀",
      "케넨"
    ],
    "counter": [
      "아트록스",
      "암베사",
      "이렐리아"
    ],
    "matchupStats": {
      "아트록스": {
        "wr": 46.9,
        "delta2": -3.87,
        "gd15": null,
        "games": 32,
        "patches": 1,
        "tip": "아트록스 Q3타나 W 사슬 끊김 타이밍에 응수(W)를 맞추는 심리전이 핵심입니다.",
        "firstTower": null,
        "plates": 4.91,
        "soloKill": -0.06,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "가렌": {
        "wr": 43.6,
        "delta2": null,
        "gd15": null,
        "games": null,
        "patches": 1,
        "tip": "가렌 Q 침묵 모션을 응수(W)로 막으면 딜교가 크게 유리해집니다.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "레넥톤": {
        "wr": 51.9,
        "delta2": -1.0,
        "gd15": null,
        "games": 20,
        "patches": 2,
        "tip": "레넥톤 강화 W 스턴을 응수(W)로 반사하는 타이밍 싸움입니다.",
        "firstTower": null,
        "plates": 5.4,
        "soloKill": 0.19,
        "csAdv": null,
        "archetype": "lane_dominate"
      },
      "트런들": {
        "wr": null,
        "delta2": null,
        "gd15": -1197,
        "games": null,
        "patches": 1,
        "tip": "초반 정면 맞다이는 밀리므로 Q 급소 견제로 치고 빠지며 1코어 이후를 보세요.",
        "firstTower": null,
        "plates": null,
        "soloKill": null,
        "csAdv": null,
        "archetype": "lane_trap"
      },
      "제이스": {
        "wr": 55.3,
        "delta2": 3.26,
        "gd15": null,
        "games": 38,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 3.18,
        "soloKill": -0.08,
        "csAdv": null,
        "archetype": null
      },
      "잭스": {
        "wr": 59.0,
        "delta2": 7.19,
        "gd15": null,
        "games": 39,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.21,
        "soloKill": 0.31,
        "csAdv": null,
        "archetype": null
      },
      "크산테": {
        "wr": 61.8,
        "delta2": 9.88,
        "gd15": null,
        "games": 34,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 8.59,
        "soloKill": 2.32,
        "csAdv": null,
        "archetype": null
      },
      "요네": {
        "wr": 60.0,
        "delta2": 7.77,
        "gd15": null,
        "games": 35,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.34,
        "soloKill": 0.8,
        "csAdv": null,
        "archetype": null
      },
      "케넨": {
        "wr": 45.0,
        "delta2": -6.61,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.15,
        "soloKill": -1.45,
        "csAdv": null,
        "archetype": null
      },
      "이렐리아": {
        "wr": 46.7,
        "delta2": -3.27,
        "gd15": null,
        "games": 30,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 0.67,
        "soloKill": 0.0,
        "csAdv": null,
        "archetype": null
      },
      "말파이트": {
        "wr": 51.7,
        "delta2": 0.78,
        "gd15": null,
        "games": 29,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 6.31,
        "soloKill": -0.14,
        "csAdv": null,
        "archetype": null
      },
      "카밀": {
        "wr": 39.9,
        "delta2": -10.16,
        "gd15": null,
        "games": 18,
        "patches": 2,
        "tip": null,
        "firstTower": null,
        "plates": 4.41,
        "soloKill": -0.06,
        "csAdv": null,
        "archetype": null
      },
      "자헨": {
        "wr": 60.0,
        "delta2": 8.67,
        "gd15": null,
        "games": 20,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 6.45,
        "soloKill": 1.6,
        "csAdv": null,
        "archetype": null
      },
      "암베사": {
        "wr": 47.8,
        "delta2": -3.72,
        "gd15": null,
        "games": 23,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 5.57,
        "soloKill": -0.3,
        "csAdv": null,
        "archetype": null
      },
      "다리우스": {
        "wr": 52.9,
        "delta2": 2.52,
        "gd15": null,
        "games": 17,
        "patches": 1,
        "tip": null,
        "firstTower": null,
        "plates": 6.65,
        "soloKill": -0.12,
        "csAdv": null,
        "archetype": null
      }
    },
    "note": "26.23 상위권(8위). 지표상 아트록스(57.0%), 가렌(56.4%), 레넥톤(53.3%), 트런들(15분 +1,197G) 및 천상계 케넨이 강세",
    "laneExtra": {},
    "rosterType": "main"
  },
  "하이머딩거": {
    "id": "Heimerdinger",
    "aliases": [
      "딩거",
      "하딩",
      "하이머"
    ],
    "damageType": "AP",
    "rangeType": "원거리",
    "roleTags": [
      "메이지"
    ],
    "difficulty": "보통",
    "timing": "초반",
    "playstyleTags": [
      "#라인전",
      "#사이드"
    ],
    "tier": "4티어",
    "stats": {
      "wr": 47.06,
      "pr": 1.13,
      "br": 2.01,
      "games": 136
    },
    "patchFlag": {
      "status": null,
      "label": null,
      "resetHistory": false
    },
    "hard": [
      "야스오"
    ],
    "counter": [
      "갱플랭크",
      "나서스",
      "라이즈"
    ],
    "matchupStats": {},
    "note": "포탑을 장막·스택·원거리 스킬로 손쉽게 지우는 픽에 약함",
    "laneExtra": {},
    "rosterType": "joker"
  }
}
};

(function bindAndValidateTopData() {
  const topBundle = window.BANPICK_DATA.top;
  const rawChampions = topBundle.champions;
  const externalMap = topBundle.externalChampions || {};

  window.PATCH_VERSION_TOP = topBundle.meta.patch;
  window.DATA_TOP_VERSION = topBundle.meta.dataVersion || topBundle.meta.schemaVersion;

  const idMap = {};
  Object.keys(rawChampions).forEach((name) => {
    idMap[name] = rawChampions[name].id;
  });
  Object.keys(externalMap).forEach((name) => {
    idMap[name] = externalMap[name].id;
  });
  window.CHAMPION_ID_MAP_TOP = idMap;

  const normalizedObj = {};
  const normalizedArr = [];
  const warnings = [];

  Object.keys(rawChampions).forEach((name) => {
    const c = rawChampions[name];

    ["hard", "counter"].forEach((key) => {
      (c[key] || []).forEach((target) => {
        if (!rawChampions[target] && !externalMap[target]) {
          warnings.push(`[data_top.js] "${name}"의 ${key} 항목에 미등록 챔피언 "${target}" 발견`);
        }
      });
    });

    const entry = {
      name: name,
      id: c.id,
      en: c.id,
      rosterType: c.rosterType || "main",
      aliases: c.aliases || [],
      damageType: c.damageType,
      rangeType: c.rangeType,
      roleTags: c.roleTags || [],
      difficulty: c.difficulty,
      timing: c.timing,
      playstyleTags: c.playstyleTags || [],
      tier: c.tier,
      stats: c.stats || { wr: null, pr: null, br: null, games: null },
      patchFlag: c.patchFlag || { status: null, label: null, resetHistory: false },
      hard: c.hard || [],
      soft: c.counter || [],
      counter: c.counter || [],
      counters: c.counter || [],
      matchupStats: c.matchupStats || {},
      note: c.note || "",
      memo: c.note || "",
      laneExtra: c.laneExtra || {}
    };

    normalizedObj[name] = entry;
    normalizedArr.push(entry);
  });

  if (warnings.length > 0 && typeof console !== "undefined") {
    console.warn("BANPICK 데이터 검증 경고:", warnings);
  }

  window.DATA_TOP = normalizedObj;
  window.TOP_DATA = normalizedObj;
  window.LOL_TOP_DATA = normalizedObj;
  window.TOP_CHAMPIONS = normalizedArr;
})();
