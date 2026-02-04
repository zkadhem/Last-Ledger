export const BALANCE = {
  weeksTotal: 52,

  // income base and scaling
  baseTaxIncome: 180,
  weeklyIncomeGrowth: 1.012, // mild growth by week (if stability supports it)

  // debt
  baseInterestRate: 0.03, // 3% weekly interest (fantasy brutal)
  debtDanger: 900,
  debtSpiral: 1400,

  // collapse thresholds
  minStability: 0,
  bankruptFloor: -200, // allow some deficit before forced end

  // requests
  requestsPerWeekMin: 2,
  requestsPerWeekMax: 4,
  requestCostWeekScaler: 1.015,

  // inflation effects
  inflationIncomePenaltyAt100: 0.35, // income reduced by up to 35%
  inflationStabilityPenaltyAt100: 0.25,

  // corruption effects
  corruptionIncomeBonusAt100: 0.25, // extra income by up to 25%
  corruptionStabilityPenaltyAt100: 0.45,

  // coup (made harder - reduced base chance and amplifiers)
  coupBaseRoll: 0.008, // base 0.8% chance (modified by coupRisk and loyalty)
  coupRiskAmplifier: 0.002, // each coupRisk point increases chance (halved)
  lowLoyaltyCoupBonus: 0.0004, // per point below 40 (halved)
  coupDebtThreshold: 800, // debt level before coup bonus kicks in
  coupDebtAmplifier: 0.008, // reduced debt contribution to coup

  // actions
  loanAmount: 220,
  loanAddsCoupRisk: 3,
  inflateAmount: 160,
  inflateAddsInflation: 6,
  inflateAddsCorruption: 2,
  embezzleAmount: 140,
  embezzleAddsCorruption: 6,
  embezzleAddsCoupRisk: 3,
  bribeCost: 90,
  bribeLoyaltyGain: 10,
  bribeAddsCorruption: 2,
  bribeAddsCoupRisk: 2,
  investCost: 160,
  investStability: 3,

  // weekly drifts
  baseStabilityDrift: -0.25,
  baseCorruptionDrift: 0.15,
  baseInflationDrift: 0.1,
  baseCoupRiskDrift: 0.15,
  
  // base loyalty decay per week (prevents idle play)
  baseLoyaltyDecay: -1.5
};
