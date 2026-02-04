import React from "react";
import { useGameStore } from "../../store/useGameStore";

export function TopBar() {
  const { screen, go } = useGameStore(s => ({ screen: s.screen, go: s.go }));

  return (
    <div className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/20 grid place-items-center shadow-soft">
            <span className="font-mono text-sm text-indigo-200">LL</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">Last Ledger</div>
            <div className="text-xs text-slate-400">Roguelike fantasy accounting</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-xl px-3 py-2 text-xs text-slate-200 ring-1 ring-slate-700 hover:ring-slate-500 hover:bg-slate-900/60"
            onClick={() => go("help")}
          >
            Help
          </button>
          {screen !== "title" && (
            <button
              className="rounded-xl px-3 py-2 text-xs text-slate-200 ring-1 ring-slate-700 hover:ring-slate-500 hover:bg-slate-900/60"
              onClick={() => go("title")}
            >
              Title
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
