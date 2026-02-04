import type { RequestCard } from "../types";

export const REQUESTS: RequestCard[] = [
  {
    id: "req_army_rations",
    title: "Army Rations",
    body: "Quartermasters report rot in the supply trains. Soldiers grumble. Funding preserves readiness.",
    faction: "army",
    baseCost: 120,
    urgency: 2,
    effects: {
      approve: [
        { label: "Feed the army", delta: { treasury: -120, loyalty: { army: +6 }, stability: +2 } }
      ],
      deny: [
        { label: "Hunger spreads", delta: { loyalty: { army: -10 }, stability: -4, coupRisk: +3 } }
      ],
      delay: [
        { label: "Temporary measures", delta: { loyalty: { army: -4 }, stability: -1 } }
      ]
    }
  },
  {
    id: "req_mages_ward",
    title: "Ward the City",
    body: "The College of Mages requests funds to reinforce the wards. They swear the next breach will be catastrophic.",
    faction: "mages",
    baseCost: 150,
    urgency: 3,
    effects: {
      approve: [
        { label: "Wards strengthened", delta: { treasury: -150, loyalty: { mages: +7 }, stability: +3 } }
      ],
      deny: [
        { label: "Arcane resentment", delta: { loyalty: { mages: -12 }, stability: -3 } }
      ],
      delay: [
        { label: "They will improvise", delta: { loyalty: { mages: -5 }, stability: -1 } }
      ]
    }
  },
  {
    id: "req_road_repairs",
    title: "Repair the Trade Roads",
    body: "Bridges sag and carts vanish into mud. Merchants threaten to reroute away from the capital.",
    faction: "peasants",
    baseCost: 110,
    urgency: 2,
    effects: {
      approve: [
        {
          label: "Infrastructure investment",
          delta: { treasury: -110, stability: +2, loyalty: { peasants: +3, nobles: +2 } },
          delayed: {
            inWeeks: 4,
            effect: { label: "Trade flow improves", delta: { treasury: +90, stability: +2 } }
          }
        }
      ],
      deny: [{ label: "Trade stutters", delta: { stability: -3, loyalty: { peasants: -4, nobles: -3 } } }],
      delay: [{ label: "Patches only", delta: { stability: -1, loyalty: { peasants: -2 } } }]
    }
  },
  {
    id: "req_noble_banquet",
    title: "Noble Banquet",
    body: "A banquet to maintain alliances. Lavish. Obscene. Effective.",
    faction: "nobles",
    baseCost: 140,
    urgency: 1,
    effects: {
      approve: [{ label: "Court pleased", delta: { treasury: -140, loyalty: { nobles: +10 }, corruption: +2 } }],
      deny: [{ label: "Snubbed houses", delta: { loyalty: { nobles: -12 }, coupRisk: +2 } }],
      delay: [{ label: "Postponed", delta: { loyalty: { nobles: -4 } } }]
    }
  },
  {
    id: "req_espionage_network",
    title: "Expand Espionage Network",
    body: "Spymasters want a discretionary fund. No questions. Results guaranteed (they say).",
    faction: "underworld",
    baseCost: 160,
    urgency: 2,
    effects: {
      approve: [
        {
          label: "Eyes in the dark",
          delta: { treasury: -160, corruption: +3, coupRisk: -2, loyalty: { underworld: +8 } }
        }
      ],
      deny: [{ label: "Blind spots grow", delta: { coupRisk: +4, loyalty: { underworld: -7 } } }],
      delay: [{ label: "Partial expansion", delta: { treasury: -30, corruption: +1, coupRisk: +1 } }]
    }
  },
  {
    id: "req_hero_contract",
    title: "Hero Contract: The Griffin Hunt",
    body: "A famed mercenary-company offers to slay a griffin nesting near the northern passes. They demand hazard pay.",
    faction: "peasants",
    baseCost: 180,
    urgency: 2,
    effects: {
      approve: [
        {
          label: "Hire the heroes",
          delta: { treasury: -180, stability: +2, loyalty: { peasants: +4 } },
          delayed: {
            inWeeks: 3,
            effect: { label: "Trophies and trade resume", delta: { treasury: +120, stability: +1 } }
          }
        }
      ],
      deny: [{ label: "The griffin remains", delta: { stability: -4, loyalty: { peasants: -6 } } }],
      delay: [{ label: "Negotiations drag", delta: { stability: -2, loyalty: { peasants: -2 } } }]
    }
  },
  {
    id: "req_hero_legendary_siege",
    title: "Hero Petition: Break the Siege",
    body: "A celebrated champion requests funding to relieve a besieged border-city. Glory is expensive.",
    faction: "army",
    baseCost: 240,
    urgency: 3,
    effects: {
      approve: [
        {
          label: "Fund the relief",
          delta: { treasury: -240, stability: +4, loyalty: { army: +6, peasants: +3 } },
          delayed: {
            inWeeks: 2,
            effect: { label: "Border holds", delta: { stability: +3, treasury: +80 } }
          }
        }
      ],
      deny: [{ label: "Border falters", delta: { stability: -6, loyalty: { army: -8 }, coupRisk: +4 } }],
      delay: [{ label: "Waiting costs lives", delta: { stability: -3, loyalty: { army: -3 } } }]
    }
  }
];
