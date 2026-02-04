import React from "react";
import { TopBar } from "./TopBar";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full font-display">
      <TopBar />
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6">{children}</div>
      <div className="mx-auto max-w-6xl px-4 pb-10 text-xs text-slate-500">
        Built for fast iteration. Runs are seeded & deterministic. No combat—only ledger decisions.
      </div>
    </div>
  );
}
