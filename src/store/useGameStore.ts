import { create } from "zustand";
import { produce } from "immer";
import type { EngineState, RunEndReason, ActiveStoryEvent } from "../types";
import { startNewRun, beginWeek, decideOnRequest, endWeek, rollCoup, actionLoan, actionInflate, actionEmbezzle, actionBribe, actionInvest, computeCoupChance, maybeGenerateStoryEvent, resolveStoryChoice } from "../engine/simulation";
import { checkEnd } from "../engine/game";
import { scoreRun, type RunResult } from "../engine/scoring";
import { loadMeta, saveMeta, wipeMeta, type MetaState } from "../engine/persistence";
import { UNLOCKS } from "../data/unlocks";
import { CONTENT } from "../engine/content";
import { BALANCE } from "../engine/balance";

export type Screen = "title" | "meta" | "run" | "gameover" | "help";

export type EffectPopup = {
  id: string;
  title: string;
  effects: Array<{ label: string; value: string; tone: "good" | "bad" | "neutral" }>;
};

export type Warning = {
  id: string;
  type: "stability" | "treasury" | "debt" | "coup" | "corruption" | "inflation";
  message: string;
  severity: "warning" | "critical";
};

type GameStore = {
  screen: Screen;

  meta: MetaState;
  run?: EngineState;
  lastResult?: RunResult;

  // UI
  toasts: Array<{ id: string; msg: string }>;
  effectPopup?: EffectPopup;
  warnings: Warning[];
  showingStoryEvent: boolean;

  // actions
  go: (screen: Screen) => void;
  resetMeta: () => void;

  newRun: (opts: { seed: string; rulerId: string; policyIds: string[] }) => void;
  startWeek: () => void;

  decide: (instanceId: string, decision: "approve" | "deny" | "delay") => void;

  actLoan: () => void;
  actInflate: () => void;
  actEmbezzle: () => void;
  actBribe: (faction: any) => void;
  actInvest: () => void;

  finishWeek: () => void;
  
  // Story events
  resolveStory: (choiceIndex: number) => void;

  toast: (msg: string) => void;
  dismissToast: (id: string) => void;
  
  showEffectPopup: (popup: Omit<EffectPopup, "id">) => void;
  dismissEffectPopup: () => void;
  
  updateWarnings: () => void;
};

function computeUnlocks(meta: MetaState): MetaState {
  const unlockedPolicyIds = new Set(meta.unlockedPolicyIds);
  const unlockedRulerIds = new Set(meta.unlockedRulerIds);

  const bestWeeks = meta.bestWeeks;

  for (const u of UNLOCKS) {
    const ok = (() => {
      switch (u.rule.type) {
        case "runs_played": return meta.runsPlayed >= u.rule.value;
        case "win_runs": return meta.wins >= u.rule.value;
        case "survive_weeks": return bestWeeks >= u.rule.value;
        case "reach_corruption": {
          const maxCor = Math.max(0, ...meta.runHistory.map(h => h.result.finalCorruption));
          return maxCor >= u.rule.value;
        }
        case "reach_debt": {
          const maxDebt = Math.max(0, ...meta.runHistory.map(h => h.result.finalDebt));
          return maxDebt >= u.rule.value;
        }
      }
    })();

    if (!ok) continue;

    if (u.kind === "policy") unlockedPolicyIds.add(u.targetId);
    if (u.kind === "ruler") unlockedRulerIds.add(u.targetId);
  }

  return {
    ...meta,
    unlockedPolicyIds: [...unlockedPolicyIds],
    unlockedRulerIds: [...unlockedRulerIds]
  };
}

