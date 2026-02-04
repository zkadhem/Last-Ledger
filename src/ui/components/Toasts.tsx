import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../store/useGameStore";

export function Toasts() {
  const toasts = useGameStore(s => s.toasts);

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            className="toast-medieval rounded-lg px-4 py-3 text-sm text-parchment-200 font-body max-w-xs"
          >
            <div className="flex items-center gap-2">
              <span className="text-gold-500">📜</span>
              <span>{t.msg}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
