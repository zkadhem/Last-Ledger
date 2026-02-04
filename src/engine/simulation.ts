import type {
  EffectSpec,
  EngineState,
  EventCard,
  FactionId,
  GeneratedRequest,
  LedgerLine,
  PendingEffect,
  ActiveStoryEvent
} from "../types";
import { BALANCE } from "./balance";
import { RNG } from "./rng";
import { CONTENT } from "./content";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function addLedger(state: EngineState, line: LedgerLine): EngineState {
  return { ...state, ledger: [line, ...state.ledger].slice(0, 1200) };
}

function pushHistory(state: EngineState): EngineState {
  const s = state.stats;
  const point = {
    week: state.week,
    treasury: s.treasury,
    debt: s.debt,
    corruption: s.corruption,
    stability: s.stability,
    inflation: s.inflation,
    coupRisk: s.coupRisk
  };
  return { ...state, history: [...state.history, point].slice(-260) };
}

function applyDelta(state: EngineState, delta: NonNullable<EffectSpec["delta"]>, label: string): EngineState {
  const before = state.stats;
  const loyalty = { ...state.loyalty };

  if (delta.loyalty) {
    for (const k of Object.keys(delta.loyalty) as FactionId[]) {
      loyalty[k] = clamp(loyalty[k] + (delta.loyalty[k] ?? 0), 0, 100);
    }
  }

  const stats = {
    treasury: before.treasury + (delta.treasury ?? 0),
    debt: before.debt + (delta.debt ?? 0),
    corruption: clamp(before.corruption + (delta.corruption ?? 0), 0, 100),
    stability: clamp(before.stability + (delta.stability ?? 0), 0, 100),
    inflation: clamp(before.inflation + (delta.inflation ?? 0), 0, 100),
    coupRisk: clamp(before.coupRisk + (delta.coupRisk ?? 0), 0, 100)
  };

  return addLedger(
    { ...state, stats, loyalty },
    {
      week: state.week,
      label,
      deltaTreasury: delta.treasury,
      deltaDebt: delta.debt,
      deltaCorruption: delta.corruption,
      deltaStability: delta.stability,
      deltaInflation: delta.inflation,
      deltaCoupRisk: delta.coupRisk,
      note: delta.loyalty ? `Loyalty: ${Object.entries(delta.loyalty).map(([f, v]) => `${f} ${v! >= 0 ? "+" : ""}${v}`).join(", ")}` : undefined
    }
  );
}

function scheduleDelayed(state: EngineState, pending: PendingEffect): EngineState {
  return { ...state, pending: [...state.pending, pending] };
}

export function resolveEffect(state: EngineState, effect: EffectSpec): EngineState {
  let s = state;
  if (effect.delta) s = applyDelta(s, effect.delta, effect.label);
  if (effect.delayed) {
    s = scheduleDelayed(s, { dueWeek: s.week + effect.delayed.inWeeks, effect: effect.delayed.effect });
    s = addLedger(s, { week: s.week, label: `Scheduled: ${effect.delayed.effect.label}`, note: `Due week ${s.week + effect.delayed.inWeeks}` });
  }
  return s;
}

function getPolicyMods(state: EngineState) {
  const policies = CONTENT.policies.filter(p => state.policyIds.includes(p.id));
  const ruler = CONTENT.rulers.find(r => r.id === state.rulerId);
  return { policies, ruler };
}

function aggregateMods(state: EngineState) {
  const { policies, ruler } = getPolicyMods(state);

  const mods: any = {};
  const apply = (m: any) => {
    if (!m) return;
    for (const [k, v] of Object.entries(m)) {
      if (k === "loyaltyDrift") {
        mods.loyaltyDrift = mods.loyaltyDrift ?? {};
        for (const [fk, fv] of Object.entries(v as any)) {
          mods.loyaltyDrift[fk] = (mods.loyaltyDrift[fk] ?? 0) + (fv as number);
        }
      } else {
        mods[k] = (mods[k] ?? 0) + (v as number);
      }
    }
  };

  apply(ruler?.mods);
  for (const p of policies) apply(p.mods);

  return { policies, ruler, mods };
}

