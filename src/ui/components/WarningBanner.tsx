import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, type Warning } from "../../store/useGameStore";

export function WarningBanner() {
  const warnings = useGameStore(s => s.warnings);

  if (warnings.length === 0) return null;

  // Sort by severity - critical first
  const sortedWarnings = [...warnings].sort((a, b) => {
    if (a.severity === "critical" && b.severity !== "critical") return -1;
    if (a.severity !== "critical" && b.severity === "critical") return 1;
    return 0;
  });

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {sortedWarnings.map((warning) => (
          <motion.div
            key={warning.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className={`rounded-2xl px-4 py-3 text-sm font-medium ${
              warning.severity === "critical"
                ? "bg-rose-500/20 text-rose-200 ring-1 ring-rose-500/30 animate-pulse"
                : "bg-amber-500/20 text-amber-200 ring-1 ring-amber-500/30"
            }`}
          >
            {warning.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
