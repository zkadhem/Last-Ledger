import type { EngineState, RunEndReason } from "../types";
import { BALANCE } from "./balance";

export function checkEnd(state: EngineState): { ended: boolean; reason?: RunEndReason } {
  if (state.week > state.weeksTotal) return { ended: true, reason: "survived" };

  if (state.stats.stability <= BALANCE.minStability) return { ended: true, reason: "collapse" };

  if (state.stats.debt >= BALANCE.debtSpiral) return { ended: true, reason: "debt_spiral" };

  // “bankrupt” if deeply negative and cannot meaningfully recover this week
  if (state.stats.treasury <= BALANCE.bankruptFloor && state.stats.debt >= BALANCE.debtDanger) {
    return { ended: true, reason: "bankrupt" };
  }

  return { ended: false };
}
