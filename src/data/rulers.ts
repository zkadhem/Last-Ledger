import type { Ruler } from "../types";

export const RULERS: Ruler[] = [
  {
    id: "ruler_paranoid_king",
    name: "King Aldren",
    epithet: "the Paranoid",
    description: "Sees plots everywhere. Stability is brittle; coup risk grows faster, but espionage requests are cheaper.",
    starting: { stability: 62, coupRisk: 18, loyalty: { nobles: 55, underworld: 45 } },
    mods: { coupRiskDrift: 0.6, expensePressure: 0.05 }
  },
  {
    id: "ruler_charismatic_queen",
    name: "Queen Seraphine",
    epithet: "the Beloved",
    description: "Loyalty trends higher. Corruption is harder to conceal.",
    starting: { stability: 70, corruption: 8, loyalty: { peasants: 70, army: 62 } },
    mods: { loyaltyDrift: { peasants: +0.6, army: +0.4, mages: +0.2 }, corruptionDrift: 0.3 }
  },
  {
    id: "ruler_fanatical_heir",
    name: "Prince Kael",
    epithet: "the Fanatical",
    description: "Holy projects surge. Inflation is tempting. Denying cult demands is dangerous.",
    starting: { stability: 58, inflation: 12, loyalty: { mages: 48, nobles: 58 } },
    mods: { inflationDrift: 0.4, expensePressure: 0.12 }
  },
  {
    id: "ruler_tired_regent",
    name: "Regent Moria",
    epithet: "the Exhausted",
    description: "The kingdom is already fraying. You start with debt, but requests are slightly smaller.",
    starting: { treasury: 420, debt: 260, stability: 52, corruption: 14, loyalty: { peasants: 55, army: 50 } },
    mods: { expensePressure: -0.05, stabilityDrift: -0.2 }
  }
];