function applyWeeklyDrifts(state: EngineState): EngineState {
  const { mods } = aggregateMods(state);
  let s = state;

  const sd = BALANCE.baseStabilityDrift + (mods.stabilityDrift ?? 0);
  const cd = BALANCE.baseCorruptionDrift + (mods.corruptionDrift ?? 0);
  const id = BALANCE.baseInflationDrift + (mods.inflationDrift ?? 0);
  const coupD = BALANCE.baseCoupRiskDrift + (mods.coupRiskDrift ?? 0);

  s = applyDelta(s, { stability: sd, corruption: cd, inflation: id, coupRisk: coupD }, "Weekly drift");

  // Apply base loyalty decay to all factions (prevents idle play)
  const baseLoyaltyDecay = BALANCE.baseLoyaltyDecay;
  const loyaltyDrift: Record<string, number> = {
    peasants: baseLoyaltyDecay,
    nobles: baseLoyaltyDecay,
    mages: baseLoyaltyDecay,
    army: baseLoyaltyDecay,
    underworld: baseLoyaltyDecay
  };
  
  // Add any policy/ruler loyalty drift modifiers
  if (mods.loyaltyDrift) {
    for (const [faction, value] of Object.entries(mods.loyaltyDrift as Record<string, number>)) {
      loyaltyDrift[faction] = (loyaltyDrift[faction] ?? baseLoyaltyDecay) + value;
    }
  }
  
  s = applyDelta(s, { loyalty: loyaltyDrift as any }, "Faction loyalty decay");

  return s;
}

function applyHooksWeekStart(state: EngineState): EngineState {
  const { policies, ruler } = aggregateMods(state);
  const ctx = { week: state.week, rulerId: state.rulerId, policyIds: state.policyIds, rngSeed: state.seed };

  let s = state;
  if (ruler?.hooks?.onWeekStart) s = ruler.hooks.onWeekStart(s, ctx);
  for (const p of policies) {
    if (p.hooks?.onWeekStart) s = p.hooks.onWeekStart(s, ctx);
  }
  return s;
}

function computeTaxIncome(state: EngineState): number {
  const { mods } = aggregateMods(state);
  const weekFactor = Math.pow(BALANCE.weeklyIncomeGrowth, state.week - 1);

  const stability = state.stats.stability / 100;
  const inflation = state.stats.inflation / 100;
  const corruption = state.stats.corruption / 100;

  const loyaltyAvg = Object.values(state.loyalty).reduce((a, b) => a + b, 0) / (5 * 100);
  const loyaltyFactor = 0.85 + loyaltyAvg * 0.35; // 0.85..1.2

  const base = BALANCE.baseTaxIncome * weekFactor * (0.75 + stability * 0.5) * loyaltyFactor;

  const taxRate = 1 + (mods.taxRate ?? 0);
  const inflationPenalty = 1 - inflation * BALANCE.inflationIncomePenaltyAt100;
  const corruptionBonus = 1 + corruption * BALANCE.corruptionIncomeBonusAt100 + (mods.incomeFromCorruption ?? 0) * corruption;

  return Math.round(base * taxRate * inflationPenalty * corruptionBonus);
}

function applyIncomeHooks(state: EngineState, baseIncome: number): { state: EngineState; income: number } {
  const { policies, ruler } = aggregateMods(state);
  const ctx = { week: state.week, rulerId: state.rulerId, policyIds: state.policyIds, rngSeed: state.seed };

  let s = state;
  let income = baseIncome;

  if (ruler?.hooks?.onIncome) {
    const r = ruler.hooks.onIncome(s, ctx, income);
    s = r.state; income = r.income;
  }
  for (const p of policies) {
    if (p.hooks?.onIncome) {
      const r = p.hooks.onIncome(s, ctx, income);
      s = r.state; income = r.income;
    }
  }
  return { state: s, income };
}

function applyDebtInterest(state: EngineState): EngineState {
  const { mods } = aggregateMods(state);
  const rate = BALANCE.baseInterestRate * (1 + (mods.loanInterest ?? 0));
  const interest = Math.round(state.stats.debt * rate);

  if (interest <= 0) return state;
  return applyDelta(state, { treasury: -interest }, `Interest payment (${Math.round(rate * 1000) / 10}%)`);
}

