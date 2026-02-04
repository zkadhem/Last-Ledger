import type { EngineState, RunEndReason } from "../types";

export type RunResult = {
  reason: RunEndReason;
  weeksSurvived: number;
  finalTreasury: number;
  finalDebt: number;
  finalStability: number;
  finalCorruption: number;
  finalInflation: number;
  finalCoupRisk: number;
  score: number;
};

export function scoreRun(state: EngineState, reason: RunEndReason): RunResult {
  const weeksSurvived = Math.min(state.week - 1, state.weeksTotal);
  const s = state.stats;

  // score encourages survival, stability, and not spiraling debt
  const score =
    weeksSurvived * 20 +
    Math.round(s.stability * 6) +
    Math.round(Math.max(0, s.treasury) * 0.2) -
    Math.round(s.debt * 0.25) -
    Math.round(s.inflation * 5) -
    Math.round(s.corruption * 4);

  return {
    reason,
    weeksSurvived,
    finalTreasury: s.treasury,
    finalDebt: s.debt,
    finalStability: s.stability,
    finalCorruption: s.corruption,
    finalInflation: s.inflation,
    finalCoupRisk: s.coupRisk,
    score
  };
}
