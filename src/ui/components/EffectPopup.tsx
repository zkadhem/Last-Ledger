import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../store/useGameStore";

export function EffectPopup() {
  const { effectPopup, dismissEffectPopup } = useGameStore(s => ({
    effectPopup: s.effectPopup,
    dismissEffectPopup: s.dismissEffectPopup
  }));

  return (
    <AnimatePresence>
      {effectPopup && (
        <motion.div
          key={effectPopup.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="effect-popup fixed bottom-24 right-6 z-40 rounded-lg p-4 min-w-64 max-w-sm"
          onClick={dismissEffectPopup}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📋</span>
            <h4 className="font-display font-semibold text-gold-400 text-sm">{effectPopup.title}</h4>
          </div>
          
          <div className="space-y-2">
            {effectPopup.effects.map((effect, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-parchment-400 font-body">{effect.label}</span>
                <span className={`font-display font-semibold tabular-nums ${
                  effect.tone === "good" ? "text-emerald-400" :
                  effect.tone === "bad" ? "text-red-400" :
                  "text-parchment-300"
                }`}>
                  {effect.value}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-3 pt-2 border-t border-parchment-800/30">
            <p className="text-[10px] text-parchment-600 text-center font-body">
              Click to dismiss
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
