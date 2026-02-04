import React from "react";
import clsx from "clsx";

export function ProgressBar(props: {
  label: string;
  value: number;
  tone?: "good" | "bad" | "warn" | "neutral";
}) {
  const tone = props.tone ?? "neutral";
  const pct = Math.min(100, Math.max(0, props.value));

  const fillColor =
    tone === "good" ? "from-emerald-700 to-emerald-500"
    : tone === "bad" ? "from-red-700 to-red-500"
    : tone === "warn" ? "from-amber-700 to-amber-500"
    : "from-parchment-700 to-parchment-500";

  const textColor =
    tone === "good" ? "text-emerald-400"
    : tone === "bad" ? "text-red-400"
    : tone === "warn" ? "text-amber-400"
    : "text-parchment-300";

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-parchment-400 font-display">{props.label}</span>
        <span className={clsx("font-display font-semibold tabular-nums", textColor)}>
          {props.value.toFixed(0)}
        </span>
      </div>
      <div className="h-2 rounded-full bg-parchment-900/50 overflow-hidden border border-parchment-700/30">
        <div
          className={clsx("h-full rounded-full bg-gradient-to-r transition-all duration-500", fillColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
