import React from "react";
import type { LedgerLine } from "../../types";
import { Card } from "../components/Card";

export function LedgerTable(props: { lines: LedgerLine[]; currentWeek: number }) {
  const { lines, currentWeek } = props;
  const currentWeekLines = lines.filter(l => l.week === currentWeek);

  if (currentWeekLines.length === 0) {
    return (
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📖</span>
          <h3 className="font-display text-lg font-semibold text-gold-400">The Royal Ledger</h3>
        </div>
        <div className="scroll-panel rounded-lg p-6 text-center">
          <div className="text-2xl mb-2">📋</div>
          <p className="text-sm text-parchment-300 font-body">
            No entries yet this week. Resolve petitions to update the ledger.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📖</span>
          <div>
            <h3 className="font-display text-lg font-semibold text-gold-400">Week {currentWeek} Ledger</h3>
            <p className="text-xs text-parchment-400 font-body">
              Chronicle of this week's fortune and fate
            </p>
          </div>
        </div>
        <div className="stat-badge rounded-lg px-3 py-1">
          <span className="text-xs text-parchment-400">{currentWeekLines.length} entries</span>
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto scroll-panel rounded-lg p-3">
        {currentWeekLines.map((line, i) => (
          <div 
            key={i} 
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-parchment-900/30 border border-parchment-800/50"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-parchment-500 font-mono">W{line.week}</span>
                <span className="text-sm font-display text-parchment-200">{line.label}</span>
              </div>
              {line.note && (
                <p className="text-xs text-parchment-500 font-body italic mt-1">{line.note}</p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              {line.deltaTreasury !== undefined && line.deltaTreasury !== 0 && (
                <DeltaBadge icon="💰" value={line.deltaTreasury} label="gold" />
              )}
              {line.deltaDebt !== undefined && line.deltaDebt !== 0 && (
                <DeltaBadge icon="📜" value={line.deltaDebt} label="debt" inverted />
              )}
              {line.deltaStability !== undefined && line.deltaStability !== 0 && (
                <DeltaBadge icon="⚖️" value={line.deltaStability} label="stab" />
              )}
              {line.deltaCorruption !== undefined && line.deltaCorruption !== 0 && (
                <DeltaBadge icon="🎭" value={line.deltaCorruption} label="corr" inverted />
              )}
              {line.deltaInflation !== undefined && line.deltaInflation !== 0 && (
                <DeltaBadge icon="📈" value={line.deltaInflation} label="infl" inverted />
              )}
              {line.deltaCoupRisk !== undefined && line.deltaCoupRisk !== 0 && (
                <DeltaBadge icon="⚔️" value={line.deltaCoupRisk} label="coup" inverted />
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DeltaBadge(props: { icon: string; value: number; label: string; inverted?: boolean }) {
  const isPositive = props.value > 0;
  const isGood = props.inverted ? !isPositive : isPositive;
  
  return (
    <span className={isGood ? "inline-flex items-center gap-1 px-2 py-1 rounded font-mono bg-emerald-900/30 text-emerald-400" : "inline-flex items-center gap-1 px-2 py-1 rounded font-mono bg-red-900/30 text-red-400"}>
      <span>{props.icon}</span>
      <span>{isPositive ? "+" : ""}{props.value}</span>
      <span className="text-parchment-500">{props.label}</span>
    </span>
  );
}
