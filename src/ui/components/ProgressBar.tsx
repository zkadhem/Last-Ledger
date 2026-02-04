import React from "react";
import { motion } from "framer-motion";

export function ProgressBar(props: {
  label: string;
  value: number; // 0..100
  tone?: "good" | "bad" | "warn" | "neutral";
}) {
  const v = Math.max(0, Math.min(100, props.value));
  const tone = props.tone ?? "neutral";
  const bar =
    tone === "good"
      ? "bg-emerald-500/60"
      : tone === "bad"
      ? "bg-rose-500/60"
      : tone === "warn"
      ? "bg-amber-500/60"
      : "bg-indigo-500/60";

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{props.label}</span>
        <span className="tabular-nums">{v.toFixed(0)}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-900 ring-1 ring-slate-800">
        <motion.div
          className={`h-full ${bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
