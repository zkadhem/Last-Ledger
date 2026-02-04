import React from "react";
import { Card } from "../components/Card";
import { useGameStore } from "../../store/useGameStore";
import { BALANCE } from "../../engine/balance";
import type { FactionId } from "../../types";

export function ActionsPanel(props: { disabled?: boolean }) {
  const { run, actLoan, actInflate, actEmbezzle, actBribe, actInvest } = useGameStore(s => ({
    run: s.run,
    actLoan: s.actLoan,
    actInflate: s.actInflate,
    actEmbezzle: s.actEmbezzle,
    actBribe: s.actBribe,
    actInvest: s.actInvest
  }));

  const disabled = !!props.disabled;
  const treasury = run?.stats.treasury ?? 0;

  const canAffordBribe = treasury >= BALANCE.bribeCost;
  const canAffordInvest = treasury >= BALANCE.investCost;

  return (
    <Card>
      <div className="text-sm font-semibold">Actions</div>
      <div className="mt-1 text-xs text-slate-400">
        Dirty tools. Powerful. Every shortcut has a shadow.
      </div>

      <div className="mt-3 grid gap-2">
        <button
          disabled={disabled}
          onClick={() => actLoan()}
          className="rounded-2xl bg-slate-950/35 px-3 py-3 text-left ring-1 ring-slate-800 hover:bg-slate-900/50 disabled:opacity-40"
        >
          <div className="text-xs font-semibold">Take Loan</div>
          <div className="text-[11px] text-slate-400 space-y-0.5">
            <div><span className="text-emerald-300">+{BALANCE.loanAmount} Treasury</span></div>
            <div><span className="text-amber-300">+{BALANCE.loanAmount} Debt</span> • <span className="text-rose-300">+{BALANCE.loanAddsCoupRisk} Coup Risk</span></div>
          </div>
        </button>

        <button
          disabled={disabled}
          onClick={() => actInflate()}
          className="rounded-2xl bg-slate-950/35 px-3 py-3 text-left ring-1 ring-slate-800 hover:bg-slate-900/50 disabled:opacity-40"
        >
          <div className="text-xs font-semibold">Inflate Currency</div>
          <div className="text-[11px] text-slate-400 space-y-0.5">
            <div><span className="text-emerald-300">+{BALANCE.inflateAmount} Treasury</span></div>
            <div><span className="text-rose-300">+{BALANCE.inflateAddsInflation} Inflation</span> • <span className="text-rose-300">+{BALANCE.inflateAddsCorruption} Corruption</span></div>
          </div>
        </button>

        <button
          disabled={disabled}
          onClick={() => actEmbezzle()}
          className="rounded-2xl bg-slate-950/35 px-3 py-3 text-left ring-1 ring-slate-800 hover:bg-slate-900/50 disabled:opacity-40"
        >
          <div className="text-xs font-semibold">Embezzle</div>
          <div className="text-[11px] text-slate-400 space-y-0.5">
            <div><span className="text-emerald-300">+{BALANCE.embezzleAmount} Treasury</span></div>
            <div><span className="text-rose-300">+{BALANCE.embezzleAddsCorruption} Corruption</span> • <span className="text-rose-300">+{BALANCE.embezzleAddsCoupRisk} Coup Risk</span></div>
          </div>
        </button>

        <button
          disabled={disabled || !canAffordInvest}
          onClick={() => actInvest()}
          className="rounded-2xl bg-slate-950/35 px-3 py-3 text-left ring-1 ring-slate-800 hover:bg-slate-900/50 disabled:opacity-40"
        >
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold">Invest in Infrastructure</div>
            {!canAffordInvest && <span className="text-[10px] text-rose-400">Need {BALANCE.investCost}g</span>}
          </div>
          <div className="text-[11px] text-slate-400 space-y-0.5">
            <div><span className="text-rose-300">-{BALANCE.investCost} Treasury</span> • <span className="text-emerald-300">+{BALANCE.investStability} Stability</span></div>
            <div><span className="text-sky-300">Delayed: +200 Treasury, +2 Stability in 5 weeks</span></div>
          </div>
        </button>

        <div className="mt-1 rounded-2xl bg-slate-950/25 p-3 ring-1 ring-slate-800">
          <div className="text-xs font-semibold">Bribe a Faction</div>
          <div className="text-[11px] text-slate-400 mt-1 space-y-0.5">
            <div><span className="text-rose-300">-{BALANCE.bribeCost} Treasury</span> • <span className="text-emerald-300">+{BALANCE.bribeLoyaltyGain} Loyalty</span></div>
            <div><span className="text-rose-300">+{BALANCE.bribeAddsCorruption} Corruption</span> • <span className="text-rose-300">+{BALANCE.bribeAddsCoupRisk} Coup Risk</span></div>
          </div>
          {!canAffordBribe && <div className="text-[10px] text-rose-400 mt-1">Need {BALANCE.bribeCost}g to bribe</div>}
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(["peasants", "nobles", "mages", "army", "underworld"] as FactionId[]).map(f => (
              <button
                key={f}
                disabled={disabled || !canAffordBribe}
                onClick={() => actBribe(f)}
                className="rounded-xl bg-slate-900/50 px-3 py-2 text-xs ring-1 ring-slate-700 hover:ring-slate-500 disabled:opacity-40"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
