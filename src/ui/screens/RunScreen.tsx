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
import { CONTENT } from "../../engine/content";
import { computeCoupChance } from "../../engine/simulation";

function toneForValue(v: number, goodAbove: number, badBelow: number) {
  if (v >= goodAbove) return "good" as const;
  if (v <= badBelow) return "bad" as const;
  return "warn" as const;
}

export function RunScreen() {
  const { run, startWeek, finishWeek, decide, toast, showEffectPopup } = useGameStore(s => ({
    run: s.run,
    startWeek: s.startWeek,
    finishWeek: s.finishWeek,
    decide: s.decide,
    toast: s.toast,
    showEffectPopup: s.showEffectPopup
  }));

  useEffect(() => {
    // Auto-begin week 1 when run starts (or when week advances)
    if (!run) return;
    // If there is no event and no requests, we assume week not initialized.
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
    
    // Show effect popup for the decision
    if (decision === "approve") {
      showEffectPopup({
        title: `✅ Approved: ${req.title}`,
        effects: [
          { label: "Treasury", value: `-${req.cost}`, tone: "bad" },
          { label: `${req.faction || "General"} Relations`, value: "Improved", tone: "good" }
        ]
      });
    } else if (decision === "deny") {
      showEffectPopup({
        title: `❌ Denied: ${req.title}`,
        effects: [
          { label: "Treasury", value: "No change", tone: "neutral" },
          { label: `${req.faction || "General"} Relations`, value: "Damaged", tone: "bad" }
        ]
      });
    } else {
      toast("Delayed. The ledger hates procrastination.");
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-3 space-y-3">
        <WarningBanner />
        
        <Card>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold">
                {ruler?.name} {ruler?.epithet} — Week {run.week} / {run.weeksTotal}
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Seed <span className="font-mono">{run.seed}</span> • Policies{" "}
                <span className="text-slate-200">{run.policyIds.length}</span>
                <span className="ml-2">• Coup Chance: <span className={coupChance >= 0.15 ? "text-rose-300" : coupChance >= 0.08 ? "text-amber-300" : "text-emerald-300"}>{(coupChance * 100).toFixed(1)}%</span></span>
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

      <div className="space-y-4">
        <TimelinePanel history={run.history} week={run.week} total={run.weeksTotal} />
        <EventCard event={run.currentEvent} />
        <ActionsPanel disabled={false} />
        <FactionPanel loyalty={run.loyalty} />
      </div>

      <div className="space-y-4 lg:col-span-2">
        <RequestQueue
          requests={run.requestQueue}
          onDecide={handleDecide}
        />

        <div className="flex items-center justify-between gap-2">
          <div className="text-xs text-slate-400">
            Close week when all requests are resolved (or delayed until you can handle them).
          </div>
          <button
            disabled={!canCloseWeek}
            onClick={() => finishWeek()}
            className="rounded-2xl bg-indigo-500/20 px-4 py-3 text-sm font-semibold ring-1 ring-indigo-400/25 hover:bg-indigo-500/25 disabled:opacity-40"
          >
            Close Week
          </button>
        </div>

        <LedgerTable lines={run.ledger} currentWeek={run.week} />
      </div>

      {/* Story Event Modal */}
      <StoryEventModal />
    </div>
  );
}
