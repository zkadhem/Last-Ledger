import React from "react";
import { Card } from "../components/Card";
import { useGameStore } from "../../store/useGameStore";
import { BALANCE } from "../../engine/balance";
import type { FactionId } from "../../types";

const FACTION_ICONS: Record<FactionId, string> = {
  peasants: "🌾",
  nobles: "🏰",
  mages: "🔮",
  army: "⚔️",
  underworld: "🗡️"
};

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
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🎭</span>
        <div>
          <h3 className="font-display text-lg font-semibold text-gold-400">Dark Arts</h3>
          <p className="text-xs text-parchment-400 font-body">
            Desperate measures. Every shortcut casts a shadow.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          disabled={disabled}
          onClick={() => actLoan()}
          className="request-card w-full rounded-lg px-4 py-3 text-left hover:border-gold-600 disabled:opacity-40 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">💰</span>
            <span className="font-display font-semibold text-parchment-200">Secure a Loan</span>
          </div>
          <div className="mt-2 pl-7 text-xs space-y-1">
            <div><span className="text-emerald-400">+{BALANCE.loanAmount} Treasury</span></div>
            <div className="text-parchment-500">
              <span className="text-amber-400">+{BALANCE.loanAmount} Debt</span> • 
              <span className="text-red-400 ml-1">+{BALANCE.loanAddsCoupRisk} Coup Risk</span>
            </div>
          </div>
        </button>

        <button
          disabled={disabled}
          onClick={() => actInflate()}
          className="request-card w-full rounded-lg px-4 py-3 text-left hover:border-gold-600 disabled:opacity-40 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <span className="font-display font-semibold text-parchment-200">Debase Currency</span>
          </div>
          <div className="mt-2 pl-7 text-xs space-y-1">
            <div><span className="text-emerald-400">+{BALANCE.inflateAmount} Treasury</span></div>
            <div className="text-parchment-500">
              <span className="text-red-400">+{BALANCE.inflateAddsInflation} Inflation</span> • 
              <span className="text-red-400 ml-1">+{BALANCE.inflateAddsCorruption} Corruption</span>
            </div>
          </div>
        </button>

        <button
          disabled={disabled}
          onClick={() => actEmbezzle()}
          className="request-card w-full rounded-lg px-4 py-3 text-left hover:border-gold-600 disabled:opacity-40 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🤫</span>
            <span className="font-display font-semibold text-parchment-200">Embezzle Funds</span>
          </div>
          <div className="mt-2 pl-7 text-xs space-y-1">
            <div><span className="text-emerald-400">+{BALANCE.embezzleAmount} Treasury</span></div>
            <div className="text-parchment-500">
              <span className="text-red-400">+{BALANCE.embezzleAddsCorruption} Corruption</span> • 
              <span className="text-red-400 ml-1">+{BALANCE.embezzleAddsCoupRisk} Coup Risk</span>
            </div>
          </div>
        </button>

        <button
          disabled={disabled || !canAffordInvest}
          onClick={() => actInvest()}
          className="request-card w-full rounded-lg px-4 py-3 text-left hover:border-gold-600 disabled:opacity-40 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏗️</span>
              <span className="font-display font-semibold text-parchment-200">Public Works</span>
            </div>
            {!canAffordInvest && <span className="text-[10px] text-red-400">Need {BALANCE.investCost}g</span>}
          </div>
          <div className="mt-2 pl-7 text-xs space-y-1">
            <div>
              <span className="text-red-400">-{BALANCE.investCost} Treasury</span> • 
              <span className="text-emerald-400 ml-1">+{BALANCE.investStability} Stability</span>
            </div>
            <div><span className="text-blue-400">⏳ In 5 weeks: +200 Treasury, +2 Stability</span></div>
          </div>
        </button>

        <div className="scroll-panel rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎁</span>
            <span className="font-display font-semibold text-parchment-200">Bribe a Faction</span>
          </div>
          <div className="text-xs text-parchment-500 space-y-1 mb-3">
            <div>
              <span className="text-red-400">-{BALANCE.bribeCost} Treasury</span> • 
              <span className="text-emerald-400 ml-1">+{BALANCE.bribeLoyaltyGain} Loyalty</span>
            </div>
            <div>
              <span className="text-red-400">+{BALANCE.bribeAddsCorruption} Corruption</span> • 
              <span className="text-red-400 ml-1">+{BALANCE.bribeAddsCoupRisk} Coup Risk</span>
            </div>
          </div>
          {!canAffordBribe && (
            <div className="text-[10px] text-red-400 mb-2">💸 Insufficient funds ({BALANCE.bribeCost}g required)</div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {(["peasants", "nobles", "mages", "army", "underworld"] as FactionId[]).map(f => (
              <button
                key={f}
                disabled={disabled || !canAffordBribe}
                onClick={() => actBribe(f)}
                className="ink-btn rounded-lg px-3 py-2 text-xs font-display flex items-center justify-center gap-1 text-parchment-300 hover:text-gold-400 disabled:opacity-40"
              >
                <span>{FACTION_ICONS[f]}</span>
                <span className="capitalize">{f}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
