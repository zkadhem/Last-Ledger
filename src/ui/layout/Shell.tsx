import React from "react";
import { TopBar } from "./TopBar";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full font-body">
      <TopBar />
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6">{children}</div>
      <div className="mx-auto max-w-6xl px-4 pb-10 text-xs text-parchment-400/70 font-body italic">
        ⚜️ Thy ledger awaits. Wars, heroes, and corruption all flow through thy books. ⚜️
      </div>
    </div>
  );
}
