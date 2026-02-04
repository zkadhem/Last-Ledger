import React from "react";
import { Card } from "../components/Card";
import type { GeneratedRequest } from "../../types";
import clsx from "clsx";

const FACTION_ICONS: Record<string, string> = {
  peasants: "🌾",
  nobles: "🏰",
  mages: "🔮",
  army: "⚔️",
  underworld: "🗡️"
};

export function RequestQueue(props: {
  requests: GeneratedRequest[];
  onDecide: (id: string, decision: "approve" | "deny" | "delay") => void;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📜</span>
          <div>
            <h3 className="font-display text-lg font-semibold text-gold-400">Royal Petitions</h3>
            <p className="text-xs text-parchment-400 font-body">
              Grant, deny, or defer. Delays breed discontent and inflate costs.
            </p>
          </div>
        </div>
        <div className="stat-badge rounded-lg px-3 py-1">
          <span className="text-xs text-parchment-400">{props.requests.length} awaiting</span>
        </div>
      </div>

      <div className="space-y-3">
        {props.requests.length === 0 && (
          <div className="scroll-panel rounded-lg p-6 text-center">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-sm text-parchment-300 font-body">
              All petitions resolved. Thou may close the week.
            </div>
          </div>
        )}

        {props.requests.map(r => (
          <div key={r.instanceId} className="request-card rounded-lg p-4 transition-all hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {r.faction && <span className="text-lg">{FACTION_ICONS[r.faction] || "📋"}</span>}
                  <h4 className="font-display font-semibold text-parchment-200">{r.title}</h4>
                </div>
                <p className="mt-2 text-sm text-parchment-400 font-body leading-relaxed">{r.body}</p>
                
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="stat-badge rounded-full px-3 py-1 text-xs">
                    💰 <span className="tabular-nums text-gold-400 font-semibold">{r.cost}</span> gold
                  </span>
                  <span
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-display",
                      r.urgency >= 3 ? "urgency-high"
                      : r.urgency === 2 ? "urgency-medium"
                      : "urgency-low"
                    )}
                  >
                    {r.urgency >= 3 ? "⚠️ Urgent" : r.urgency === 2 ? "⏳ Pressing" : "📝 Routine"}
                  </span>
                  {r.faction && (
                    <span className="stat-badge rounded-full px-3 py-1 text-xs">
                      {FACTION_ICONS[r.faction]} <span className="text-parchment-300 capitalize">{r.faction}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2">
                <button
                  onClick={() => props.onDecide(r.instanceId, "approve")}
                  className="gold-btn rounded-lg px-4 py-2 text-xs font-display font-semibold text-parchment-900"
                >
                  ✓ Grant
                </button>
                <button
                  onClick={() => props.onDecide(r.instanceId, "deny")}
                  className="wax-seal rounded-lg px-4 py-2 text-xs font-display font-semibold"
                >
                  ✗ Deny
                </button>
                <button
                  onClick={() => props.onDecide(r.instanceId, "delay")}
                  className="ink-btn rounded-lg px-4 py-2 text-xs font-display text-parchment-400 hover:text-parchment-200"
                >
                  ⏸ Defer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
