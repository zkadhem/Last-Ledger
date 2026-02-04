import React, { useMemo, useState } from "react";
import { Card } from "../components/Card";
import { useGameStore } from "../../store/useGameStore";
import { CONTENT } from "../../engine/content";
import { PolicyPicker } from "../widgets/PolicyPicker";

function randomSeed() {
  return Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
}

export function TitleScreen() {
  const { meta, newRun, go } = useGameStore(s => ({ meta: s.meta, newRun: s.newRun, go: s.go }));

  const unlockedRulers = useMemo(() => {
    const set = new Set(meta.unlockedRulerIds);
    return CONTENT.rulers.filter(r => set.has(r.id));
  }, [meta.unlockedRulerIds]);

  const [seed, setSeed] = useState(randomSeed());
  const [rulerId, setRulerId] = useState(unlockedRulers[0]?.id ?? "ruler_paranoid_king");
  const [policies, setPolicies] = useState<string[]>([]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <div className="text-lg font-semibold">You are the kingdom’s accountant.</div>
        <div className="mt-2 text-sm text-slate-300">
          Wars, heroes, monsters, magic, corruption, and bad decisions all flow through your books.
          You never fight. You approve budgets, loans, contracts, and bribes. The kingdom survives—or doesn’t.
        </div>
        <div className="mt-3 text-xs text-slate-400">
          Each run is one reign (52 weeks). Your run is deterministic by seed: share and replay outcomes.
        </div>
      </Card>

      <Card>
        <div className="text-sm font-semibold">Start a Run</div>

        <div className="mt-3 grid gap-2">
          <label className="text-xs text-slate-400">Seed</label>
          <div className="flex gap-2">
            <input
              value={seed}
              onChange={e => setSeed(e.target.value)}
              className="w-full rounded-xl bg-slate-950/40 px-3 py-2 text-xs ring-1 ring-slate-700 outline-none focus:ring-slate-500"
            />
            <button
              className="rounded-xl px-3 py-2 text-xs ring-1 ring-slate-700 hover:bg-slate-900/60"
              onClick={() => setSeed(randomSeed())}
            >
              Reroll
            </button>
          </div>

          <label className="mt-2 text-xs text-slate-400">Ruler</label>
          <select
            value={rulerId}
            onChange={e => setRulerId(e.target.value)}
            className="rounded-xl bg-slate-950/40 px-3 py-2 text-xs ring-1 ring-slate-700 outline-none focus:ring-slate-500"
          >
            {unlockedRulers.map(r => (
              <option key={r.id} value={r.id}>
                {r.name} {r.epithet}
              </option>
            ))}
          </select>

          <div className="mt-2 rounded-2xl bg-slate-950/25 p-3 text-xs text-slate-300 ring-1 ring-slate-800">
            {CONTENT.rulers.find(r => r.id === rulerId)?.description}
          </div>

          <button
            className="mt-2 rounded-2xl bg-indigo-500/20 px-4 py-3 text-sm font-semibold ring-1 ring-indigo-400/25 hover:bg-indigo-500/25"
            onClick={() => {
              newRun({ seed, rulerId, policyIds: policies });
            }}
          >
            Plan the Reign
          </button>

          <button
            className="rounded-2xl px-4 py-3 text-sm ring-1 ring-slate-700 hover:bg-slate-900/60"
            onClick={() => go("meta")}
          >
            Meta Progress
          </button>
        </div>
      </Card>

      <PolicyPicker selected={policies} setSelected={setPolicies} />
    </div>
  );
}