function generateRequests(state: EngineState, rng: RNG): GeneratedRequest[] {
  const { mods } = aggregateMods(state);
  const count = clamp(
    rng.int(BALANCE.requestsPerWeekMin, BALANCE.requestsPerWeekMax) + Math.round((mods.expensePressure ?? 0) * 2),
    1,
    5
  );

  const scaler = Math.pow(BALANCE.requestCostWeekScaler, state.week - 1) * (1 + Math.max(0, mods.expensePressure ?? 0) * 0.25);

  const result: GeneratedRequest[] = [];
  for (let i = 0; i < count; i++) {
    const base = rng.pick(CONTENT.requests);
    const noise = 0.85 + rng.next() * 0.35;
    const cost = Math.round(base.baseCost * scaler * noise * (1 - Math.max(0, -(mods.expensePressure ?? 0)) * 0.1));
    result.push({
      instanceId: `${state.week}-${i}-${Math.floor(rng.next() * 1e9)}`,
      baseId: base.id,
      title: base.title,
      body: base.body,
      faction: base.faction,
      cost,
      urgency: base.urgency,
      age: 0,
      effects: base.effects
    });
  }
  return result;
}

function generateEvent(rng: RNG): EventCard {
  return rng.weightedPick(CONTENT.events);
}

export function startNewRun(params: {
  seed: string;
  rulerId: string;
  policyIds: string[];
  weeksTotal?: number;
}): EngineState {
  const ruler = CONTENT.rulers.find(r => r.id === params.rulerId);
  if (!ruler) throw new Error("Unknown ruler");

  const weeksTotal = params.weeksTotal ?? BALANCE.weeksTotal;

  const base: EngineState = {
    week: 1,
    weeksTotal,
    seed: params.seed,
    rulerId: params.rulerId,
    policyIds: params.policyIds,

    stats: {
      treasury: 520,
      debt: 0,
      corruption: 10,
      stability: 65,
      inflation: 8,
      coupRisk: 10
    },
    loyalty: {
      peasants: 60,
      nobles: 55,
      mages: 55,
      army: 58,
      underworld: 45
    },

    requestQueue: [],
    currentEvent: undefined,

    pending: [],
    ledger: [],
    history: [],
    flags: {}
  };

  // apply ruler starting overrides
  const s = {
    ...base,
    stats: { ...base.stats, ...ruler.starting, treasury: (ruler.starting?.treasury ?? base.stats.treasury) },
    loyalty: { ...base.loyalty, ...(ruler.starting?.loyalty ?? {}) }
  };

  return addLedger(s, { week: 1, label: "Reign begins", note: `${ruler.name} ${ruler.epithet}` });
}

export function beginWeek(state: EngineState): EngineState {
  const rng = new RNG(`${state.seed}::week:${state.week}`);

  let s = state;

  // resolve pending effects due
  const due = s.pending.filter(p => p.dueWeek === s.week);
  const still = s.pending.filter(p => p.dueWeek !== s.week);
  s = { ...s, pending: still };
  for (const p of due) s = resolveEffect(s, { ...p.effect, label: `Delayed: ${p.effect.label}` });

  // week start hooks and drifts
  s = applyHooksWeekStart(s);
  s = applyWeeklyDrifts(s);

  // income + hooks
  const baseIncome = computeTaxIncome(s);
  const hookRes = applyIncomeHooks(s, baseIncome);
  s = hookRes.state;
  s = applyDelta(s, { treasury: hookRes.income }, "Tax income");

  // interest
  s = applyDebtInterest(s);

  // event + requests
  const evt = generateEvent(rng);
  s = addLedger(s, { week: s.week, label: `Event: ${evt.title}` });
  for (const e of evt.effects) s = resolveEffect(s, e);

  const reqs = generateRequests(s, rng);
  s = { ...s, currentEvent: evt, requestQueue: reqs };

  // history point at start-of-week after automatic effects
  s = pushHistory(s);

  return s;
}

