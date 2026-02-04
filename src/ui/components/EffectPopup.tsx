import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, type EffectPopup as EffectPopupType } from "../../store/useGameStore";

export function EffectPopup() {
  const { effectPopup, dismissEffectPopup } = useGameStore(s => ({
    effectPopup: s.effectPopup,
    dismissEffectPopup: s.dismissEffectPopup
  }));

  return (
    <AnimatePresence>
      {effectPopup && (
        <div className="fixed inset-0 z-50 grid place-items-center pointer-events-none">
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={dismissEffectPopup}
            className="glass rounded-2xl p-4 shadow-soft min-w-[280px] pointer-events-auto cursor-pointer"
          >
            <div className="text-sm font-semibold text-center mb-3">{effectPopup.title}</div>
            <div className="space-y-1.5">
              {effectPopup.effects.map((effect, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">{effect.label}</span>
                  <span className={
                    effect.tone === "good" ? "text-emerald-300 font-semibold" :
                    effect.tone === "bad" ? "text-rose-300 font-semibold" :
                    "text-slate-300"
                  }>
                    {effect.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-500 text-center mt-3">Click to dismiss</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
