import React, { useEffect } from "react";
import { useGameStore } from "../../store/useGameStore";
import { Card } from "../components/Card";
import { StatPill } from "../components/StatPill";
import { WarningBanner } from "../components/WarningBanner";
import { StoryEventModal } from "../components/StoryEventModal";
import { FactionPanel } from "../widgets/FactionPanel";
import { RequestQueue } from "../widgets/RequestQueue";
import { EventCard } from "../widgets/EventCard";
import { ActionsPanel } from "../widgets/ActionsPanel";
import { LedgerTable } from "../widgets/LedgerTable";
import { TimelinePanel } from "../widgets/TimelinePanel";
import { PolicyManager, PolicyButton } from "../widgets/PolicyPicker";
import { CONTENT } from "../../engine/content";
import { computeCoupChance } from "../../engine/simulation";

function toneForValue(v: number, goodAbove: number, badBelow: number) {
  if (v >= goodAbove) return "good" as const;
  if (v <= badBelow) return "bad" as const;
  return "warn" as const;
}

export function RunScreen() {
  const { run, startWeek, finishWeek, decide, toast, showEffectPopup, showingPolicyPicker } = useGameStore(s => ({
    run: s.run,
    startWeek: s.startWeek,
    finishWeek: s.finishWeek,
    decide: s.decide,
    toast: s.toast,
    showEffectPopup: s.showEffectPopup,
    showingPolicyPicker: s.showingPolicyPicker
  }));

  useEffect(() => {
    if (!run) return;
    if (!run.currentEvent && run.requestQueue.length === 0) {
      startWeek();
    }
  }, [run?.week]);

  if (!run) return null;

  const ruler = CONTENT.rulers.find(r => r.id === run.rulerId);
  const s = run.stats;
  const coupChance = computeCoupChance(run);

  const canCloseWeek = run.requestQueue.length === 0;

  const handleDecide = (id: string, decision: "approve" | "deny" | "delay") => {
    const req = run.requestQueue.find(r => r.instanceId === id);
    if (!req) return;
    
    decide(id, decision);
    
    if (decision === "approve") {
      showEffectPopup({
        title: `✓ Granted: ${req.title}`,
        effects: [
          { label: "Treasury", value: `-${req.cost}`, tone: "bad" },
          { label: `${req.faction || "General"} Relations`, value: "Improved", tone: "good" }
        ]
      });
    } else if (decision === "deny") {
      showEffectPopup({
        title: `✗ Denied: ${req.title}`,
        effects: [
          { label: "Treasury", value: "No change", tone: "neutral" },
          { label: `${req.faction || "General"} Relations`, value: "Damaged", tone: "bad" }
        ]
      });
    } else {
      toast("Deferred. The ledger grows impatient with procrastination.");
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {/* Header Section */}
      <div className="lg:col-span-3 space-y-4">
        <WarningBanner />
        
        <Card ornate>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">👑</div>
              <div>
                <h2 className="font-display text-lg font-bold text-gold-400">
                  {ruler?.name} {ruler?.epithet}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-parchment-400">
                  <span className="flex items-center gap-1">
                    📅 Week <span className="font-display font-semibold text-parchment-200">{run.week}</span> of {run.weeksTotal}
                  </span>
                  <span className="flex items-center gap-1">
                    🎲 Seal: <span className="font-mono text-parchment-500">{run.seed.slice(0, 12)}...</span>
                  </span>
                  <span className={`flex items-center gap-1 ${
                    coupChance >= 0.15 ? "text-red-400" : 
                    coupChance >= 0.08 ? "text-amber-400" : 
                    "text-emerald-400"
                  }`}>
                    ⚔️ Coup Risk: <span className="font-display font-semibold">{(coupChance * 100).toFixed(1)}%</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatPill label="Treasury" value={`${Math.round(s.treasury)}`} tone={s.treasury >= 200 ? "good" : s.treasury <= 0 ? "bad" : "warn"} />
              <StatPill label="Debt" value={`${Math.round(s.debt)}`} tone={s.debt <= 300 ? "good" : s.debt >= 900 ? "bad" : "warn"} />
              <StatPill label="Stability" value={`${Math.round(s.stability)}`} tone={toneForValue(s.stability, 70, 35)} />
              <StatPill label="Corruption" value={`${Math.round(s.corruption)}`} tone={s.corruption <= 15 ? "good" : s.corruption >= 60 ? "bad" : "warn"} />
              <StatPill label="Inflation" value={`${Math.round(s.inflation)}`} tone={s.inflation <= 15 ? "good" : s.inflation >= 60 ? "bad" : "warn"} />
              <StatPill label="Coup Risk" value={`${Math.round(s.coupRisk)}`} tone={s.coupRisk <= 15 ? "good" : s.coupRisk >= 55 ? "bad" : "warn"} />
            </div>
          </div>
        </Card>
      </div>

      {/* Left Column */}
      <div className="space-y-5">
        <TimelinePanel history={run.history} week={run.week} total={run.weeksTotal} />
        <EventCard event={run.currentEvent} />
        
        {/* Policy Management Button */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📜</span>
            <div>
              <h3 className="font-display text-lg font-semibold text-gold-400">Royal Edicts</h3>
              <p className="text-xs text-parchment-400 font-body">
                {run.policyIds.length === 0 
                  ? "No edicts enacted. Enact decrees to shape your reign."
                  : `${run.policyIds.length} edict${run.policyIds.length > 1 ? 's' : ''} guiding the realm`
                }
              </p>
            </div>
          </div>
          
          {/* Show active policies */}
          {run.policyIds.length > 0 && (
            <div className="mb-3 space-y-1">
              {run.policyIds.map(id => {
                const policy = CONTENT.policies.find(p => p.id === id);
                if (!policy) return null;
                return (
                  <div key={id} className="text-xs text-parchment-300 font-body flex items-center gap-2">
                    <span className="text-gold-500">✓</span>
                    <span>{policy.name}</span>
                  </div>
                );
              })}
            </div>
          )}
          
          <PolicyButton />
        </Card>
        
        <ActionsPanel disabled={false} />
        <FactionPanel loyalty={run.loyalty} />
      </div>

      {/* Right Column - Main Content */}
      <div className="space-y-5 lg:col-span-2">
        <RequestQueue
          requests={run.requestQueue}
          onDecide={handleDecide}
        />

        <div className="parchment rounded-lg p-4 flex items-center justify-between gap-4">
          <div className="text-sm text-parchment-400 font-body">
            <span className="text-gold-500">⏳</span> Complete all petitions before closing the week's accounts.
          </div>
          <button
            disabled={!canCloseWeek}
            onClick={() => finishWeek()}
            className="gold-btn rounded-lg px-6 py-3 font-display font-semibold text-parchment-900 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            📋 Close Week
          </button>
        </div>

        <LedgerTable lines={run.ledger} currentWeek={run.week} />
      </div>

      {/* Story Event Modal */}
      <StoryEventModal />
      
      {/* Policy Manager Modal */}
      {showingPolicyPicker && <PolicyManager />}
    </div>
  );
}
