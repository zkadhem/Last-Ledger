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
      <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4">
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="glass w-full max-w-lg rounded-2xl p-5 shadow-soft"
        >
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="text-3xl">📜</div>
            <div>
              <div className="text-lg font-semibold text-slate-100">{storyEvent.title}</div>
              <div className="text-xs text-slate-400 mt-1">A situation requires your attention</div>
            </div>
          </div>

          {/* Story Body */}
          <div className="bg-slate-900/50 rounded-xl p-4 mb-4 ring-1 ring-slate-700">
            <p className="text-sm text-slate-200 leading-relaxed">{storyEvent.body}</p>
          </div>

          {/* Choices */}
          <div className="space-y-2">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">Your Decision</div>
            {storyEvent.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => resolveStory(idx)}
                className="w-full text-left rounded-xl bg-slate-800/50 p-3 ring-1 ring-slate-700 hover:ring-indigo-500/50 hover:bg-slate-800/70 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400 font-semibold text-sm">{idx + 1}.</span>
                  <span className="text-sm font-medium text-slate-100 group-hover:text-indigo-200">
                    {choice.label}
                  </span>
                </div>
                <div className="mt-1 ml-5 text-xs text-slate-400">
                  {choice.description}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 text-center text-[10px] text-slate-500">
            Choose wisely — your decision will have consequences
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
