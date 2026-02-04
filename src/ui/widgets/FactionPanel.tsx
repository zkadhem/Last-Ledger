import React from "react";
import type { FactionId } from "../../types";
import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";

const LABELS: Record<FactionId, string> = {
  peasants: "Peasants",
  nobles: "Nobles",
  mages: "Mages",
  army: "Army",
  underworld: "Underworld"
};

export function FactionPanel(props: { loyalty: Record<FactionId, number> }) {
  const avg = Object.values(props.loyalty).reduce((a, b) => a + b, 0) / 5;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Factions</div>
          <div className="text-xs text-slate-400">Loyalty thresholds unlock boons or sabotage.</div>
        </div>
        <div className="text-xs text-slate-400 tabular-nums">Avg {avg.toFixed(0)}</div>
      </div>

      <div className="mt-3 space-y-2">
        {(Object.keys(LABELS) as FactionId[]).map(id => {
          const v = props.loyalty[id];
          const tone = v >= 70 ? "good" : v <= 35 ? "bad" : v <= 50 ? "warn" : "neutral";
          return <ProgressBar key={id} label={LABELS[id]} value={v} tone={tone} />;
        })}
      </div>
    </Card>
  );
}
