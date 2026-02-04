import React from "react";
import { Card } from "../components/Card";
import type { HistoryPoint } from "../../types";

export function TimelinePanel(props: { history: HistoryPoint[]; week: number; total: number }) {
  const progress = (props.week / props.total) * 100;
  const lastPoints = props.history.slice(-8);
  
  // Calculate trend
  const recentTreasury = lastPoints.length >= 2 
    ? lastPoints[lastPoints.length - 1]?.treasury - lastPoints[lastPoints.length - 2]?.treasury 
    : 0;
  
  const recentStability = lastPoints.length >= 2
    ? lastPoints[lastPoints.length - 1]?.stability - lastPoints[lastPoints.length - 2]?.stability
    : 0;

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">⏳</span>
        <div>
          <h3 className="font-display text-lg font-semibold text-gold-400">Reign Progress</h3>
          <p className="text-xs text-parchment-400 font-body">
            {props.total - props.week} weeks remain
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-parchment-500 mb-1">
          <span>Year Begins</span>
          <span>Week {props.week} / {props.total}</span>
          <span>Year Ends</span>
        </div>
        <div className="h-3 rounded-full bg-parchment-900/50 overflow-hidden border border-parchment-700/30">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-gold-700 to-gold-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="stat-badge rounded-lg p-2 flex items-center justify-between">
          <span className="text-parchment-500">💰 Trend</span>
          <span className={recentTreasury >= 0 ? "text-emerald-400" : "text-red-400"}>
            {recentTreasury >= 0 ? "📈" : "📉"} {recentTreasury >= 0 ? "+" : ""}{Math.round(recentTreasury)}
          </span>
        </div>
        <div className="stat-badge rounded-lg p-2 flex items-center justify-between">
          <span className="text-parchment-500">⚖️ Trend</span>
          <span className={recentStability >= 0 ? "text-emerald-400" : "text-red-400"}>
            {recentStability >= 0 ? "📈" : "📉"} {recentStability >= 0 ? "+" : ""}{recentStability.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Mini Chart Visualization */}
      {lastPoints.length > 2 && (
        <div className="mt-3 pt-3 border-t border-parchment-800/30">
          <div className="text-[10px] text-parchment-500 mb-2 font-display uppercase tracking-wider">Recent History</div>
          <div className="flex items-end gap-1 h-12">
            {lastPoints.map((point, i) => {
              const height = Math.max(10, (point.treasury / 800) * 100);
              return (
                <div 
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-gold-700/50 to-gold-500/30 transition-all"
                  style={{ height: `${Math.min(100, height)}%` }}
                  title={`Week ${point.week}: ${Math.round(point.treasury)}g`}
                />
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
