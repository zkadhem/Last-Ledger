import React, { useMemo } from "react";
import { useGameStore } from "../../store/useGameStore";
import { Card } from "../components/Card";
import { CONTENT } from "../../engine/content";

export function MetaScreen() {
  const { meta, go, resetMeta } = useGameStore(s => ({ meta: s.meta, go: s.go, resetMeta: s.resetMeta }));

  const policyNames = useMemo(() => {
    const map = new Map(CONTENT.policies.map(p => [p.id, p.name]));
    return meta.unlockedPolicyIds.map(id => map.get(id) ?? id);
  }, [meta.unlockedPolicyIds]);

  const rulerNames = useMemo(() => {
    const map = new Map(CONTENT.rulers.map(r => [r.id, `${r.name} ${r.epithet}`]));
    return meta.unlockedRulerIds.map(id => map.get(id) ?? id);
  }, [meta.unlockedRulerIds]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <div className="text-lg font-semibold">Meta Progression</div>
        <div className="mt-2 text-sm text-slate-300">
          Unlock new rulers and policies by surviving longer, reaching extremes, and winning. Lore can be added later as “ledger notes.”
        </div>
      </Card>

      <Card>
        <div className="text-sm font-semibold">Stats</div>
        <div className="mt-3 space-y-2 text-sm">
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            Runs played: <span className="tabular-nums text-slate-200">{meta.runsPlayed}</span>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            Wins: <span className="tabular-nums text-slate-200">{meta.wins}</span>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            Best weeks: <span className="tabular-nums text-slate-200">{meta.bestWeeks}</span>
          </div>
          <div className="rounded-xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
            Best score: <span className="tabular-nums text-slate-200">{meta.bestScore}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="rounded-2xl bg-indigo-500/20 px-4 py-3 text-sm font-semibold ring-1 ring-indigo-400/25 hover:bg-indigo-500/25"
            onClick={() => go("title")}
          >
            Back
          </button>
          <button
            className="rounded-2xl px-4 py-3 text-sm ring-1 ring-rose-400/25 hover:bg-rose-500/10 text-rose-200"
            onClick={() => resetMeta()}
          >
            Wipe Meta
          </button>
        </div>
      </Card>

      <Card>
        <div className="text-sm font-semibold">Unlocked Content</div>
        <div className="mt-3">
          <div className="text-xs uppercase tracking-wider text-slate-400">Policies</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-200">
            {policyNames.map((n, i) => <li key={i} className="rounded-xl bg-slate-950/35 p-2 ring-1 ring-slate-800">{n}</li>)}
          </ul>

          <div className="mt-4 text-xs uppercase tracking-wider text-slate-400">Rulers</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-200">
            {rulerNames.map((n, i) => <li key={i} className="rounded-xl bg-slate-950/35 p-2 ring-1 ring-slate-800">{n}</li>)}
          </ul>
        </div>
      </Card>

      <Card className="md:col-span-2">
        <div className="text-sm font-semibold">Recent Runs</div>
        <div className="mt-2 text-xs text-slate-400">Up to 40 stored locally.</div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {meta.runHistory.slice(0, 8).map((h, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-950/35 p-3 ring-1 ring-slate-800">
              <div className="text-xs text-slate-400">{new Date(h.at).toLocaleString()}</div>
              <div className="mt-1 text-sm font-semibold">
                {h.result.reason.toUpperCase()} • Weeks {h.result.weeksSurvived} • Score {h.result.score}
              </div>
              <div className="mt-1 text-xs text-slate-400 tabular-nums">
                Gold {Math.round(h.result.finalTreasury)} • Debt {Math.round(h.result.finalDebt)} • Stability {Math.round(h.result.finalStability)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
