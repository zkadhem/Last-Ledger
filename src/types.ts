export type FactionId = "peasants" | "nobles" | "mages" | "army" | "underworld";

export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export type RunEndReason =
  | "survived"
  | "bankrupt"
  | "collapse"
  | "coup"
  | "debt_spiral";

export type StatBlock = {
  treasury: number;
  debt: number;
  corruption: number; // 0..100
  stability: number; // 0..100
  inflation: number; // 0..100
  coupRisk: number; // 0..100 (rolled weekly)
};

export type FactionState = Record<FactionId, number>; // 0..100 loyalty

export type LedgerLine = {
  week: number;
  label: string;
  deltaTreasury?: number;
  deltaDebt?: number;
  deltaCorruption?: number;
  deltaStability?: number;
  deltaInflation?: number;
  deltaCoupRisk?: number;
  note?: string;
};

export type HistoryPoint = {
  week: number;
  treasury: number;
  debt: number;
  corruption: number;
  stability: number;
  inflation: number;
  coupRisk: number;
};

export type GameHookCtx = {
  week: number;
  rulerId: string;
  policyIds: string[];
  rngSeed: string;
};

export type Policy = {
  id: string;
  name: string;
  rarity: Rarity;
  description: string;
  tags: string[];
  // passive modifiers (percent as decimals, e.g. +0.1 = +10%)
  mods?: Partial<{
    taxRate: number;
    expensePressure: number; // more requests / larger asks
    stabilityDrift: number; // weekly stability change
    corruptionDrift: number;
    inflationDrift: number;
    coupRiskDrift: number;
    loanInterest: number; // multiplier to interest rate
    incomeFromCorruption: number; // portion of corruption translated to income
    loyaltyDrift: Partial<Record<FactionId, number>>; // per week
  }>;

  hooks?: Partial<{
    onWeekStart: (s: EngineState, ctx: GameHookCtx) => EngineState;
    onIncome: (s: EngineState, ctx: GameHookCtx, baseIncome: number) => { state: EngineState; income: number };
    onApproveRequest: (s: EngineState, ctx: GameHookCtx, requestId: string) => EngineState;
    onDenyRequest: (s: EngineState, ctx: GameHookCtx, requestId: string) => EngineState;
    onInflate: (s: EngineState, ctx: GameHookCtx) => EngineState;
  }>;
};

export type Ruler = {
  id: string;
  name: string;
  epithet: string;
  description: string;
  starting?: Partial<{
    treasury: number;
    debt: number;
    corruption: number;
    stability: number;
    inflation: number;
    coupRisk: number;
    loyalty: Partial<Record<FactionId, number>>;
  }>;
  mods?: Policy["mods"];
  hooks?: Policy["hooks"];
};

export type RequestOption = "approve" | "deny" | "delay";

export type RequestCard = {
  id: string;
  title: string;
  body: string;
  faction?: FactionId;
  // cost is computed at generation time; allow scaling by week.
  baseCost: number;
  urgency: number; // 1..3; if delayed, worsens
  // Apply effects on decision
  effects: {
    approve: EffectSpec[];
    deny: EffectSpec[];
    delay: EffectSpec[];
  };
};

export type EventCard = {
  id: string;
  title: string;
  body: string;
  weight: number;
  effects: EffectSpec[];
};

export type EffectSpec = {
  label: string;
  // deltas can be flat numbers
  delta?: Partial<{
    treasury: number;
    debt: number;
    corruption: number;
    stability: number;
    inflation: number;
    coupRisk: number;
    loyalty: Partial<Record<FactionId, number>>;
  }>;
  // or schedule a delayed effect
  delayed?: {
    inWeeks: number;
    effect: EffectSpec;
  };
};

export type PendingEffect = {
  dueWeek: number;
  effect: EffectSpec;
};

// Story event choice type for interactive events
export type StoryEventChoice = {
  label: string;
  description: string;
  effects: EffectSpec[];
};

export type ActiveStoryEvent = {
  id: string;
  title: string;
  body: string;
  choices: StoryEventChoice[];
};

export type EngineState = {
  week: number;
  weeksTotal: number;
  seed: string;

  rulerId: string;
  policyIds: string[];

  stats: StatBlock;
  loyalty: FactionState;

  requestQueue: GeneratedRequest[];
  currentEvent?: EventCard;
  activeStoryEvent?: ActiveStoryEvent;

  pending: PendingEffect[];
  ledger: LedgerLine[];
  history: HistoryPoint[];

  flags: Record<string, boolean>;
};

export type GeneratedRequest = {
  instanceId: string; // unique per spawn
  baseId: string;
  title: string;
  body: string;
  faction?: FactionId;
  cost: number;
  urgency: number;
  age: number; // weeks since appeared
  effects: RequestCard["effects"];
};
