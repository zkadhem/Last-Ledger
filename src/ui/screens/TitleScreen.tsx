import React, { useMemo, useState } from "react";
import { Card } from "../components/Card";
import { useGameStore } from "../../store/useGameStore";
import { CONTENT } from "../../engine/content";

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

  return (
    <div className="max-w-xl mx-auto">
      {/* Hero Banner */}
      <Card className="mb-6" ornate>
        <div className="text-center py-4">
          <div className="text-4xl mb-3">👑</div>
          <h1 className="font-display text-2xl font-bold text-gold-400 tracking-wide">
            Thou Art the Royal Accountant
          </h1>
          <div className="mt-3 text-sm text-parchment-300 font-body leading-relaxed max-w-2xl mx-auto">
            Wars, heroes, monsters, magic, corruption, and ill-fated decisions—all flow through thy ledger.
            Thou shalt never wield a sword. Thy weapons are ink, parchment, and cunning arithmetic.
            The kingdom's fate rests upon thy calculations.
          </div>
          <div className="mt-4 flex justify-center gap-6 text-xs text-parchment-500">
            <span className="flex items-center gap-1">📅 52 Weeks per Reign</span>
            <span className="flex items-center gap-1">🎲 Seeded & Deterministic</span>
            <span className="flex items-center gap-1">⚰️ One Mistake Can End All</span>
          </div>
        </div>
      </Card>

      {/* Run Configuration */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📋</span>
          <h2 className="font-display text-lg font-semibold text-gold-400">Begin a New Reign</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-parchment-400 font-display uppercase tracking-wider">Royal Seal (Seed)</label>
            <div className="flex gap-2 mt-1">
              <input
                value={seed}
                onChange={e => setSeed(e.target.value)}
                className="medieval-input w-full rounded-lg px-3 py-2 text-sm text-parchment-200 outline-none font-mono"
              />
              <button
                className="ink-btn rounded-lg px-4 py-2 text-sm text-parchment-300 hover:text-gold-400"
                onClick={() => setSeed(randomSeed())}
              >
                🎲
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-parchment-400 font-display uppercase tracking-wider">Choose Thy Liege</label>
            <select
              value={rulerId}
              onChange={e => setRulerId(e.target.value)}
              className="medieval-select w-full rounded-lg px-3 py-2 text-sm text-parchment-200 outline-none mt-1"
            >
              {unlockedRulers.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name} {r.epithet}
                </option>
              ))}
            </select>
          </div>

          <div className="scroll-panel rounded-lg p-4 text-sm text-parchment-300 font-body italic">
            "{CONTENT.rulers.find(r => r.id === rulerId)?.description}"
          </div>
          
          <div className="scroll-panel rounded-lg p-4 text-xs text-parchment-400 font-body">
            <div className="flex items-center gap-2 mb-2">
              <span>📜</span>
              <span className="font-display text-parchment-300">Royal Edicts</span>
            </div>
            <p>Edicts can be enacted and repealed during your reign. Manage them from the Royal Decrees panel once you begin.</p>
          </div>

          <button
            className="wax-seal w-full rounded-lg px-4 py-4 font-display font-semibold text-amber-100 tracking-wide"
            onClick={() => {
              newRun({ seed, rulerId, policyIds: [] });
            }}
          >
            ⚜️ Commence the Reign ⚜️
          </button>
          
          <div className="flex gap-3">
            <button
              className="ink-btn flex-1 rounded-lg px-4 py-3 text-sm font-display text-parchment-300 hover:text-gold-400"
              onClick={() => go("meta")}
            >
              📚 Chronicles
            </button>
            <button
              className="ink-btn flex-1 rounded-lg px-4 py-3 text-sm font-display text-parchment-300 hover:text-gold-400"
              onClick={() => go("help")}
            >
              ❓ How to Play
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
