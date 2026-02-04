import React from "react";
import { useGameStore } from "../../store/useGameStore";

export function TopBar() {
  const { screen, go } = useGameStore(s => ({ screen: s.screen, go: s.go }));

  return (
    <div className="sticky top-0 z-20 border-b-2 border-gold-700/50 bg-parchment-950/95 backdrop-blur shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-lg bg-gradient-to-br from-gold-600 to-gold-800 grid place-items-center shadow-medieval border border-gold-500/30">
            <span className="text-2xl crown-icon">👑</span>
          </div>
          <div>
            <div className="font-display text-lg font-semibold tracking-wide text-gold-400">
              Last Ledger
            </div>
            <div className="text-xs text-parchment-400 font-body italic">
              Royal Treasury & Accounts
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="ink-btn rounded-lg px-4 py-2 text-sm font-display text-parchment-300 hover:text-gold-400 transition-colors"
            onClick={() => go("help")}
          >
            📜 Codex
          </button>
          {screen !== "title" && (
            <button
              className="ink-btn rounded-lg px-4 py-2 text-sm font-display text-parchment-300 hover:text-gold-400 transition-colors"
              onClick={() => go("title")}
            >
              🏰 Hall
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
