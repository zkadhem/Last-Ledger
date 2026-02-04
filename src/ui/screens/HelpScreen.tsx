import React from "react";
import { Card } from "../components/Card";
import { useGameStore } from "../../store/useGameStore";

export function HelpScreen() {
  const go = useGameStore(s => s.go);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <div className="text-lg font-semibold">How to Play</div>
        <div className="mt-2 text-sm text-slate-300">
          You are the accountant. Each week you collect income, suffer events, and respond to funding requests.
          Your tools are approvals, denials, delays—and morally flexible actions.
        </div>
      </Card>

      <Card>
        <div className="text-sm font-semibold">Core Loop</div>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>Start week (auto): events apply, taxes collected, interest paid.</li>
          <li>Resolve all requests: approve / deny / delay.</li>
          <li>Use actions: loan, inflate, embezzle, bribe, invest.</li>
          <li>Close week: coup check; then advance.</li>
        </ul>
      </Card>

      <Card>
        <div className="text-sm font-semibold">Tips</div>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>Debt is fast power and slow death. Interest is brutal.</li>
          <li>Corruption can boost income indirectly but crushes stability over time.</li>
          <li>Inflation punishes income and stability—avoid chaining “inflate” too long.</li>
          <li>Faction loyalty matters: low average loyalty increases coup chance.</li>
          <li>Investments pay off later—if you survive.</li>
        </ul>
      </Card>

      <Card className="md:col-span-2">
        <div className="text-sm font-semibold">Design intent</div>
        <div className="mt-2 text-sm text-slate-300">
          This game is built to scale via systems. Add content by adding data entries (policies, requests, events).
          Balance by changing numbers and hooks—not by scripting missions.
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="rounded-2xl bg-indigo-500/20 px-4 py-3 text-sm font-semibold ring-1 ring-indigo-400/25 hover:bg-indigo-500/25"
            onClick={() => go("title")}
          >
            Back
          </button>
        </div>
      </Card>
    </div>
  );
}
