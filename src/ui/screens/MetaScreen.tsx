import React, { useMemo } from "react";
import { useGameStore } from "../../store/useGameStore";
import { Card } from "../components/Card";
import { CONTENT } from "../../engine/content";

export function MetaScreen() {
  const { meta, go, resetMeta } = useGameStore(s => ({ meta: s.meta, go: s.go, resetMeta: s.resetMeta }));

  const policyNames = useMemo(() => {
    const map = new Map(CONTENT.policies.map(p => [p.id, p.name]));
    return meta.unlockedPolicyIds.map(id => map.get(id) ?? id);
  }, [meta.unlockedPolicyIds]);

  const rulerNames = useMemo(() => {
    const map = new Map(CONTENT.rulers.map(r => [r.id, `${r.name} ${r.epithet}`]));
    return meta.unlockedRulerIds.map(id => map.get(id) ?? id);
  }, [meta.unlockedRulerIds]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Header */}
      <Card className="md:col-span-2" ornate>
        <div className="text-center py-4">
          <div className="text-4xl mb-3">📚</div>
          <h1 className="font-display text-2xl font-bold text-gold-400 tracking-wide">
            The Royal Chronicles
          </h1>
          <p className="mt-3 text-sm text-parchment-300 font-body max-w-2xl mx-auto">
            A record of all thy reigns. New rulers and edicts are unlocked through perseverance, 
            cunning, and occasionally, spectacular failure.
          </p>
        </div>
      </Card>

      {/* Stats */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📊</span>
          <h2 className="font-display text-lg font-semibold text-gold-400">Lifetime Statistics</h2>
        </div>
        
        <div className="space-y-3">
          <div className="scroll-panel rounded-lg p-4 flex justify-between items-center">
            <span className="text-sm text-parchment-400 flex items-center gap-2">
              <span>👑</span> Total Reigns
            </span>
            <span className="font-display text-xl font-bold text-gold-400 tabular-nums">{meta.runsPlayed}</span>
          </div>
          <div className="scroll-panel rounded-lg p-4 flex justify-between items-center">
            <span className="text-sm text-parchment-400 flex items-center gap-2">
              <span>🏆</span> Victories
            </span>
            <span className="font-display text-xl font-bold text-emerald-400 tabular-nums">{meta.wins}</span>
          </div>
          <div className="scroll-panel rounded-lg p-4 flex justify-between items-center">
            <span className="text-sm text-parchment-400 flex items-center gap-2">
              <span>📅</span> Longest Reign
            </span>
            <span className="font-display text-xl font-bold text-parchment-200 tabular-nums">{meta.bestWeeks} weeks</span>
          </div>
          <div className="scroll-panel rounded-lg p-4 flex justify-between items-center">
            <span className="text-sm text-parchment-400 flex items-center gap-2">
              <span>⭐</span> Best Score
            </span>
            <span className="font-display text-xl font-bold text-gold-400 tabular-nums">{meta.bestScore}</span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            className="gold-btn flex-1 rounded-lg px-4 py-3 font-display font-semibold text-parchment-900"
            onClick={() => go("title")}
          >
            ← Return to Hall
          </button>
          <button
            className="ink-btn rounded-lg px-4 py-3 font-display text-red-400 hover:text-red-300 border border-red-900/50"
            onClick={() => {
              if (confirm("Art thou certain? All progress shall be erased forever.")) {
                resetMeta();
              }
            }}
          >
            🗑️ Purge Records
          </button>
        </div>
      </Card>

      {/* Unlocked Content */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🔓</span>
          <h2 className="font-display text-lg font-semibold text-gold-400">Unlocked Content</h2>
        </div>
        
        <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
          <div>
            <div className="text-xs font-display uppercase tracking-wider text-parchment-500 mb-2 flex items-center gap-2">
              <span>📜</span> Edicts ({policyNames.length})
            </div>
            <div className="grid gap-2">
              {policyNames.map((n, i) => (
                <div key={i} className="stat-badge rounded-lg px-3 py-2 text-sm text-parchment-300 font-body">
                  {n}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-display uppercase tracking-wider text-parchment-500 mb-2 flex items-center gap-2">
              <span>👑</span> Rulers ({rulerNames.length})
            </div>
            <div className="grid gap-2">
              {rulerNames.map((n, i) => (
                <div key={i} className="stat-badge rounded-lg px-3 py-2 text-sm text-parchment-300 font-body">
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Runs */}
      <Card className="md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2 className="font-display text-lg font-semibold text-gold-400">Recent Reigns</h2>
          </div>
          <span className="text-xs text-parchment-500">{meta.runHistory.length} of 40 records</span>
        </div>
        
        <div className="grid gap-3 md:grid-cols-2">
          {meta.runHistory.slice(0, 8).map((h, idx) => {
            const isVictory = h.result.reason === "survived";
            return (
              <div key={idx} className="request-card rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-lg ${isVictory ? "text-gold-400" : "text-red-400"}`}>
                    {isVictory ? "🏆" : "💀"}
                  </span>
                  <span className="text-[10px] text-parchment-500 font-mono">
                    {new Date(h.at).toLocaleDateString()}
                  </span>
                </div>
                <div className="font-display font-semibold text-parchment-200">
                  {h.result.reason.charAt(0).toUpperCase() + h.result.reason.slice(1).replace("_", " ")}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="stat-badge rounded-full px-2 py-1">
                    📅 {h.result.weeksSurvived} weeks
                  </span>
                  <span className="stat-badge rounded-full px-2 py-1">
                    ⭐ {h.result.score}
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-parchment-500 tabular-nums">
                  💰 {Math.round(h.result.finalTreasury)} • 📜 {Math.round(h.result.finalDebt)} • ⚖️ {Math.round(h.result.finalStability)}
                </div>
              </div>
            );
          })}
        </div>
        
        {meta.runHistory.length === 0 && (
          <div className="text-center py-8">
            <div className="text-3xl mb-2">📭</div>
            <p className="text-sm text-parchment-500 font-body">No reigns recorded yet. Begin thy first!</p>
          </div>
        )}
      </Card>
    </div>
  );
}