export function decideOnRequest(state: EngineState, instanceId: string, decision: "approve" | "deny" | "delay"): EngineState {
  const req = state.requestQueue.find(r => r.instanceId === instanceId);
  if (!req) return state;

  const effects = req.effects[decision].map(e => {
    // scale treasury/debt deltas that match baseCost placeholders
    const delta = e.delta ? { ...e.delta } : undefined;
    if (delta?.treasury) {
      // allow the authoring to use -baseCost; here, treat -120 etc as authored;
      // we scale by ratio if it's negative and equals original-ish.
      // Simpler: if negative, replace with -req.cost when within +-10% of base.
      if (delta.treasury < 0) {
        delta.treasury = -req.cost;
      }
    }
    return { ...e, delta };
  });

  let s = state;

  // remove or age
  if (decision === "delay") {
    const updated = state.requestQueue.map(r => {
      if (r.instanceId !== instanceId) return r;
      const worsened = Math.round(r.cost * (1 + 0.12 * r.urgency));
      return { ...r, age: r.age + 1, urgency: clamp(r.urgency + 1, 1, 3), cost: worsened };
    });
    s = { ...s, requestQueue: updated };
  } else {
    s = { ...s, requestQueue: state.requestQueue.filter(r => r.instanceId !== instanceId) };
  }

  s = addLedger(s, { week: s.week, label: `${decision.toUpperCase()}: ${req.title}`, note: req.faction ? `Faction: ${req.faction}` : undefined });
  for (const e of effects) s = resolveEffect(s, e);

  // apply hooks based on decision
  const ctx = { week: s.week, rulerId: s.rulerId, policyIds: s.policyIds, rngSeed: s.seed };
  const { policies, ruler } = aggregateMods(s);

  if (decision === "approve") {
    if (ruler?.hooks?.onApproveRequest) s = ruler.hooks.onApproveRequest(s, ctx, req.baseId);
    for (const p of policies) if (p.hooks?.onApproveRequest) s = p.hooks.onApproveRequest(s, ctx, req.baseId);
  } else if (decision === "deny") {
    if (ruler?.hooks?.onDenyRequest) s = ruler.hooks.onDenyRequest(s, ctx, req.baseId);
    for (const p of policies) if (p.hooks?.onDenyRequest) s = p.hooks.onDenyRequest(s, ctx, req.baseId);
  }

  return s;
}

export function endWeek(state: EngineState): EngineState {
  // end-of-week: inflation/corruption destabilize a bit more
  const inflation = state.stats.inflation / 100;
  const corruption = state.stats.corruption / 100;

  const stabilityPenalty =
    inflation * BALANCE.inflationStabilityPenaltyAt100 * 4 +
    corruption * BALANCE.corruptionStabilityPenaltyAt100 * 3;

  let s = state;
  if (stabilityPenalty > 0.01) {
    s = applyDelta(s, { stability: -stabilityPenalty }, "Systemic strain");
  }

  // coup check handled elsewhere (UI calls after end)
  s = addLedger(s, { week: s.week, label: "Week closed" });

  // advance
  return { ...s, week: s.week + 1, requestQueue: [] };
}

// Generate a random story event (40% chance each week)
export function maybeGenerateStoryEvent(state: EngineState): ActiveStoryEvent | undefined {
  const rng = new RNG(`${state.seed}::story:${state.week}`);
  
  // 40% chance of a story event occurring
  if (rng.next() > 0.40) return undefined;
  
  // Filter out events that have already occurred this run (stored in flags)
  const availableEvents = CONTENT.storyEvents.filter(e => !state.flags[`story_seen_${e.id}`]);
  
  if (availableEvents.length === 0) return undefined;
  
  // Weighted pick from available events
  const totalWeight = availableEvents.reduce((sum, e) => sum + e.weight, 0);
  let roll = rng.next() * totalWeight;
  
  for (const event of availableEvents) {
    roll -= event.weight;
    if (roll <= 0) {
      return {
        id: event.id,
        title: event.title,
        body: event.body,
        choices: event.choices.map(c => ({
          label: c.label,
          description: c.description,
          effects: c.effects
        }))
      };
    }
  }
  
  return undefined;
}

