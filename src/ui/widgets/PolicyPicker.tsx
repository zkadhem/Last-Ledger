import React, { useMemo, useState } from "react";
import { Card } from "../components/Card";
import { CONTENT } from "../../engine/content";
import { useGameStore } from "../../store/useGameStore";
import type { Policy } from "../../types";
import clsx from "clsx";

function rarityTone(r: Policy["rarity"]) {
  switch (r) {
    case "common": return "ring-slate-700";
    case "uncommon": return "ring-emerald-400/25";
    case "rare": return "ring-indigo-400/25";
    case "legendary": return "ring-amber-400/25";
  }
}

export function PolicyPicker(props: { selected: string[]; setSelected: (ids: string[]) => void }) {
  const unlocked = useGameStore(s => s.meta.unlockedPolicyIds);

  const list = useMemo(() => {
    const map = new Map(CONTENT.policies.map(p => [p.id, p]));
    return unlocked.map(id => map.get(id)).filter(Boolean) as Policy[];
  }, [unlocked]);

  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return list;
    return list.filter(p =>
      (p.name + " " + p.description + " " + p.tags.join(" ")).toLowerCase().includes(q)
    );
  }, [filter, list]);

  const selectedSet = new Set(props.selected);

  return (
    <Card>
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold">Policies (Joker-like)</div>
          <div className="text-xs text-slate-400">Pick up to 3. Policies are pure data entries.</div>
        </div>
        <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Search policies…"
          className="w-44 rounded-xl bg-slate-950/40 px-3 py-2 text-xs ring-1 ring-slate-700 outline-none focus:ring-slate-500"
        />
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {filtered.map(p => {
          const picked = selectedSet.has(p.id);
          const disabled = !picked && props.selected.length >= 3;
          return (
            <button
              key={p.id}
              disabled={disabled}
              onClick={() => {
                if (picked) props.setSelected(props.selected.filter(x => x !== p.id));
                else props.setSelected([...props.selected, p.id]);
              }}
              className={clsx(
                "text-left rounded-2xl p-3 ring-1 transition hover:bg-slate-900/40",
                rarityTone(p.rarity),
                picked ? "bg-slate-900/60" : "bg-slate-950/25",
                disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">{p.rarity}</div>
              </div>
              <div className="mt-1 text-xs text-slate-300">{p.description}</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.tags.map(t => (
                  <span key={t} className="rounded-full bg-slate-900/60 px-2 py-1 text-[10px] text-slate-300 ring-1 ring-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
