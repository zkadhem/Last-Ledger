import React from "react";
import { useGameStore } from "../../store/useGameStore";
import { Card } from "../components/Card";
import { CONTENT } from "../../engine/content";

function reasonText(r: string) {
  switch (r) {
    case "survived": return "You survived the reign. The kingdom limps onward.";
    case "bankrupt": return "The treasury broke. Creditors now own the crown.";
    case "collapse": return "Stability hit zero. The realm fractured into screaming pieces.";
    case "coup": return "A coup replaced the throne—your ledger was the smoking gun.";
    case "debt_spiral": return "Debt exceeded the realm’s future. The future refused payment.";
    default: return "The reign ended.";
  }
}

export function GameOverScreen() {
  const { lastResult, meta, run, go } = useGameStore(s => ({
    lastResult: s.lastResult,
    meta: s.meta,
    run: s.run,
    go: s.go
  }));

  if (!lastResult || !run) return null;

  const ruler = CONTENT.rulers.find(r => r.id === run.rulerId);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <div className="text-lg font-semibold">Reign Concluded</div>
        <div className="mt-2 text-sm text-slate-300">{reasonText(lastResult.reason)}</div>
        <div className="mt-2 text-xs text-slate-400">
          {ruler?.name} {ruler?.epithet} • Seed <span className="font-mono">{run.seed}</span>
        </div>
      </Card>

      <Card>
        <div className="text-sm font-semibold">Run Summary</div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            <div className="text-[11px] text-slate-400">Weeks survived</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">{lastResult.weeksSurvived}</div>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            <div className="text-[11px] text-slate-400">Score</div>
            <div className="mt-1 text-lg font-semibold tabular-nums">{lastResult.score}</div>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            <div className="text-[11px] text-slate-400">Treasury</div>
            <div className="mt-1 text-sm font-semibold tabular-nums">{Math.round(lastResult.finalTreasury)}</div>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            <div className="text-[11px] text-slate-400">Debt</div>
            <div className="mt-1 text-sm font-semibold tabular-nums">{Math.round(lastResult.finalDebt)}</div>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            <div className="text-[11px] text-slate-400">Stability</div>
            <div className="mt-1 text-sm font-semibold tabular-nums">{Math.round(lastResult.finalStability)}</div>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            <div className="text-[11px] text-slate-400">Corruption</div>
            <div className="mt-1 text-sm font-semibold tabular-nums">{Math.round(lastResult.finalCorruption)}</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-sm font-semibold">Meta Progress</div>
        <div className="mt-2 text-xs text-slate-400">
          Failing is expected. Learning is progress. Unlocks are based on runs played, best weeks, and extremes reached.
        </div>

        <div className="mt-3 grid gap-2 text-xs">
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            Runs played: <span className="tabular-nums text-slate-200">{meta.runsPlayed}</span> • Wins:{" "}
            <span className="tabular-nums text-slate-200">{meta.wins}</span>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            Best score: <span className="tabular-nums text-slate-200">{meta.bestScore}</span> • Best weeks:{" "}
            <span className="tabular-nums text-slate-200">{meta.bestWeeks}</span>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            Unlocked policies: <span className="tabular-nums text-slate-200">{meta.unlockedPolicyIds.length}</span> • Unlocked rulers:{" "}
            <span className="tabular-nums text-slate-200">{meta.unlockedRulerIds.length}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="rounded-2xl bg-indigo-500/20 px-4 py-3 text-sm font-semibold ring-1 ring-indigo-400/25 hover:bg-indigo-500/25"
            onClick={() => go("title")}
          >
            New Run
          </button>
          <button
            className="rounded-2xl px-4 py-3 text-sm ring-1 ring-slate-700 hover:bg-slate-900/60"
            onClick={() => go("meta")}
          >
            Meta Screen
          </button>
        </div>
      </Card>
    </div>
  );
}
