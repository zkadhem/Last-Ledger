import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../store/useGameStore";

export function StoryEventModal() {
  const { run, showingStoryEvent, resolveStory } = useGameStore(s => ({
    run: s.run,
    showingStoryEvent: s.showingStoryEvent,
    resolveStory: s.resolveStory
  }));

  const storyEvent = run?.activeStoryEvent;

  if (!showingStoryEvent || !storyEvent) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 px-4">
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="story-modal w-full max-w-lg rounded-lg p-6"
        >
          {/* Header with decorative elements */}
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📜</div>
            <h2 className="font-display text-xl font-bold text-gold-400 tracking-wide">
              {storyEvent.title}
            </h2>
            <div className="text-xs text-parchment-500 mt-1 font-display uppercase tracking-wider">
              A Royal Matter Requires Attention
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-700/50 to-transparent" />
            <span className="text-gold-600">⚜️</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-700/50 to-transparent" />
          </div>

          {/* Story Body */}
          <div className="scroll-panel rounded-lg p-4 mb-5">
            <p className="text-sm text-parchment-300 font-body leading-relaxed italic">
              "{storyEvent.body}"
            </p>
          </div>

          {/* Choices */}
          <div className="space-y-3">
            <div className="text-xs text-parchment-500 font-display uppercase tracking-wider flex items-center gap-2">
              <span>⚖️</span>
              <span>What Say You?</span>
            </div>
            
            {storyEvent.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => resolveStory(idx)}
                className="request-card w-full text-left rounded-lg p-4 hover:border-gold-600 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-gold-500 font-display font-bold text-lg">
                    {idx + 1}.
                  </span>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-parchment-200 group-hover:text-gold-400 transition-colors">
                      {choice.label}
                    </div>
                    <div className="mt-1 text-xs text-parchment-500 font-body">
                      {choice.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-5 text-center">
            <p className="text-[10px] text-parchment-600 font-body italic">
              ⚠️ Choose wisely — thy decision shall have consequences
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
