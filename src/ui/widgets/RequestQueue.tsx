import React from "react";
import { Card } from "../components/Card";
import type { GeneratedRequest } from "../../types";
import clsx from "clsx";

export function RequestQueue(props: {
  requests: GeneratedRequest[];
  onDecide: (id: string, decision: "approve" | "deny" | "delay") => void;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Expense Requests</div>
          <div className="text-xs text-slate-400">Approve / deny / delay. Delays worsen cost & urgency.</div>
        </div>
        <div className="text-xs text-slate-400">{props.requests.length} open</div>
      </div>

      <div className="mt-3 space-y-3">
        {props.requests.length === 0 && (
          <div className="rounded-2xl bg-slate-950/40 p-4 text-sm text-slate-300 ring-1 ring-slate-800">
            No open requests. Close the week.
          </div>
        )}

        {props.requests.map(r => (
          <div key={r.instanceId} className="rounded-2xl bg-slate-950/40 p-4 ring-1 ring-slate-800">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{r.title}</div>
                <div className="mt-1 text-xs text-slate-300">{r.body}</div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                  <span className="rounded-full bg-slate-900/60 px-2 py-1 ring-1 ring-slate-800">
                    Cost <span className="tabular-nums text-slate-200">{r.cost}</span>
                  </span>
                  <span
                    className={clsx(
                      "rounded-full px-2 py-1 ring-1",
                      r.urgency >= 3 ? "bg-rose-500/10 ring-rose-400/30 text-rose-200"
                      : r.urgency === 2 ? "bg-amber-500/10 ring-amber-400/30 text-amber-200"
                      : "bg-slate-900/60 ring-slate-800 text-slate-300"
                    )}
                  >
                    Urgency {r.urgency}
                  </span>
                  {r.faction && (
                    <span className="rounded-full bg-slate-900/60 px-2 py-1 ring-1 ring-slate-800">
                      Faction: <span className="text-slate-200">{r.faction}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2">
                <button
                  onClick={() => props.onDecide(r.instanceId, "approve")}
                  className="rounded-xl bg-emerald-500/15 px-3 py-2 text-xs ring-1 ring-emerald-400/25 hover:bg-emerald-500/20"
                >
                  Approve
                </button>
                <button
                  onClick={() => props.onDecide(r.instanceId, "deny")}
                  className="rounded-xl bg-rose-500/15 px-3 py-2 text-xs ring-1 ring-rose-400/25 hover:bg-rose-500/20"
                >
                  Deny
                </button>
                <button
                  onClick={() => props.onDecide(r.instanceId, "delay")}
                  className="rounded-xl bg-slate-900/50 px-3 py-2 text-xs ring-1 ring-slate-700 hover:ring-slate-500 hover:bg-slate-900/70"
                >
                  Delay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
