import React from "react";
import { Card } from "../components/Card";
import type { HistoryPoint } from "../../types";

export function TimelinePanel(props: { history: HistoryPoint[]; week: number; total: number }) {
  const last = props.history[props.history.length - 1];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Reign Progress</div>
          <div className="text-xs text-slate-400">Survive to week {props.total}. Failing is expected.</div>
        </div>
        <div className="text-xs text-slate-300 tabular-nums">
          Week {props.week} / {props.total}
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-900 ring-1 ring-slate-800">
        <div
          className="h-full bg-indigo-500/60"
          style={{ width: `${Math.min(100, ((props.week - 1) / props.total) * 100)}%` }}
        />
      </div>

      {last && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            <div className="text-[11px] text-slate-400">Trend</div>
            <div className="mt-1 text-sm font-semibold">Treasury {Math.round(last.treasury)}</div>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            <div className="text-[11px] text-slate-400">Trend</div>
            <div className="mt-1 text-sm font-semibold">Stability {Math.round(last.stability)}</div>
          </div>
        </div>
      )}
    </Card>
  );
}