function computeWarnings(run: EngineState | undefined): Warning[] {
  if (!run) return [];
  
  const warnings: Warning[] = [];
  const s = run.stats;
  
  // Stability warnings
  if (s.stability <= 10) {
    warnings.push({
      id: "stability-critical",
      type: "stability",
      message: "⚠️ STABILITY CRITICAL! Kingdom on verge of collapse!",
      severity: "critical"
    });
  } else if (s.stability <= 25) {
    warnings.push({
      id: "stability-warning",
      type: "stability",
      message: "⚠️ Low stability! Social unrest threatens the realm.",
      severity: "warning"
    });
  }
  
  // Treasury warnings
  if (s.treasury <= BALANCE.bankruptFloor + 100) {
    warnings.push({
      id: "treasury-critical",
      type: "treasury",
      message: "⚠️ TREASURY CRITICAL! Bankruptcy imminent!",
      severity: "critical"
    });
  } else if (s.treasury <= 50) {
    warnings.push({
      id: "treasury-warning",
      type: "treasury",
      message: "⚠️ Treasury dangerously low!",
      severity: "warning"
    });
  }
  
  // Debt warnings
  if (s.debt >= BALANCE.debtSpiral - 200) {
    warnings.push({
      id: "debt-critical",
      type: "debt",
      message: "⚠️ DEBT SPIRAL IMMINENT! Creditors circle like vultures!",
      severity: "critical"
    });
  } else if (s.debt >= BALANCE.debtDanger) {
    warnings.push({
      id: "debt-warning",
      type: "debt",
      message: "⚠️ Dangerous debt levels! Interest will devour you.",
      severity: "warning"
    });
  }
  
  // Coup risk warnings
  const coupChance = computeCoupChance(run);
  if (coupChance >= 0.25) {
    warnings.push({
      id: "coup-critical",
      type: "coup",
      message: `⚠️ COUP RISK EXTREME (${(coupChance * 100).toFixed(0)}%)! Conspirators sharpen their knives!`,
      severity: "critical"
    });
  } else if (coupChance >= 0.12) {
    warnings.push({
      id: "coup-warning",
      type: "coup",
      message: `⚠️ High coup risk (${(coupChance * 100).toFixed(0)}%)! Loyalty is wavering.`,
      severity: "warning"
    });
  }
  
  // Corruption warning
  if (s.corruption >= 75) {
    warnings.push({
      id: "corruption-critical",
      type: "corruption",
      message: "⚠️ Corruption rampant! Stability crumbling from within.",
      severity: "critical"
    });
  } else if (s.corruption >= 50) {
    warnings.push({
      id: "corruption-warning",
      type: "corruption",
      message: "⚠️ High corruption! The rot spreads.",
      severity: "warning"
    });
  }
  
  // Inflation warning
  if (s.inflation >= 70) {
    warnings.push({
      id: "inflation-critical",
      type: "inflation",
      message: "⚠️ Hyperinflation! Currency losing all value!",
      severity: "critical"
    });
  } else if (s.inflation >= 45) {
    warnings.push({
      id: "inflation-warning",
      type: "inflation",
      message: "⚠️ High inflation! Prices spiral out of control.",
      severity: "warning"
    });
  }
  
  return warnings;
}

