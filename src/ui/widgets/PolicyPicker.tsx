import React, { useMemo, useState } from "react";
import { Card } from "../components/Card";
import { CONTENT } from "../../engine/content";
import { useGameStore } from "../../store/useGameStore";
import type { Policy } from "../../types";
import clsx from "clsx";

const RARITY_STYLES: Record<Policy["rarity"], { border: string; badge: string; icon: string }> = {
  common: { 
    border: "border-parchment-700/40", 
    badge: "bg-parchment-800/50 text-parchment-400",
    icon: "📜"
  },
  uncommon: { 
    border: "border-emerald-700/40", 
    badge: "bg-emerald-900/30 text-emerald-400",
    icon: "📗"
  },
  rare: { 
    border: "border-blue-600/40", 
    badge: "bg-blue-900/30 text-blue-400",
    icon: "📘"
  },
  legendary: { 
    border: "border-gold-500/50", 
    badge: "bg-gold-900/30 text-gold-400",
    icon: "📙"
  }
};

// In-game policy manager component
export function PolicyManager() {
  const { run, togglePolicy, closePolicyPicker } = useGameStore(s => ({
    run: s.run,
    togglePolicy: s.togglePolicy,
    closePolicyPicker: s.closePolicyPicker
  }));
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

  const activePolicies = run?.policyIds ?? [];
  const activeSet = new Set(activePolicies);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-lg parchment medieval-border">
        <div className="p-4 border-b border-parchment-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📜</span>
              <div>
                <h2 className="font-display text-xl font-bold text-gold-400">Royal Edicts</h2>
                <p className="text-xs text-parchment-400 font-body">
                  Enact or repeal up to 3 edicts to guide thy reign
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="stat-badge rounded-full px-3 py-1">
                <span className="text-sm text-parchment-400">{activePolicies.length}/3 Active</span>
              </div>
              <button
                onClick={closePolicyPicker}
                className="ink-btn rounded-lg px-4 py-2 font-display text-parchment-300 hover:text-gold-400"
              >
                ✕ Close
              </button>
            </div>
          </div>
          
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="🔍 Search edicts..."
            className="medieval-input w-full rounded-lg px-4 py-2 text-sm text-parchment-200 outline-none"
          />
        </div>
        
        {/* Active Policies Summary */}
        {activePolicies.length > 0 && (
          <div className="p-4 border-b border-parchment-700/50 bg-gold-900/10">
            <h3 className="text-xs font-display text-gold-400 uppercase tracking-wider mb-2">Currently Active</h3>
            <div className="flex flex-wrap gap-2">
              {activePolicies.map(id => {
                const policy = CONTENT.policies.find(p => p.id === id);
                if (!policy) return null;
                return (
                  <button
                    key={id}
                    onClick={() => togglePolicy(id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold-900/30 border border-gold-500/40 hover:bg-red-900/30 hover:border-red-500/40 transition-colors group"
                  >
                    <span className="text-sm">{RARITY_STYLES[policy.rarity].icon}</span>
                    <span className="text-sm font-display text-parchment-200">{policy.name}</span>
                    <span className="text-xs text-parchment-500 group-hover:text-red-400">✕</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 200px)' }}>
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.map(p => {
              const isActive = activeSet.has(p.id);
              const disabled = !isActive && activePolicies.length >= 3;
              const styles = RARITY_STYLES[p.rarity];
              
              return (
                <button
                  key={p.id}
                  disabled={disabled}
                  onClick={() => togglePolicy(p.id)}
                  className={clsx(
                    "text-left rounded-lg p-4 transition-all border-2",
                    styles.border,
                    isActive 
                      ? "bg-gold-900/20 border-gold-500/50 shadow-glow" 
                      : "bg-parchment-900/30 hover:bg-parchment-800/40",
                    disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{styles.icon}</span>
                      <h4 className="font-display font-semibold text-parchment-200 text-sm">{p.name}</h4>
                    </div>
                    <span className={clsx("text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-display", styles.badge)}>
                      {p.rarity}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-xs text-parchment-400 font-body leading-relaxed pl-7">
                    {p.description}
                  </p>
                  
                  <div className="mt-3 pl-7 flex flex-wrap gap-1">
                    {p.tags.map(t => (
                      <span 
                        key={t} 
                        className="stat-badge rounded-full px-2 py-0.5 text-[10px] text-parchment-500 font-display"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  {isActive && (
                    <div className="mt-2 pl-7 flex items-center gap-2">
                      <span className="text-[10px] text-gold-400 font-display">✓ Active</span>
                      <span className="text-[10px] text-parchment-500 font-body">(click to repeal)</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-8">
              <div className="text-2xl mb-2">📭</div>
              <p className="text-sm text-parchment-500 font-body">No edicts match thy search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Compact policy button for RunScreen
export function PolicyButton() {
  const { run, openPolicyPicker } = useGameStore(s => ({
    run: s.run,
    openPolicyPicker: s.openPolicyPicker
  }));
  
  const activePolicies = run?.policyIds ?? [];
  
  return (
    <button
      onClick={openPolicyPicker}
      className="gold-btn rounded-lg px-4 py-3 font-display text-sm text-parchment-900 flex items-center gap-2"
    >
      <span>📜</span>
      <span>Royal Edicts ({activePolicies.length}/3)</span>
    </button>
  );
}

// Legacy picker for non-game contexts (kept for compatibility)
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
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📜</span>
          <div>
            <h3 className="font-display text-lg font-semibold text-gold-400">Royal Edicts</h3>
            <p className="text-xs text-parchment-400 font-body">
              Select up to 3 edicts to guide thy reign
            </p>
          </div>
        </div>
        <div className="stat-badge rounded-full px-3 py-1">
          <span className="text-xs text-parchment-400">{props.selected.length}/3</span>
        </div>
      </div>

      <div className="mb-4">
        <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="🔍 Search edicts..."
          className="medieval-input w-full rounded-lg px-4 py-2 text-sm text-parchment-200 outline-none"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2 max-h-96 overflow-y-auto pr-1">
        {filtered.map(p => {
          const picked = selectedSet.has(p.id);
          const disabled = !picked && props.selected.length >= 3;
          const styles = RARITY_STYLES[p.rarity];
          
          return (
            <button
              key={p.id}
              disabled={disabled}
              onClick={() => {
                if (picked) props.setSelected(props.selected.filter(x => x !== p.id));
                else props.setSelected([...props.selected, p.id]);
              }}
              className={clsx(
                "text-left rounded-lg p-4 transition-all border-2",
                styles.border,
                picked 
                  ? "bg-gold-900/20 border-gold-500/50 shadow-glow" 
                  : "bg-parchment-900/30 hover:bg-parchment-800/40",
                disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{styles.icon}</span>
                  <h4 className="font-display font-semibold text-parchment-200 text-sm">{p.name}</h4>
                </div>
                <span className={clsx("text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-display", styles.badge)}>
                  {p.rarity}
                </span>
              </div>
              
              <p className="mt-2 text-xs text-parchment-400 font-body leading-relaxed pl-7">
                {p.description}
              </p>
              
              <div className="mt-3 pl-7 flex flex-wrap gap-1">
                {p.tags.map(t => (
                  <span 
                    key={t} 
                    className="stat-badge rounded-full px-2 py-0.5 text-[10px] text-parchment-500 font-display"
                  >
                    {t}
                  </span>
                ))}
              </div>
              
              {picked && (
                <div className="mt-2 pl-7">
                  <span className="text-[10px] text-gold-400 font-display">✓ Selected</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-8">
          <div className="text-2xl mb-2">📭</div>
          <p className="text-sm text-parchment-500 font-body">No edicts match thy search.</p>
        </div>
      )}
    </Card>
  );
}
