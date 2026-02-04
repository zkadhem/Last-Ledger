import React from "react";
import { Card } from "../components/Card";
import type { LedgerLine } from "../../types";

export function LedgerTable(props: { lines: LedgerLine[]; currentWeek: number }) {
  // Filter to show only current week's entries
  const currentWeekLines = props.lines.filter(l => l.week === props.currentWeek);
  const rows = currentWeekLines.slice(0, 20);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Week {props.currentWeek} Ledger</div>
          <div className="text-xs text-slate-400">This week's transactions. Every coin tells a story.</div>
        </div>
        <div className="text-xs text-slate-400">{currentWeekLines.length} entries</div>
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl ring-1 ring-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/50 text-slate-300">
            <tr>
              <th className="px-3 py-2">Entry</th>
              <th className="px-3 py-2 w-16 text-right">Δ Gold</th>
              <th className="px-3 py-2 w-16 text-right">Δ Debt</th>
              <th className="px-3 py-2 w-16 text-right">Δ Stab</th>
              <th className="px-3 py-2 w-16 text-right">Δ Corr</th>
              <th className="px-3 py-2 w-16 text-right">Δ Infl</th>
              <th className="px-3 py-2 w-16 text-right">Δ Coup</th>
            </tr>
          </thead>
          <tbody className="bg-slate-950/30">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-4 text-center text-slate-500">
                  No entries yet this week
                </td>
              </tr>
            ) : (
              rows.map((l, idx) => (
                <tr key={idx} className="border-t border-slate-800">
                  <td className="px-3 py-2">
                    <div className="text-slate-100">{l.label}</div>
                    {l.note && <div className="text-[10px] text-slate-400">{l.note}</div>}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {l.deltaTreasury ? (
                      <span className={l.deltaTreasury >= 0 ? "text-emerald-300" : "text-rose-300"}>
                        {l.deltaTreasury >= 0 ? "+" : ""}{Math.round(l.deltaTreasury)}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {l.deltaDebt ? (
                      <span className={l.deltaDebt >= 0 ? "text-amber-300" : "text-slate-200"}>
                        {l.deltaDebt >= 0 ? "+" : ""}{Math.round(l.deltaDebt)}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {l.deltaStability ? (
                      <span className={l.deltaStability >= 0 ? "text-emerald-300" : "text-rose-300"}>
                        {l.deltaStability >= 0 ? "+" : ""}{l.deltaStability.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {l.deltaCorruption ? (
                      <span className={l.deltaCorruption <= 0 ? "text-emerald-300" : "text-rose-300"}>
                        {l.deltaCorruption >= 0 ? "+" : ""}{l.deltaCorruption.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {l.deltaInflation ? (
                      <span className={l.deltaInflation <= 0 ? "text-emerald-300" : "text-rose-300"}>
                        {l.deltaInflation >= 0 ? "+" : ""}{l.deltaInflation.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {l.deltaCoupRisk ? (
                      <span className={l.deltaCoupRisk <= 0 ? "text-emerald-300" : "text-rose-300"}>
                        {l.deltaCoupRisk >= 0 ? "+" : ""}{l.deltaCoupRisk.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