export const useGameStore = create<GameStore>((set, get) => ({
  screen: "title",
  meta: loadMeta(),
  run: undefined,
  lastResult: undefined,
  toasts: [],
  effectPopup: undefined,
  warnings: [],
  showingStoryEvent: false,

  go: (screen) => set({ screen }),

  resetMeta: () => {
    wipeMeta();
    set({ meta: loadMeta(), run: undefined, lastResult: undefined, screen: "title", warnings: [], showingStoryEvent: false });
  },

  newRun: (opts) => {
    const allowedPolicies = new Set(get().meta.unlockedPolicyIds);
    const allowedRulers = new Set(get().meta.unlockedRulerIds);

    const safePolicyIds = opts.policyIds.filter(p => allowedPolicies.has(p)).slice(0, 3);
    const safeRulerId = allowedRulers.has(opts.rulerId) ? opts.rulerId : get().meta.unlockedRulerIds[0];

    const run = startNewRun({ seed: opts.seed, rulerId: safeRulerId, policyIds: safePolicyIds });
    set({ run, screen: "run", lastResult: undefined, warnings: computeWarnings(run), showingStoryEvent: false });
  },

  startWeek: () => {
    const run = get().run;
    if (!run) return;
    const s = beginWeek(run);
    set({ run: s, warnings: computeWarnings(s) });
  },

  decide: (instanceId, decision) => {
    const run = get().run;
    if (!run) return;
    const s = decideOnRequest(run, instanceId, decision);
    set({ run: s, warnings: computeWarnings(s) });
  },

  actLoan: () => {
    const run = get().run;
    if (!run) return;
    const newRun = actionLoan(run);
    set({ run: newRun, warnings: computeWarnings(newRun) });
    get().showEffectPopup({
      title: "💰 Loan Secured",
      effects: [
        { label: "Treasury", value: `+${BALANCE.loanAmount}`, tone: "good" },
        { label: "Debt", value: `+${BALANCE.loanAmount}`, tone: "bad" },
        { label: "Coup Risk", value: `+${BALANCE.loanAddsCoupRisk}`, tone: "bad" }
      ]
    });
  },
  
  actInflate: () => {
    const run = get().run;
    if (!run) return;
    const newRun = actionInflate(run);
    set({ run: newRun, warnings: computeWarnings(newRun) });
    get().showEffectPopup({
      title: "🔥 Currency Inflated",
      effects: [
        { label: "Treasury", value: `+${BALANCE.inflateAmount}`, tone: "good" },
        { label: "Inflation", value: `+${BALANCE.inflateAddsInflation}`, tone: "bad" },
        { label: "Corruption", value: `+${BALANCE.inflateAddsCorruption}`, tone: "bad" }
      ]
    });
  },
  
  actEmbezzle: () => {
    const run = get().run;
    if (!run) return;
    const newRun = actionEmbezzle(run);
    set({ run: newRun, warnings: computeWarnings(newRun) });
    get().showEffectPopup({
      title: "🤫 Funds Embezzled",
      effects: [
        { label: "Treasury", value: `+${BALANCE.embezzleAmount}`, tone: "good" },
        { label: "Corruption", value: `+${BALANCE.embezzleAddsCorruption}`, tone: "bad" },
        { label: "Coup Risk", value: `+${BALANCE.embezzleAddsCoupRisk}`, tone: "bad" }
      ]
    });
  },
  
  actBribe: (faction) => {
    const run = get().run;
    if (!run) return;
    const newRun = actionBribe(run, faction);
    set({ run: newRun, warnings: computeWarnings(newRun) });
    get().showEffectPopup({
      title: `🎁 Bribed ${faction}`,
      effects: [
        { label: "Treasury", value: `-${BALANCE.bribeCost}`, tone: "bad" },
        { label: `${faction} Loyalty`, value: `+${BALANCE.bribeLoyaltyGain}`, tone: "good" },
        { label: "Corruption", value: `+${BALANCE.bribeAddsCorruption}`, tone: "bad" },
        { label: "Coup Risk", value: `+${BALANCE.bribeAddsCoupRisk}`, tone: "bad" }
      ]
    });
  },
  
  actInvest: () => {
    const run = get().run;
    if (!run) return;
    const newRun = actionInvest(run);
    set({ run: newRun, warnings: computeWarnings(newRun) });
    get().showEffectPopup({
      title: "🏗️ Infrastructure Investment",
      effects: [
        { label: "Treasury", value: `-${BALANCE.investCost}`, tone: "bad" },
        { label: "Stability", value: `+${BALANCE.investStability}`, tone: "good" },
        { label: "Delayed Payoff", value: "+200 gold, +2 stability in 5 weeks", tone: "good" }
      ]
    });
  },

  finishWeek: () => {
    const run = get().run;
    if (!run) return;

    // coup check happens at end of week, before advancing (so ledger prints chance for the week you just played)
    const coupRes = rollCoup(run);
    let s = coupRes.state;

    if (coupRes.coup) {
      const ended = "coup" as RunEndReason;
      const result = scoreRun(s, ended);

      const meta0 = get().meta;
      const meta1 = computeUnlocks({
        ...meta0,
        runsPlayed: meta0.runsPlayed + 1,
        wins: meta0.wins,
        bestScore: Math.max(meta0.bestScore, result.score),
        bestWeeks: Math.max(meta0.bestWeeks, result.weeksSurvived),
        runHistory: [{ at: Date.now(), result }, ...meta0.runHistory].slice(0, 40)
      });

      saveMeta(meta1);
      set({ run: s, lastResult: result, meta: meta1, screen: "gameover", warnings: [] });
      return;
    }

    // otherwise, end week -> advance
    s = endWeek(s);

    // check other end conditions or victory
    const end = checkEnd(s);
    if (end.ended) {
      const reason = end.reason!;
      const result = scoreRun(s, reason);

      const meta0 = get().meta;
      const meta1 = computeUnlocks({
        ...meta0,
        runsPlayed: meta0.runsPlayed + 1,
        wins: meta0.wins + (reason === "survived" ? 1 : 0),
        bestScore: Math.max(meta0.bestScore, result.score),
        bestWeeks: Math.max(meta0.bestWeeks, result.weeksSurvived),
        runHistory: [{ at: Date.now(), result }, ...meta0.runHistory].slice(0, 40)
      });

      saveMeta(meta1);
      set({ run: s, lastResult: result, meta: meta1, screen: "gameover", warnings: [], showingStoryEvent: false });
      return;
    }

    // Check for random story event
    const storyEvent = maybeGenerateStoryEvent(s);
    if (storyEvent) {
      s = { ...s, activeStoryEvent: storyEvent };
      set({ run: s, warnings: computeWarnings(s), showingStoryEvent: true });
    } else {
      set({ run: s, warnings: computeWarnings(s), showingStoryEvent: false });
    }
  },

  resolveStory: (choiceIndex: number) => {
    const run = get().run;
    if (!run || !run.activeStoryEvent) return;
    
    const choice = run.activeStoryEvent.choices[choiceIndex];
    if (!choice) return;
    
    const newRun = resolveStoryChoice(run, choiceIndex);
    
    // Show effect popup for the story choice
    const effects = choice.effects.flatMap(e => {
      const result: Array<{ label: string; value: string; tone: "good" | "bad" | "neutral" }> = [];
      if (e.delta?.treasury) {
        result.push({ 
          label: "Treasury", 
          value: `${e.delta.treasury >= 0 ? "+" : ""}${e.delta.treasury}`, 
          tone: e.delta.treasury >= 0 ? "good" : "bad" 
        });
      }
      if (e.delta?.stability) {
        result.push({ 
          label: "Stability", 
          value: `${e.delta.stability >= 0 ? "+" : ""}${e.delta.stability}`, 
          tone: e.delta.stability >= 0 ? "good" : "bad" 
        });
      }
      if (e.delta?.corruption) {
        result.push({ 
          label: "Corruption", 
          value: `${e.delta.corruption >= 0 ? "+" : ""}${e.delta.corruption}`, 
          tone: e.delta.corruption <= 0 ? "good" : "bad" 
        });
      }
      if (e.delta?.coupRisk) {
        result.push({ 
          label: "Coup Risk", 
          value: `${e.delta.coupRisk >= 0 ? "+" : ""}${e.delta.coupRisk}`, 
          tone: e.delta.coupRisk <= 0 ? "good" : "bad" 
        });
      }
      if (e.delta?.inflation) {
        result.push({ 
          label: "Inflation", 
          value: `${e.delta.inflation >= 0 ? "+" : ""}${e.delta.inflation}`, 
          tone: e.delta.inflation <= 0 ? "good" : "bad" 
        });
      }
      if (e.delta?.loyalty) {
        for (const [faction, value] of Object.entries(e.delta.loyalty)) {
          if (value) {
            result.push({ 
              label: `${faction} Loyalty`, 
              value: `${value >= 0 ? "+" : ""}${value}`, 
              tone: value >= 0 ? "good" : "bad" 
            });
          }
        }
      }
      if (e.delayed) {
        result.push({ 
          label: "Delayed Effect", 
          value: `${e.delayed.effect.label} in ${e.delayed.inWeeks} weeks`, 
          tone: "neutral" 
        });
      }
      return result;
    });
    
    set({ run: newRun, warnings: computeWarnings(newRun), showingStoryEvent: false });
    
    if (effects.length > 0) {
      get().showEffectPopup({
        title: `📜 ${choice.label}`,
        effects
      });
    }
  },

  toast: (msg) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    set(produce((st: GameStore) => { st.toasts.push({ id, msg }); }));
    setTimeout(() => get().dismissToast(id), 2400);
  },

  dismissToast: (id) => set(produce((st: GameStore) => { st.toasts = st.toasts.filter(t => t.id !== id); })),
  
  showEffectPopup: (popup) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    set({ effectPopup: { ...popup, id } });
    setTimeout(() => {
      const current = get().effectPopup;
      if (current?.id === id) {
        set({ effectPopup: undefined });
      }
    }, 3000);
  },
  
  dismissEffectPopup: () => set({ effectPopup: undefined }),
  
  updateWarnings: () => {
    const run = get().run;
    set({ warnings: computeWarnings(run) });
  }
}));
