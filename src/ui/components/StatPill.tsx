import React from "react";
import clsx from "clsx";

const STAT_ICONS: Record<string, string> = {
  "Treasury": "💰",
  "Debt": "📜",
  "Stability": "⚖️",
  "Corruption": "🐀",
  "Inflation": "📈",
  "Coup Risk": "⚔️"
};

export function StatPill(props: {
  label: string;
  value: string;
  tone?: "good" | "bad" | "warn" | "neutral";
}) {
  const tone = props.tone ?? "neutral";
  const icon = STAT_ICONS[props.label] || "📊";
  
  const badgeClass = 
    tone === "good"
      ? "stat-badge-good"
      : tone === "bad"
      ? "stat-badge-bad"
      : tone === "warn"
      ? "stat-badge-warn"
      : "";

  const text =
    tone === "good"
      ? "text-emerald-400"
      : tone === "bad"
      ? "text-red-400"
      : tone === "warn"
      ? "text-amber-400"
      : "text-parchment-300";

  return (
    <div className={clsx("stat-badge rounded-lg px-3 py-2", badgeClass)}>
      <div className="text-[10px] uppercase tracking-wider text-parchment-500 font-display flex items-center gap-1">
        <span>{icon}</span>
        <span>{props.label}</span>
      </div>
      <div className={clsx("text-sm font-semibold tabular-nums font-display", text)}>{props.value}</div>
    </div>
  );
}
