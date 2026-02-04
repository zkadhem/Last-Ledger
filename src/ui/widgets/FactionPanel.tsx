import React from "react";
import type { FactionId } from "../../types";
import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";

const FACTION_DATA: Record<FactionId, { label: string; icon: string; color: string }> = {
  peasants: { label: "Peasants", icon: "🌾", color: "from-amber-700 to-amber-500" },
  nobles: { label: "Nobles", icon: "🏰", color: "from-purple-700 to-purple-500" },
  mages: { label: "Mages", icon: "🔮", color: "from-blue-700 to-blue-500" },
  army: { label: "Army", icon: "⚔️", color: "from-red-700 to-red-500" },
  underworld: { label: "Underworld", icon: "🗡️", color: "from-gray-700 to-gray-500" }
};

export function FactionPanel(props: { loyalty: Record<FactionId, number> }) {
  const avg = Object.values(props.loyalty).reduce((a, b) => a + b, 0) / 5;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚜️</span>
          <div>
            <h3 className="font-display text-lg font-semibold text-gold-400">Faction Loyalties</h3>
            <p className="text-xs text-parchment-400 font-body">
              Keep allies close. Betrayers strike when loyalty wanes.
            </p>
          </div>
        </div>
        <div className="stat-badge rounded-lg px-3 py-1">
          <span className="text-xs text-parchment-500">Avg</span>
          <span className="ml-1 text-sm font-display font-semibold text-gold-400 tabular-nums">{avg.toFixed(0)}</span>
        </div>
      </div>

      <div className="space-y-3">
        {(Object.keys(FACTION_DATA) as FactionId[]).map(id => {
          const v = props.loyalty[id];
          const { label, icon, color } = FACTION_DATA[id];
          const tone = v >= 70 ? "good" : v <= 35 ? "bad" : v <= 50 ? "warn" : "neutral";
          
          return (
            <div key={id} className="faction-bar-bg rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{icon}</span>
                  <span className="font-display text-sm text-parchment-200">{label}</span>
                </div>
                <span className={`text-sm font-display font-semibold tabular-nums ${
                  tone === "good" ? "text-emerald-400" :
                  tone === "bad" ? "text-red-400" :
                  tone === "warn" ? "text-amber-400" :
                  "text-parchment-300"
                }`}>
                  {v.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-parchment-900/50 overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
                  style={{ width: `${Math.min(100, Math.max(0, v))}%` }}
                />
              </div>
              {v <= 25 && (
                <div className="mt-1 text-[10px] text-red-400 font-body">
                  ⚠️ Dangerously low — risk of betrayal
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
