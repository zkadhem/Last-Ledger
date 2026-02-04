import React from "react";
import clsx from "clsx";

export function StatPill(props: {
  label: string;
  value: string;
  tone?: "good" | "bad" | "warn" | "neutral";
}) {
  const tone = props.tone ?? "neutral";
  const ring =
    tone === "good"
      ? "ring-emerald-400/25"
      : tone === "bad"
      ? "ring-rose-400/25"
      : tone === "warn"
      ? "ring-amber-400/25"
      : "ring-slate-700";

  const text =
    tone === "good"
      ? "text-emerald-200"
      : tone === "bad"
      ? "text-rose-200"
      : tone === "warn"
      ? "text-amber-200"
      : "text-slate-200";

  return (
    <div className={clsx("rounded-xl bg-slate-950/40 px-3 py-2 ring-1", ring)}>
      <div className="text-[10px] uppercase tracking-wider text-slate-400">{props.label}</div>
      <div className={clsx("text-sm font-semibold tabular-nums", text)}>{props.value}</div>
    </div>
  );
}
