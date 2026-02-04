import type { RunResult } from "./scoring";

export type MetaState = {
  runsPlayed: number;
  wins: number;
  bestScore: number;
  bestWeeks: number;

  unlockedPolicyIds: string[];
  unlockedRulerIds: string[];

  runHistory: Array<{ at: number; result: RunResult }>;
};

const KEY = "last-ledger-meta-v1";

export function defaultMeta(): MetaState {
  return {
    runsPlayed: 0,
    wins: 0,
    bestScore: 0,
    bestWeeks: 0,
    // More starter policies unlocked by default
    unlockedPolicyIds: [
      "paper_crown",
      "austerity_edict", 
      "clerks_union",
      "merchant_guild",
      "peasant_militia",
      "open_courts",
      "border_tariffs",
      "coin_debasement",
      "noble_patronage"
    ],
    unlockedRulerIds: ["ruler_paranoid_king", "ruler_charismatic_queen"],
    runHistory: []
  };
}

export function loadMeta(): MetaState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultMeta();
    const parsed = JSON.parse(raw) as MetaState;
    return { ...defaultMeta(), ...parsed };
  } catch {
    return defaultMeta();
  }
}

export function saveMeta(meta: MetaState) {
  localStorage.setItem(KEY, JSON.stringify(meta));
}

export function wipeMeta() {
  localStorage.removeItem(KEY);
}
