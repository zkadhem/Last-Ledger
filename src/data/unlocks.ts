export type UnlockId = string;

export type UnlockRule =
  | { type: "runs_played"; value: number }
  | { type: "survive_weeks"; value: number }
  | { type: "reach_corruption"; value: number }
  | { type: "reach_debt"; value: number }
  | { type: "win_runs"; value: number };

export type UnlockEntry = {
  id: UnlockId;
  kind: "policy" | "ruler";
  targetId: string;
  rule: UnlockRule;
};

export const UNLOCKS: UnlockEntry[] = [
  // Common policies - unlocked early
  { id: "u_policy_paper_crown", kind: "policy", targetId: "paper_crown", rule: { type: "runs_played", value: 0 } },
  { id: "u_policy_austerity_edict", kind: "policy", targetId: "austerity_edict", rule: { type: "runs_played", value: 0 } },
  { id: "u_policy_clerks_union", kind: "policy", targetId: "clerks_union", rule: { type: "runs_played", value: 0 } },
  { id: "u_policy_merchant_guild", kind: "policy", targetId: "merchant_guild", rule: { type: "runs_played", value: 0 } },
  { id: "u_policy_peasant_militia", kind: "policy", targetId: "peasant_militia", rule: { type: "runs_played", value: 0 } },
  { id: "u_policy_open_courts", kind: "policy", targetId: "open_courts", rule: { type: "runs_played", value: 0 } },
  { id: "u_policy_border_tariffs", kind: "policy", targetId: "border_tariffs", rule: { type: "runs_played", value: 0 } },

  // Uncommon policies - unlock after some play
  { id: "u_policy_coin_debasement", kind: "policy", targetId: "coin_debasement", rule: { type: "runs_played", value: 0 } },
  { id: "u_policy_noble_patronage", kind: "policy", targetId: "noble_patronage", rule: { type: "runs_played", value: 0 } },
  { id: "u_policy_mage_college", kind: "policy", targetId: "mage_college", rule: { type: "runs_played", value: 2 } },
  { id: "u_policy_military_contracts", kind: "policy", targetId: "military_contracts", rule: { type: "runs_played", value: 2 } },
  { id: "u_policy_thieves_accord", kind: "policy", targetId: "thieves_accord", rule: { type: "survive_weeks", value: 15 } },
  { id: "u_policy_propaganda_ministry", kind: "policy", targetId: "propaganda_ministry", rule: { type: "survive_weeks", value: 20 } },
  { id: "u_policy_debt_forgiveness", kind: "policy", targetId: "debt_forgiveness", rule: { type: "reach_debt", value: 400 } },
  { id: "u_policy_festival_calendar", kind: "policy", targetId: "festival_calendar", rule: { type: "survive_weeks", value: 25 } },

  // Rare policies - unlock with achievements
  { id: "u_policy_hero_bonds", kind: "policy", targetId: "hero_bonds", rule: { type: "survive_weeks", value: 30 } },
  { id: "u_policy_iron_treasury", kind: "policy", targetId: "iron_treasury", rule: { type: "win_runs", value: 1 } },
  { id: "u_policy_secret_police", kind: "policy", targetId: "secret_police", rule: { type: "survive_weeks", value: 35 } },
  { id: "u_policy_royal_monopolies", kind: "policy", targetId: "royal_monopolies", rule: { type: "reach_debt", value: 600 } },
  { id: "u_policy_arcane_taxation", kind: "policy", targetId: "arcane_taxation", rule: { type: "survive_weeks", value: 40 } },
  { id: "u_policy_veteran_pensions", kind: "policy", targetId: "veteran_pensions", rule: { type: "runs_played", value: 5 } },
  { id: "u_policy_information_network", kind: "policy", targetId: "information_network", rule: { type: "reach_corruption", value: 40 } },

  // Legendary policies - hard to unlock
  { id: "u_policy_shadow_budget", kind: "policy", targetId: "shadow_budget", rule: { type: "reach_corruption", value: 55 } },
  { id: "u_policy_philosopher_king", kind: "policy", targetId: "philosopher_king", rule: { type: "win_runs", value: 2 } },
  { id: "u_policy_golden_age", kind: "policy", targetId: "golden_age", rule: { type: "survive_weeks", value: 45 } },
  { id: "u_policy_eternal_vigilance", kind: "policy", targetId: "eternal_vigilance", rule: { type: "win_runs", value: 3 } },
  { id: "u_policy_divine_mandate", kind: "policy", targetId: "divine_mandate", rule: { type: "survive_weeks", value: 50 } },

  // Rulers
  { id: "u_ruler_tired_regent", kind: "ruler", targetId: "ruler_tired_regent", rule: { type: "runs_played", value: 1 } },
  { id: "u_ruler_fanatical_heir", kind: "ruler", targetId: "ruler_fanatical_heir", rule: { type: "survive_weeks", value: 25 } }
];
