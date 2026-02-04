import type { RequestCard } from "../types";

export const REQUESTS: RequestCard[] = [
  // ========== ARMY FACTION ==========
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
  },
  {
    id: "req_veteran_pensions",
    title: "Veterans' Pensions",
    body: "Old soldiers demand their promised pensions. They speak of organizing protests.",
    faction: "army",
    baseCost: 95,
    urgency: 2,
    effects: {
      approve: [
        { label: "Honor the debt", delta: { treasury: -95, loyalty: { army: +8, peasants: +3 }, stability: +2 } }
      ],
      deny: [
        { label: "Betrayed veterans", delta: { loyalty: { army: -12, peasants: -4 }, coupRisk: +5, stability: -3 } }
      ],
      delay: [
        { label: "Promise review", delta: { loyalty: { army: -5 }, stability: -1 } }
      ]
    }
  },
  {
    id: "req_cavalry_expansion",
    title: "Cavalry Expansion",
    body: "The generals want to breed war horses and train new cavalry units. An expensive but prestigious project.",
    faction: "army",
    baseCost: 200,
    urgency: 1,
    effects: {
      approve: [
        { 
          label: "Fund the cavalry", 
          delta: { treasury: -200, loyalty: { army: +10, nobles: +4 }, coupRisk: -3 },
          delayed: { inWeeks: 6, effect: { label: "Cavalry ready", delta: { stability: +5 } } }
        }
      ],
      deny: [{ label: "Infantry must suffice", delta: { loyalty: { army: -6 }, coupRisk: +2 } }],
      delay: [{ label: "Study the matter", delta: { loyalty: { army: -2 } } }]
    }
  },
  {
    id: "req_border_fortifications",
    title: "Border Fortifications",
    body: "Engineers propose a chain of watchtowers along the northern border. Expensive but strategically sound.",
    faction: "army",
    baseCost: 180,
    urgency: 2,
    effects: {
      approve: [
        { 
          label: "Build the towers", 
          delta: { treasury: -180, stability: +3, loyalty: { army: +5, peasants: +2 } },
          delayed: { inWeeks: 5, effect: { label: "Border secured", delta: { stability: +4, coupRisk: -2 } } }
        }
      ],
      deny: [{ label: "Border remains porous", delta: { stability: -2, loyalty: { army: -5, peasants: -3 } } }],
      delay: [{ label: "Survey first", delta: { treasury: -20, loyalty: { army: -2 } } }]
    }
  },
  {
    id: "req_deserter_amnesty",
    title: "Deserter Amnesty",
    body: "Hundreds of deserters hide in the wilderness. The army wants funds to hunt them, but some propose amnesty instead.",
    faction: "army",
    baseCost: 70,
    urgency: 1,
    effects: {
      approve: [
        { label: "Grant amnesty", delta: { treasury: -70, loyalty: { army: -4, peasants: +6 }, stability: +2, corruption: +2 } }
      ],
      deny: [{ label: "Hunt them down", delta: { treasury: -50, loyalty: { army: +5, peasants: -5 }, stability: -1 } }],
      delay: [{ label: "Case-by-case review", delta: { loyalty: { army: -2 }, stability: -1 } }]
    }
  },

  // ========== MAGES FACTION ==========
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
    id: "req_arcane_library",
    title: "Arcane Library Expansion",
    body: "The Archmage requests funds to acquire rare tomes from distant lands. Knowledge is power, they say.",
    faction: "mages",
    baseCost: 130,
    urgency: 1,
    effects: {
      approve: [
        { 
          label: "Fund the collection", 
          delta: { treasury: -130, loyalty: { mages: +8 }, corruption: -2 },
          delayed: { inWeeks: 4, effect: { label: "Magical discovery", delta: { stability: +3, loyalty: { mages: +3 } } } }
        }
      ],
      deny: [{ label: "Knowledge denied", delta: { loyalty: { mages: -8 } } }],
      delay: [{ label: "Budget review needed", delta: { loyalty: { mages: -3 } } }]
    }
  },
  {
    id: "req_monster_research",
    title: "Monster Research Program",
    body: "Mages want to study captured creatures. The army worries about containment. The peasants are terrified.",
    faction: "mages",
    baseCost: 160,
    urgency: 2,
    effects: {
      approve: [
        { 
          label: "Approve research", 
          delta: { treasury: -160, loyalty: { mages: +10, army: -3, peasants: -4 }, stability: -2 },
          delayed: { inWeeks: 5, effect: { label: "Research breakthrough", delta: { treasury: +100, stability: +4 } } }
        }
      ],
      deny: [{ label: "Too dangerous", delta: { loyalty: { mages: -7, army: +2, peasants: +3 } } }],
      delay: [{ label: "Safety review", delta: { loyalty: { mages: -3 }, stability: -1 } }]
    }
  },
  {
    id: "req_healing_fountain",
    title: "Public Healing Fountain",
    body: "The mages propose enchanting a fountain with healing waters. Costly magic, but the people would love it.",
    faction: "mages",
    baseCost: 175,
    urgency: 1,
    effects: {
      approve: [
        { label: "Enchant the fountain", delta: { treasury: -175, loyalty: { mages: +6, peasants: +10 }, stability: +4 } }
      ],
      deny: [{ label: "Frivolous expense", delta: { loyalty: { mages: -5, peasants: -6 } } }],
      delay: [{ label: "Study feasibility", delta: { loyalty: { mages: -2, peasants: -3 } } }]
    }
  },
  {
    id: "req_weather_control",
    title: "Weather Control Ritual",
    body: "A coven of weather-mages offers to end the drought—for a price. Farmers are desperate.",
    faction: "mages",
    baseCost: 200,
    urgency: 3,
    effects: {
      approve: [
        { 
          label: "Hire the coven", 
          delta: { treasury: -200, loyalty: { mages: +5, peasants: +8 }, stability: +3 },
          delayed: { inWeeks: 2, effect: { label: "Rains return", delta: { treasury: +80, stability: +2 } } }
        }
      ],
      deny: [{ label: "Nature takes its course", delta: { loyalty: { peasants: -10 }, stability: -4 } }],
      delay: [{ label: "Verify their claims", delta: { loyalty: { mages: -3, peasants: -4 } } }]
    }
  },
  {
    id: "req_rogue_mage_bounty",
    title: "Rogue Mage Bounty",
    body: "A dangerous sorcerer terrorizes the countryside. The College wants funds to hunt them down.",
    faction: "mages",
    baseCost: 140,
    urgency: 3,
    effects: {
      approve: [
        { 
          label: "Post the bounty", 
          delta: { treasury: -140, loyalty: { mages: +4, peasants: +5 }, stability: +2 },
          delayed: { inWeeks: 3, effect: { label: "Rogue captured", delta: { stability: +3, coupRisk: -2 } } }
        }
      ],
      deny: [{ label: "Ignore the threat", delta: { stability: -5, loyalty: { peasants: -8 }, coupRisk: +3 } }],
      delay: [{ label: "Investigate first", delta: { stability: -2, loyalty: { peasants: -3 } } }]
    }
  },

  // ========== NOBLES FACTION ==========
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
    id: "req_land_dispute",
    title: "Noble Land Dispute",
    body: "Two houses feud over ancestral lands. Both expect you to side with them. Gold could... smooth things.",
    faction: "nobles",
    baseCost: 100,
    urgency: 2,
    effects: {
      approve: [
        { label: "Bribe both sides", delta: { treasury: -100, loyalty: { nobles: +6 }, corruption: +5, stability: +2 } }
      ],
      deny: [{ label: "Let them fight", delta: { loyalty: { nobles: -8 }, stability: -4, coupRisk: +3 } }],
      delay: [{ label: "Legal proceedings", delta: { treasury: -30, loyalty: { nobles: -3 }, stability: -1 } }]
    }
  },
  {
    id: "req_noble_wedding",
    title: "Royal Wedding Sponsorship",
    body: "A powerful house seeks crown sponsorship for a strategic marriage. Splendid opportunity for alliance.",
    faction: "nobles",
    baseCost: 180,
    urgency: 1,
    effects: {
      approve: [
        { 
          label: "Sponsor the wedding", 
          delta: { treasury: -180, loyalty: { nobles: +12 }, corruption: +3 },
          delayed: { inWeeks: 3, effect: { label: "Alliance strengthens", delta: { stability: +4, coupRisk: -3 } } }
        }
      ],
      deny: [{ label: "Not our concern", delta: { loyalty: { nobles: -10 }, coupRisk: +2 } }],
      delay: [{ label: "Review the match", delta: { loyalty: { nobles: -4 } } }]
    }
  },
  {
    id: "req_tournament",
    title: "Grand Tournament",
    body: "The nobles clamor for a tournament. Knights, jousting, feasting—expensive but prestigious.",
    faction: "nobles",
    baseCost: 220,
    urgency: 1,
    effects: {
      approve: [
        { label: "Host the tournament", delta: { treasury: -220, loyalty: { nobles: +10, army: +6, peasants: +4 }, stability: +3 } }
      ],
      deny: [{ label: "No time for games", delta: { loyalty: { nobles: -8, army: -3 } } }],
      delay: [{ label: "Next season perhaps", delta: { loyalty: { nobles: -3 } } }]
    }
  },
  {
    id: "req_noble_tax_exemption",
    title: "Noble Tax Exemption",
    body: "Several houses petition for tax relief, citing ancient privileges. Granting it would anger the peasants.",
    faction: "nobles",
    baseCost: 0,
    urgency: 2,
    effects: {
      approve: [
        { label: "Grant exemptions", delta: { treasury: -60, loyalty: { nobles: +8, peasants: -8 }, inflation: +3, corruption: +4 } }
      ],
      deny: [{ label: "All must pay", delta: { loyalty: { nobles: -10, peasants: +5 }, coupRisk: +3 } }],
      delay: [{ label: "Review the records", delta: { loyalty: { nobles: -4 }, treasury: -15 } }]
    }
  },
  {
    id: "req_heraldry_commission",
    title: "Royal Heraldry Commission",
    body: "Nobles want an official registry of coats of arms. Petty? Perhaps. But they care deeply.",
    faction: "nobles",
    baseCost: 50,
    urgency: 1,
    effects: {
      approve: [
        { label: "Establish the commission", delta: { treasury: -50, loyalty: { nobles: +7 }, corruption: +2, stability: +1 } }
      ],
      deny: [{ label: "Frivolous waste", delta: { loyalty: { nobles: -5 } } }],
      delay: [{ label: "Consider it", delta: { loyalty: { nobles: -2 } } }]
    }
  },

  // ========== PEASANTS FACTION ==========
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
    id: "req_grain_reserve",
    title: "Grain Reserve Emergency",
    body: "The granaries are nearly empty. A bad harvest means famine without emergency purchases.",
    faction: "peasants",
    baseCost: 150,
    urgency: 3,
    effects: {
      approve: [
        { label: "Buy emergency grain", delta: { treasury: -150, loyalty: { peasants: +10 }, stability: +4 } }
      ],
      deny: [{ label: "Let them starve", delta: { loyalty: { peasants: -15 }, stability: -8, coupRisk: +6 } }],
      delay: [{ label: "Ration what remains", delta: { loyalty: { peasants: -8 }, stability: -3 } }]
    }
  },
  {
    id: "req_plague_response",
    title: "Plague Outbreak",
    body: "A sickness spreads through the slums. Quarantine is cheap. Treatment is not. The dead won't pay taxes.",
    faction: "peasants",
    baseCost: 120,
    urgency: 3,
    effects: {
      approve: [
        { 
          label: "Fund treatment", 
          delta: { treasury: -120, loyalty: { peasants: +8, mages: +3 }, stability: +3 },
          delayed: { inWeeks: 2, effect: { label: "Plague contained", delta: { stability: +2 } } }
        }
      ],
      deny: [{ label: "Quarantine only", delta: { loyalty: { peasants: -12 }, stability: -5 } }],
      delay: [{ label: "Assess the spread", delta: { loyalty: { peasants: -6 }, stability: -2 } }]
    }
  },
  {
    id: "req_well_digging",
    title: "New Wells Needed",
    body: "Several villages share a single, fouled well. Disease threatens. Clean water costs money.",
    faction: "peasants",
    baseCost: 80,
    urgency: 2,
    effects: {
      approve: [
        { label: "Dig the wells", delta: { treasury: -80, loyalty: { peasants: +7 }, stability: +2 } }
      ],
      deny: [{ label: "They can manage", delta: { loyalty: { peasants: -8 }, stability: -3 } }],
      delay: [{ label: "Survey the area", delta: { treasury: -10, loyalty: { peasants: -3 } } }]
    }
  },
  {
    id: "req_tax_collector_corruption",
    title: "Corrupt Tax Collectors",
    body: "Peasants claim tax collectors demand bribes. Investigating costs money and angers officials.",
    faction: "peasants",
    baseCost: 60,
    urgency: 2,
    effects: {
      approve: [
        { label: "Root out corruption", delta: { treasury: -60, loyalty: { peasants: +8 }, corruption: -5, stability: +2 } }
      ],
      deny: [{ label: "Collectors stay", delta: { loyalty: { peasants: -10 }, corruption: +3, coupRisk: +2 } }],
      delay: [{ label: "Quiet inquiry", delta: { treasury: -20, loyalty: { peasants: -4 }, corruption: +1 } }]
    }
  },
  {
    id: "req_harvest_festival",
    title: "Harvest Festival",
    body: "The farmers want crown support for the traditional harvest festival. Good for morale, they say.",
    faction: "peasants",
    baseCost: 70,
    urgency: 1,
    effects: {
      approve: [
        { label: "Celebrate the harvest", delta: { treasury: -70, loyalty: { peasants: +8 }, stability: +3 } }
      ],
      deny: [{ label: "No frivolities", delta: { loyalty: { peasants: -5 }, stability: -1 } }],
      delay: [{ label: "Reduced celebration", delta: { treasury: -25, loyalty: { peasants: +2 } } }]
    }
  },

  // ========== UNDERWORLD FACTION ==========
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
    id: "req_thieves_guild_tribute",
    title: "Thieves' Guild Tribute",
    body: "The guild offers 'protection' for the market district. Refuse and they'll demonstrate why it's needed.",
    faction: "underworld",
    baseCost: 90,
    urgency: 2,
    effects: {
      approve: [
        { label: "Pay the tribute", delta: { treasury: -90, loyalty: { underworld: +10 }, corruption: +5, stability: +2 } }
      ],
      deny: [{ label: "Crack down instead", delta: { treasury: -50, loyalty: { underworld: -12 }, stability: -4 } }],
      delay: [{ label: "Negotiate terms", delta: { loyalty: { underworld: -4 }, corruption: +2 } }]
    }
  },
  {
    id: "req_smuggler_pardon",
    title: "Smuggler's Pardon",
    body: "A notorious smuggler offers information on noble conspiracies in exchange for amnesty.",
    faction: "underworld",
    baseCost: 40,
    urgency: 2,
    effects: {
      approve: [
        { label: "Grant the pardon", delta: { treasury: -40, loyalty: { underworld: +6, nobles: -5 }, coupRisk: -4, corruption: +3 } }
      ],
      deny: [{ label: "Justice prevails", delta: { loyalty: { underworld: -8, nobles: +3 } } }],
      delay: [{ label: "Interrogate first", delta: { loyalty: { underworld: -5 }, corruption: +2 } }]
    }
  },
  {
    id: "req_assassin_contract",
    title: "Unfortunate Accident",
    body: "A certain troublesome noble could... cease to be troublesome. Plausible deniability included in the fee.",
    faction: "underworld",
    baseCost: 200,
    urgency: 1,
    effects: {
      approve: [
        { 
          label: "Approve the contract", 
          delta: { treasury: -200, loyalty: { underworld: +8, nobles: -6 }, coupRisk: -5, corruption: +8 },
          delayed: { inWeeks: 2, effect: { label: "Problem solved", delta: { stability: +3 } } }
        }
      ],
      deny: [{ label: "We are not murderers", delta: { loyalty: { underworld: -6, nobles: +4 } } }],
      delay: [{ label: "Reconsider options", delta: { loyalty: { underworld: -3 } } }]
    }
  },
  {
    id: "req_prison_reform",
    title: "Prison Reform",
    body: "The dungeons overflow. Build more cells, or release minor offenders into guild 'rehabilitation programs'.",
    faction: "underworld",
    baseCost: 100,
    urgency: 2,
    effects: {
      approve: [
        { label: "Build more cells", delta: { treasury: -100, stability: +3, loyalty: { nobles: +3, peasants: +2 } } }
      ],
      deny: [{ label: "Guild program", delta: { treasury: -30, loyalty: { underworld: +10, nobles: -4 }, corruption: +5 } }],
      delay: [{ label: "Study the issue", delta: { stability: -2, treasury: -20 } }]
    }
  },
  {
    id: "req_black_market_intel",
    title: "Black Market Intelligence",
    body: "Informants offer details on enemy troop movements. The price is high, and the source... questionable.",
    faction: "underworld",
    baseCost: 130,
    urgency: 2,
    effects: {
      approve: [
        { 
          label: "Buy the intel", 
          delta: { treasury: -130, loyalty: { underworld: +6, army: +4 }, corruption: +4 },
          delayed: { inWeeks: 3, effect: { label: "Intel proves valuable", delta: { stability: +4, coupRisk: -2 } } }
        }
      ],
      deny: [{ label: "Don't trust criminals", delta: { loyalty: { underworld: -5 } } }],
      delay: [{ label: "Verify first", delta: { treasury: -30, loyalty: { underworld: -2 } } }]
    }
  },

  // ========== MULTI-FACTION / GENERAL ==========
  {
    id: "req_foreign_ambassador",
    title: "Foreign Ambassador's Request",
    body: "A neighboring kingdom seeks a trade agreement. The terms favor them, but refusing might mean war.",
    baseCost: 80,
    urgency: 2,
    effects: {
      approve: [
        { 
          label: "Sign the agreement", 
          delta: { treasury: -80, stability: +4 },
          delayed: { inWeeks: 4, effect: { label: "Trade begins", delta: { treasury: +150 } } }
        }
      ],
      deny: [{ label: "Reject their terms", delta: { stability: -3, coupRisk: +2 } }],
      delay: [{ label: "Counter-propose", delta: { treasury: -20 } }]
    }
  },
  {
    id: "req_temple_restoration",
    title: "Temple Restoration",
    body: "The ancient temple crumbles. Restoring it would please all factions who worship there.",
    baseCost: 160,
    urgency: 1,
    effects: {
      approve: [
        { label: "Restore the temple", delta: { treasury: -160, loyalty: { peasants: +4, nobles: +4, mages: +4 }, stability: +3 } }
      ],
      deny: [{ label: "Let it crumble", delta: { loyalty: { peasants: -3, nobles: -3 }, stability: -2 } }],
      delay: [{ label: "Partial repairs", delta: { treasury: -50, loyalty: { peasants: +1, nobles: +1 } } }]
    }
  },
  {
    id: "req_mint_new_coins",
    title: "Mint New Currency",
    body: "The treasury proposes minting new coins. Pure metal or debased? Each has consequences.",
    baseCost: 100,
    urgency: 2,
    effects: {
      approve: [
        { label: "Pure silver coins", delta: { treasury: -100, inflation: -5, loyalty: { nobles: +4, peasants: +3 } } }
      ],
      deny: [{ label: "Debased coins", delta: { treasury: +60, inflation: +8, corruption: +4, loyalty: { peasants: -6 } } }],
      delay: [{ label: "Study the matter", delta: { treasury: -20, inflation: +2 } }]
    }
  },
  {
    id: "req_census",
    title: "Kingdom Census",
    body: "Officials propose a complete census. Useful for taxation, but the peasants fear it's a prelude to conscription.",
    baseCost: 90,
    urgency: 1,
    effects: {
      approve: [
        { 
          label: "Conduct the census", 
          delta: { treasury: -90, loyalty: { peasants: -4 } },
          delayed: { inWeeks: 4, effect: { label: "Census complete", delta: { treasury: +120, corruption: -3 } } }
        }
      ],
      deny: [{ label: "Privacy preserved", delta: { loyalty: { peasants: +3 }, corruption: +2 } }],
      delay: [{ label: "Voluntary census", delta: { treasury: -40, loyalty: { peasants: +1 } } }]
    }
  },
  {
    id: "req_bridge_toll",
    title: "Bridge Toll Dispute",
    body: "A lord demands toll rights for a crucial bridge. The merchants protest. Both sides expect your support.",
    baseCost: 60,
    urgency: 2,
    effects: {
      approve: [
        { label: "Grant toll rights", delta: { treasury: -60, loyalty: { nobles: +8, peasants: -6 }, inflation: +2 } }
      ],
      deny: [{ label: "Bridge stays free", delta: { loyalty: { nobles: -8, peasants: +6 } } }],
      delay: [{ label: "Compromise toll", delta: { treasury: +20, loyalty: { nobles: -2, peasants: -2 } } }]
    }
  },
  {
    id: "req_refugee_crisis",
    title: "Refugee Crisis",
    body: "War in neighboring lands sends thousands to your borders. Shelter them or turn them away?",
    baseCost: 140,
    urgency: 3,
    effects: {
      approve: [
        { 
          label: "Accept refugees", 
          delta: { treasury: -140, loyalty: { peasants: -3 }, stability: +2 },
          delayed: { inWeeks: 5, effect: { label: "Refugees integrate", delta: { treasury: +80, stability: +3 } } }
        }
      ],
      deny: [{ label: "Close the borders", delta: { loyalty: { peasants: +2, nobles: +3 }, stability: -4 } }],
      delay: [{ label: "Limited intake", delta: { treasury: -50, stability: -1 } }]
    }
  },
  {
    id: "req_ancient_artifact",
    title: "Ancient Artifact Discovery",
    body: "Miners unearthed something strange. Mages want to study it. Nobles want to sell it. Peasants think it's cursed.",
    baseCost: 0,
    urgency: 1,
    effects: {
      approve: [
        { label: "Let mages study", delta: { loyalty: { mages: +10, nobles: -5, peasants: -3 }, stability: +2 } }
      ],
      deny: [{ label: "Sell to collectors", delta: { treasury: +150, loyalty: { mages: -8, nobles: +5 }, corruption: +3 } }],
      delay: [{ label: "Secure storage", delta: { treasury: -40, loyalty: { mages: -2 } } }]
    }
  },
  {
    id: "req_trade_embargo",
    title: "Trade Embargo Pressure",
    body: "A rival kingdom pressures you to embargo their enemy. Comply and lose trade, refuse and make enemies.",
    baseCost: 0,
    urgency: 2,
    effects: {
      approve: [
        { label: "Join the embargo", delta: { treasury: -80, stability: +3, loyalty: { nobles: -4 } } }
      ],
      deny: [{ label: "Refuse to comply", delta: { stability: -3, coupRisk: +3, treasury: +60 } }],
      delay: [{ label: "Diplomatic stalling", delta: { treasury: -20, stability: -1 } }]
    }
  },
  {
    id: "req_printing_press",
    title: "The Printing Press",
    body: "A inventor proposes funding for a 'printing press'. Mages and nobles fear it will spread dangerous ideas.",
    baseCost: 120,
    urgency: 1,
    effects: {
      approve: [
        { 
          label: "Fund the invention", 
          delta: { treasury: -120, loyalty: { mages: -4, nobles: -4, peasants: +6 }, corruption: -3 },
          delayed: { inWeeks: 6, effect: { label: "Knowledge spreads", delta: { stability: +5, inflation: -2 } } }
        }
      ],
      deny: [{ label: "Dangerous ideas", delta: { loyalty: { mages: +2, nobles: +3, peasants: -5 } } }],
      delay: [{ label: "Review the plans", delta: { treasury: -20 } }]
    }
  },
  {
    id: "req_gladiator_games",
    title: "Gladiator Games",
    body: "The arena masters propose grand games. Bloody, expensive, and wildly popular with the masses.",
    baseCost: 170,
    urgency: 1,
    effects: {
      approve: [
        { label: "Let the games begin", delta: { treasury: -170, loyalty: { peasants: +10, army: +5 }, stability: +4, corruption: +3 } }
      ],
      deny: [{ label: "Too barbaric", delta: { loyalty: { peasants: -5, army: -2 } } }],
      delay: [{ label: "Smaller games", delta: { treasury: -60, loyalty: { peasants: +3 } } }]
    }
  }
];