// Apply a story event choice
export function resolveStoryChoice(state: EngineState, choiceIndex: number): EngineState {
  const event = state.activeStoryEvent;
  if (!event || choiceIndex < 0 || choiceIndex >= event.choices.length) return state;
  
  const choice = event.choices[choiceIndex];
  let s = state;
  
  // Mark this event as seen
  s = { ...s, flags: { ...s.flags, [`story_seen_${event.id}`]: true } };
  
  // Add ledger entry
  s = addLedger(s, { 
    week: s.week, 
    label: `Story: ${event.title}`, 
    note: `Choice: ${choice.label}` 
  });
  
  // Apply all effects from the choice
  for (const effect of choice.effects) {
    s = resolveEffect(s, effect);
  }
  
  // Clear the active story event
  s = { ...s, activeStoryEvent: undefined };
  
  return s;
}

export function computeCoupChance(state: EngineState): number {
  const avgLoyalty = Object.values(state.loyalty).reduce((a, b) => a + b, 0) / 5;
  const low = Math.max(0, 40 - avgLoyalty);

  const base = BALANCE.coupBaseRoll;
  const risk = state.stats.coupRisk * BALANCE.coupRiskAmplifier;
  const lowBonus = low * BALANCE.lowLoyaltyCoupBonus;
  const debtBonus = Math.max(0, (state.stats.debt - BALANCE.coupDebtThreshold) / 1200) * BALANCE.coupDebtAmplifier;

  return clamp(base + risk + lowBonus + debtBonus, 0, 0.60);
}

export function rollCoup(state: EngineState): { state: EngineState; coup: boolean; chance: number; roll: number } {
  const rng = new RNG(`${state.seed}::coup:${state.week}`);
  const chance = computeCoupChance(state);
  const roll = rng.next();
  
  // Coup can only happen if chance is at least 50%
  const coup = chance >= 0.50 && roll < chance;

  const s = addLedger(state, {
    week: state.week,
    label: "Coup check",
    note: chance >= 0.50 
      ? `Chance ${(chance * 100).toFixed(1)}% | Roll ${(roll * 100).toFixed(1)}%`
      : `Chance ${(chance * 100).toFixed(1)}% (Below 50% threshold - safe)`
  });

  return { state: s, coup, chance, roll };
}

// Player actions
export function actionLoan(state: EngineState): EngineState {
  return applyDelta(state, { treasury: +BALANCE.loanAmount, debt: +BALANCE.loanAmount, coupRisk: +BALANCE.loanAddsCoupRisk }, "Action: Take loan");
}

export function actionInflate(state: EngineState): EngineState {
  let s = applyDelta(state, { treasury: +BALANCE.inflateAmount, inflation: +BALANCE.inflateAddsInflation, corruption: +BALANCE.inflateAddsCorruption }, "Action: Inflate currency");
  const ctx = { week: s.week, rulerId: s.rulerId, policyIds: s.policyIds, rngSeed: s.seed };
  const { policies, ruler } = aggregateMods(s);
  if (ruler?.hooks?.onInflate) s = ruler.hooks.onInflate(s, ctx);
  for (const p of policies) if (p.hooks?.onInflate) s = p.hooks.onInflate(s, ctx);
  return s;
}

export function actionEmbezzle(state: EngineState): EngineState {
  return applyDelta(state, { treasury: +BALANCE.embezzleAmount, corruption: +BALANCE.embezzleAddsCorruption, coupRisk: +BALANCE.embezzleAddsCoupRisk }, "Action: Embezzle");
}

export function actionBribe(state: EngineState, faction: FactionId): EngineState {
  return applyDelta(
    state,
    { treasury: -BALANCE.bribeCost, loyalty: { [faction]: +BALANCE.bribeLoyaltyGain } as any, corruption: +BALANCE.bribeAddsCorruption, coupRisk: +BALANCE.bribeAddsCoupRisk },
    `Action: Bribe (${faction})`
  );
}

export function actionInvest(state: EngineState): EngineState {
  const s = applyDelta(state, { treasury: -BALANCE.investCost, stability: +BALANCE.investStability }, "Action: Invest in infrastructure");
  return scheduleDelayed(s, {
    dueWeek: s.week + 5,
    effect: { label: "Investment payoff", delta: { treasury: +200, stability: +2 } }
  });
}
