import type { Policy } from "../types";

export const POLICIES: Policy[] = [
  // ============ COMMON POLICIES ============
  {
    id: "paper_crown",
    name: "Paper Crown",
    rarity: "common",
    tags: ["tax", "loyalty", "pressure"],
    description: "+50% peasant tax yield. Peasants lose 1 loyalty each week.",
    mods: {
      taxRate: 0.5,
      loyaltyDrift: { peasants: -1 }
    }
  },
  {
    id: "austerity_edict",
    name: "Austerity Edict",
    rarity: "common",
    tags: ["stability", "loyalty"],
    description: "Requests cost -10%. Nobles and Army lose 1 loyalty weekly.",
    mods: {
      expensePressure: -0.1,
      loyaltyDrift: { nobles: -1, army: -1 },
      stabilityDrift: +0.25
    }
  },
  {
    id: "clerks_union",
    name: "Clerks' Union",
    rarity: "common",
    tags: ["stability", "anti-corruption"],
    description: "Corruption drifts -0.6/week. If corruption < 10, stability +0.4/week.",
    mods: { corruptionDrift: -0.6 },
    hooks: {
      onWeekStart: (s) => {
        if (s.stats.corruption < 10) {
          return { ...s, stats: { ...s.stats, stability: Math.min(100, s.stats.stability + 0.4) } };
        }
        return s;
      }
    }
  },
  {
    id: "merchant_guild",
    name: "Merchant Guild Charter",
    rarity: "common",
    tags: ["income", "stability"],
    description: "+10% tax income. Stability drifts +0.3/week from economic confidence.",
    mods: {
      taxRate: 0.1,
      stabilityDrift: 0.3
    }
  },
  {
    id: "peasant_militia",
    name: "Peasant Militia",
    rarity: "common",
    tags: ["army", "peasants", "loyalty"],
    description: "Peasants +2 loyalty/week. Army -1 loyalty/week (professional soldiers resent amateurs).",
    mods: {
      loyaltyDrift: { peasants: 2, army: -1 }
    }
  },
  {
    id: "open_courts",
    name: "Open Courts",
    rarity: "common",
    tags: ["stability", "corruption"],
    description: "Corruption -0.4/week. Stability +0.2/week. Nobles -1 loyalty (they hate transparency).",
    mods: {
      corruptionDrift: -0.4,
      stabilityDrift: 0.2,
      loyaltyDrift: { nobles: -1 }
    }
  },
  {
    id: "border_tariffs",
    name: "Border Tariffs",
    rarity: "common",
    tags: ["income", "inflation"],
    description: "+15% tax income. Inflation +0.3/week from trade friction.",
    mods: {
      taxRate: 0.15,
      inflationDrift: 0.3
    }
  },

  // ============ UNCOMMON POLICIES ============
  {
    id: "coin_debasement",
    name: "Coin Debasement",
    rarity: "uncommon",
    tags: ["inflation", "income", "risk"],
    description: "Tax income +20%, but inflation drifts +1.0 per week.",
    mods: { taxRate: 0.2, inflationDrift: 1.0 }
  },
  {
    id: "noble_patronage",
    name: "Noble Patronage",
    rarity: "uncommon",
    tags: ["nobles", "stability", "corruption"],
    description: "Nobles +2 loyalty/week. Corruption +0.5/week. Peasants -1 loyalty/week.",
    mods: {
      loyaltyDrift: { nobles: 2, peasants: -1 },
      corruptionDrift: 0.5
    }
  },
  {
    id: "mage_college",
    name: "Mage College Sponsorship",
    rarity: "uncommon",
    tags: ["mages", "stability", "cost"],
    description: "Mages +3 loyalty/week. Stability +0.4/week. Treasury -25/week for funding.",
    mods: {
      loyaltyDrift: { mages: 3 },
      stabilityDrift: 0.4
    },
    hooks: {
      onWeekStart: (s) => {
        return { ...s, stats: { ...s.stats, treasury: s.stats.treasury - 25 } };
      }
    }
  },
  {
    id: "military_contracts",
    name: "Military Contracts",
    rarity: "uncommon",
    tags: ["army", "income", "corruption"],
    description: "Army +2 loyalty/week. +8% income from arms trade. Corruption +0.3/week.",
    mods: {
      loyaltyDrift: { army: 2 },
      taxRate: 0.08,
      corruptionDrift: 0.3
    }
  },
  {
    id: "thieves_accord",
    name: "Thieves' Accord",
    rarity: "uncommon",
    tags: ["underworld", "corruption", "stability"],
    description: "Underworld +3 loyalty/week. Coup risk -0.5/week. Corruption +0.8/week.",
    mods: {
      loyaltyDrift: { underworld: 3 },
      coupRiskDrift: -0.5,
      corruptionDrift: 0.8
    }
  },
  {
    id: "propaganda_ministry",
    name: "Propaganda Ministry",
    rarity: "uncommon",
    tags: ["stability", "loyalty", "cost"],
    description: "All factions +1 loyalty/week. Stability +0.5/week. Treasury -40/week.",
    mods: {
      loyaltyDrift: { peasants: 1, nobles: 1, mages: 1, army: 1, underworld: 1 },
      stabilityDrift: 0.5
    },
    hooks: {
      onWeekStart: (s) => {
        return { ...s, stats: { ...s.stats, treasury: s.stats.treasury - 40 } };
      }
    }
  },
  {
    id: "debt_forgiveness",
    name: "Debt Forgiveness Act",
    rarity: "uncommon",
    tags: ["debt", "loyalty", "peasants"],
    description: "Peasants +3 loyalty/week. Nobles -2 loyalty/week. Debt interest -20%.",
    mods: {
      loyaltyDrift: { peasants: 3, nobles: -2 },
      loanInterest: -0.2
    }
  },
  {
    id: "festival_calendar",
    name: "Festival Calendar",
    rarity: "uncommon",
    tags: ["stability", "cost", "loyalty"],
    description: "Stability +0.8/week. All factions +0.5 loyalty/week. Treasury -30/week.",
    mods: {
      stabilityDrift: 0.8,
      loyaltyDrift: { peasants: 0.5, nobles: 0.5, mages: 0.5, army: 0.5, underworld: 0.5 }
    },
    hooks: {
      onWeekStart: (s) => {
        return { ...s, stats: { ...s.stats, treasury: s.stats.treasury - 30 } };
      }
    }
  },

  // ============ RARE POLICIES ============
  {
    id: "hero_bonds",
    name: "Hero Bonds",
    rarity: "rare",
    tags: ["debt", "heroes", "scaling"],
    description: "Hero funding shifts to debt. Approved 'Hero' requests add +35% more debt, but +10 stability now.",
    hooks: {
      onApproveRequest: (s, _ctx, requestId) => {
        if (!requestId.startsWith("req_hero_")) return s;
        const addDebt = Math.round(0.35 * 100);
        return {
          ...s,
          stats: {
            ...s.stats,
            debt: s.stats.debt + addDebt,
            stability: Math.min(100, s.stats.stability + 10)
          }
        };
      }
    }
  },
  {
    id: "iron_treasury",
    name: "Iron Treasury",
    rarity: "rare",
    tags: ["stability", "income", "anti-corruption"],
    description: "Corruption -1.0/week. Income +15%. Inflation -0.5/week. Stability +0.3/week.",
    mods: {
      corruptionDrift: -1.0,
      taxRate: 0.15,
      inflationDrift: -0.5,
      stabilityDrift: 0.3
    }
  },
  {
    id: "secret_police",
    name: "Secret Police",
    rarity: "rare",
    tags: ["coup", "loyalty", "stability"],
    description: "Coup risk -1.0/week. Stability +0.5/week. All factions -0.5 loyalty/week (fear spreads).",
    mods: {
      coupRiskDrift: -1.0,
      stabilityDrift: 0.5,
      loyaltyDrift: { peasants: -0.5, nobles: -0.5, mages: -0.5, army: -0.5, underworld: -0.5 }
    }
  },
  {
    id: "royal_monopolies",
    name: "Royal Monopolies",
    rarity: "rare",
    tags: ["income", "corruption", "nobles"],
    description: "+30% tax income. Corruption +0.6/week. Nobles +2 loyalty (they get the contracts).",
    mods: {
      taxRate: 0.3,
      corruptionDrift: 0.6,
      loyaltyDrift: { nobles: 2 }
    }
  },
  {
    id: "arcane_taxation",
    name: "Arcane Taxation",
    rarity: "rare",
    tags: ["mages", "income", "inflation"],
    description: "+25% income. Inflation -0.8/week (magical stabilization). Mages -2 loyalty/week.",
    mods: {
      taxRate: 0.25,
      inflationDrift: -0.8,
      loyaltyDrift: { mages: -2 }
    }
  },
  {
    id: "veteran_pensions",
    name: "Veteran Pensions",
    rarity: "rare",
    tags: ["army", "stability", "cost"],
    description: "Army +4 loyalty/week. Stability +0.6/week. Coup risk -0.8/week. Treasury -50/week.",
    mods: {
      loyaltyDrift: { army: 4 },
      stabilityDrift: 0.6,
      coupRiskDrift: -0.8
    },
    hooks: {
      onWeekStart: (s) => {
        return { ...s, stats: { ...s.stats, treasury: s.stats.treasury - 50 } };
      }
    }
  },
  {
    id: "information_network",
    name: "Information Network",
    rarity: "rare",
    tags: ["underworld", "coup", "cost"],
    description: "Underworld +2 loyalty/week. Coup risk -1.2/week. You learn of plots early. Treasury -35/week.",
    mods: {
      loyaltyDrift: { underworld: 2 },
      coupRiskDrift: -1.2
    },
    hooks: {
      onWeekStart: (s) => {
        return { ...s, stats: { ...s.stats, treasury: s.stats.treasury - 35 } };
      }
    }
  },

  // ============ LEGENDARY POLICIES ============
  {
    id: "shadow_budget",
    name: "Shadow Budget",
    rarity: "legendary",
    tags: ["covert", "coup", "corruption"],
    description: "Weekly hidden income (+3% of treasury). Each use of 'Bribe' increases coup risk +4.",
    hooks: {
      onIncome: (s, _ctx, baseIncome) => {
        const bonus = Math.floor(Math.max(0, s.stats.treasury) * 0.03);
        return { state: s, income: baseIncome + bonus };
      }
    }
  },
  {
    id: "philosopher_king",
    name: "Philosopher King",
    rarity: "legendary",
    tags: ["stability", "mages", "wisdom"],
    description: "Stability +1.5/week. Mages +3 loyalty/week. Corruption -0.8/week. Inflation -0.5/week.",
    mods: {
      stabilityDrift: 1.5,
      loyaltyDrift: { mages: 3 },
      corruptionDrift: -0.8,
      inflationDrift: -0.5
    }
  },
  {
    id: "golden_age",
    name: "Golden Age Decree",
    rarity: "legendary",
    tags: ["income", "stability", "all"],
    description: "+40% income. All factions +1.5 loyalty/week. Stability +1.0/week. Treasury -80/week to maintain.",
    mods: {
      taxRate: 0.4,
      loyaltyDrift: { peasants: 1.5, nobles: 1.5, mages: 1.5, army: 1.5, underworld: 1.5 },
      stabilityDrift: 1.0
    },
    hooks: {
      onWeekStart: (s) => {
        return { ...s, stats: { ...s.stats, treasury: s.stats.treasury - 80 } };
      }
    }
  },
  {
    id: "eternal_vigilance",
    name: "Eternal Vigilance",
    rarity: "legendary",
    tags: ["coup", "army", "stability"],
    description: "Coup risk -2.0/week. Army +3 loyalty/week. Stability +0.8/week. Treasury -60/week.",
    mods: {
      coupRiskDrift: -2.0,
      loyaltyDrift: { army: 3 },
      stabilityDrift: 0.8
    },
    hooks: {
      onWeekStart: (s) => {
        return { ...s, stats: { ...s.stats, treasury: s.stats.treasury - 60 } };
      }
    }
  },
  {
    id: "divine_mandate",
    name: "Divine Mandate",
    rarity: "legendary",
    tags: ["stability", "loyalty", "anti-coup"],
    description: "Coup risk -1.5/week. Stability +1.2/week. Peasants +2 loyalty. Corruption +0.3/week (temple tithes).",
    mods: {
      coupRiskDrift: -1.5,
      stabilityDrift: 1.2,
      loyaltyDrift: { peasants: 2 },
      corruptionDrift: 0.3
    }
  }
];
