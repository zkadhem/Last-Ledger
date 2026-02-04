import React from "react";
import { useGameStore } from "../../store/useGameStore";
import { Card } from "../components/Card";
import { CONTENT } from "../../engine/content";

function reasonData(r: string): { icon: string; title: string; text: string } {
  switch (r) {
    case "survived": 
      return { 
        icon: "🏆", 
        title: "Victory!", 
        text: "Thou hast survived the reign. The kingdom endures, battered but unbroken. History shall remember thy cunning ledger-craft." 
      };
    case "bankrupt": 
      return { 
        icon: "💸", 
        title: "Bankruptcy", 
        text: "The treasury lies empty. Creditors have claimed the crown itself. Thy arithmetic failed the realm." 
      };
    case "collapse": 
      return { 
        icon: "🏚️", 
        title: "Realm Collapsed", 
        text: "Stability crumbled to nothing. The kingdom fractured into a thousand warring pieces. Order became chaos." 
      };
    case "coup": 
      return { 
        icon: "⚔️", 
        title: "Overthrown", 
        text: "Conspirators stormed the treasury. Thy ledger was found, filled with damning evidence. The new regime shows no mercy." 
      };
    case "debt_spiral": 
      return { 
        icon: "📜", 
        title: "Debt Spiral", 
        text: "Debts exceeded the realm's future revenues. The moneylenders foreclosed on the entire kingdom." 
      };
    default: 
      return { 
        icon: "⚰️", 
        title: "Reign Ended", 
        text: "The reign has concluded. The pages of history turn." 
      };
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
  const { icon, title, text } = reasonData(lastResult.reason);
  const isVictory = lastResult.reason === "survived";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Main Result Banner */}
      <Card className="md:col-span-2" ornate>
        <div className="text-center py-6">
          <div className={`text-6xl mb-4 ${isVictory ? "crown-icon" : ""}`}>{icon}</div>
          <h1 className={`font-display text-3xl font-bold tracking-wide ${
            isVictory ? "text-gold-400" : "text-red-400"
          }`}>
            {title}
          </h1>
          <p className="mt-4 text-base text-parchment-300 font-body leading-relaxed max-w-xl mx-auto italic">
            "{text}"
          </p>
          <div className="mt-4 text-sm text-parchment-500 font-display">
            {ruler?.name} {ruler?.epithet}
          </div>
          <div className="mt-1 text-xs text-parchment-600 font-mono">
            Seal: {run.seed}
          </div>
        </div>
      </Card>

      {/* Run Statistics */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📊</span>
          <h2 className="font-display text-lg font-semibold text-gold-400">Final Accounts</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="stat-badge rounded-lg p-4 text-center">
            <div className="text-xs text-parchment-500 font-display uppercase tracking-wider">Weeks Survived</div>
            <div className="mt-2 text-2xl font-display font-bold text-gold-400 tabular-nums">{lastResult.weeksSurvived}</div>
          </div>
          <div className="stat-badge rounded-lg p-4 text-center">
            <div className="text-xs text-parchment-500 font-display uppercase tracking-wider">Final Score</div>
            <div className="mt-2 text-2xl font-display font-bold text-gold-400 tabular-nums">{lastResult.score}</div>
          </div>
          <div className="stat-badge rounded-lg p-3">
            <div className="text-[10px] text-parchment-500 font-display uppercase">💰 Treasury</div>
            <div className="mt-1 text-lg font-display font-semibold text-parchment-200 tabular-nums">{Math.round(lastResult.finalTreasury)}</div>
          </div>
          <div className="stat-badge rounded-lg p-3">
            <div className="text-[10px] text-parchment-500 font-display uppercase">📜 Debt</div>
            <div className="mt-1 text-lg font-display font-semibold text-parchment-200 tabular-nums">{Math.round(lastResult.finalDebt)}</div>
          </div>
          <div className="stat-badge rounded-lg p-3">
            <div className="text-[10px] text-parchment-500 font-display uppercase">⚖️ Stability</div>
            <div className="mt-1 text-lg font-display font-semibold text-parchment-200 tabular-nums">{Math.round(lastResult.finalStability)}</div>
          </div>
          <div className="stat-badge rounded-lg p-3">
            <div className="text-[10px] text-parchment-500 font-display uppercase">🐀 Corruption</div>
            <div className="mt-1 text-lg font-display font-semibold text-parchment-200 tabular-nums">{Math.round(lastResult.finalCorruption)}</div>
          </div>
        </div>
      </Card>

      {/* Meta Progress */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📚</span>
          <h2 className="font-display text-lg font-semibold text-gold-400">Chronicles</h2>
        </div>
        
        <p className="text-sm text-parchment-400 font-body mb-4">
          Each reign—victory or defeat—adds to thy legend. Unlocks await those who persist.
        </p>

        <div className="space-y-2">
          <div className="scroll-panel rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm text-parchment-400">Total Reigns</span>
            <span className="font-display font-semibold text-parchment-200 tabular-nums">{meta.runsPlayed}</span>
          </div>
          <div className="scroll-panel rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm text-parchment-400">Victories</span>
            <span className="font-display font-semibold text-emerald-400 tabular-nums">{meta.wins}</span>
          </div>
          <div className="scroll-panel rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm text-parchment-400">Best Score</span>
            <span className="font-display font-semibold text-gold-400 tabular-nums">{meta.bestScore}</span>
          </div>
          <div className="scroll-panel rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm text-parchment-400">Longest Reign</span>
            <span className="font-display font-semibold text-parchment-200 tabular-nums">{meta.bestWeeks} weeks</span>
          </div>
          <div className="scroll-panel rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm text-parchment-400">Edicts Unlocked</span>
            <span className="font-display font-semibold text-parchment-200 tabular-nums">{meta.unlockedPolicyIds.length}</span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            className="wax-seal flex-1 rounded-lg px-4 py-3 font-display font-semibold text-amber-100"
            onClick={() => go("title")}
          >
            ⚜️ New Reign
          </button>
          <button
            className="ink-btn flex-1 rounded-lg px-4 py-3 font-display text-parchment-300 hover:text-gold-400"
            onClick={() => go("meta")}
          >
            📜 Chronicles
          </button>
        </div>
      </Card>
    </div>
  );
}
