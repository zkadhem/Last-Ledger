import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, type Warning } from "../../store/useGameStore";

export function WarningBanner() {
  const warnings = useGameStore(s => s.warnings);

  if (warnings.length === 0) return null;

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
            className={`warning-banner rounded-lg px-4 py-3 font-body ${
              warning.severity === "critical"
                ? "bg-red-900/30 border-red-500 animate-pulse"
                : "bg-amber-900/20 border-amber-600"
            }`}
          >
            <span className={`text-sm font-medium ${
              warning.severity === "critical" ? "text-red-300" : "text-amber-300"
            }`}>
              {warning.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
