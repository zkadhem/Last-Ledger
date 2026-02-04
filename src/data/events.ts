import type { EventCard } from "../types";

// Story events that are interactive choices - these will be shown as popups
export type StoryEvent = {
  id: string;
  title: string;
  body: string;
  weight: number;
  choices: Array<{
    label: string;
    description: string;
    effects: EventCard["effects"];
  }>;
};

export const STORY_EVENTS: StoryEvent[] = [
  // ========== SOCIAL & CELEBRATION EVENTS ==========
  {
    id: "story_royal_banquet",
    title: "The Royal Banquet",
    body: "The capital's noble families request you host a grand banquet to celebrate the harvest. It would boost morale, but the costs are significant.",
    weight: 12,
    choices: [
      {
        label: "Host a Lavish Feast",
        description: "-180 Treasury, +8 Stability, +5 Noble loyalty, +3 Peasant loyalty",
        effects: [{ label: "Grand celebration", delta: { treasury: -180, stability: +8, loyalty: { nobles: +5, peasants: +3 } } }]
      },
      {
        label: "Host a Modest Gathering",
        description: "-60 Treasury, +3 Stability, +2 Noble loyalty",
        effects: [{ label: "Simple feast", delta: { treasury: -60, stability: +3, loyalty: { nobles: +2 } } }]
      },
      {
        label: "Decline the Request",
        description: "-3 Stability, -4 Noble loyalty, Nobles see you as miserly",
        effects: [{ label: "No celebration", delta: { stability: -3, loyalty: { nobles: -4 } } }]
      }
    ]
  },
  {
    id: "story_wedding_blessing",
    title: "A Noble Wedding",
    body: "Two powerful noble houses wish to unite through marriage. They request the crown's blessing and financial contribution to the ceremony.",
    weight: 10,
    choices: [
      {
        label: "Bless and Fund Generously",
        description: "-150 Treasury, +6 Stability, +6 Noble loyalty, Alliance strengthens the realm",
        effects: [{ label: "Royal patronage", delta: { treasury: -150, stability: +6, loyalty: { nobles: +6 } } }]
      },
      {
        label: "Give Blessing Only",
        description: "+2 Stability, +2 Noble loyalty, They're disappointed but grateful",
        effects: [{ label: "Royal blessing", delta: { stability: +2, loyalty: { nobles: +2 } } }]
      },
      {
        label: "Refuse Involvement",
        description: "-4 Noble loyalty, -2 Stability, Houses feel slighted",
        effects: [{ label: "Royal snub", delta: { stability: -2, loyalty: { nobles: -4 } } }]
      }
    ]
  },
  {
    id: "story_street_festival",
    title: "Street Festival Petition",
    body: "The common folk petition to hold a week-long street festival. It would disrupt commerce but boost spirits tremendously.",
    weight: 14,
    choices: [
      {
        label: "Approve and Sponsor",
        description: "-80 Treasury, +10 Peasant loyalty, +5 Stability, The people celebrate!",
        effects: [{ label: "Festival sponsored", delta: { treasury: -80, stability: +5, loyalty: { peasants: +10 } } }]
      },
      {
        label: "Approve Without Funding",
        description: "+5 Peasant loyalty, +2 Stability, They make do with what they have",
        effects: [{ label: "Festival permitted", delta: { stability: +2, loyalty: { peasants: +5 } } }]
      },
      {
        label: "Deny the Petition",
        description: "-6 Peasant loyalty, -3 Stability, Resentment grows",
        effects: [{ label: "Festival denied", delta: { stability: -3, loyalty: { peasants: -6 } } }]
      }
    ]
  },

  // ========== MILITARY & SECURITY EVENTS ==========
  {
    id: "story_mercenary_company",
    title: "Mercenary Company Arrives",
    body: "A renowned mercenary company seeks employment. Their presence could deter threats, but their loyalty is to coin alone.",
    weight: 10,
    choices: [
      {
        label: "Hire Them",
        description: "-200 Treasury, +8 Army loyalty, +5 Stability, -3 Coup Risk",
        effects: [{ label: "Mercenaries hired", delta: { treasury: -200, stability: +5, coupRisk: -3, loyalty: { army: +8 } } }]
      },
      {
        label: "Offer Limited Contract",
        description: "-80 Treasury, +3 Army loyalty, +2 Stability",
        effects: [{ label: "Limited contract", delta: { treasury: -80, stability: +2, loyalty: { army: +3 } } }]
      },
      {
        label: "Turn Them Away",
        description: "They may seek employment with your enemies...",
        effects: [{ label: "Mercenaries rejected", delta: { stability: -2, coupRisk: +2 } } ]
      }
    ]
  },
  {
    id: "story_border_fort",
    title: "Crumbling Border Fort",
    body: "Reports arrive that a key border fortress is in disrepair. Bandits have noticed. The local garrison begs for funds.",
    weight: 11,
    choices: [
      {
        label: "Full Restoration",
        description: "-250 Treasury, +6 Stability, +5 Army loyalty, Border secured for years",
        effects: [{ label: "Fort restored", delta: { treasury: -250, stability: +6, loyalty: { army: +5 } } }]
      },
      {
        label: "Basic Repairs",
        description: "-100 Treasury, +2 Stability, +2 Army loyalty, Patch job",
        effects: [{ label: "Basic repairs", delta: { treasury: -100, stability: +2, loyalty: { army: +2 } } }]
      },
      {
        label: "Ignore the Reports",
        description: "-4 Army loyalty, -3 Stability, +3 Corruption, Bandits will exploit this",
        effects: [{ label: "Fort neglected", delta: { stability: -3, corruption: +3, loyalty: { army: -4 } } }]
      }
    ]
  },
  {
    id: "story_veteran_march",
    title: "Veterans' March",
    body: "Hundreds of retired soldiers march to the capital demanding back pay and pensions. The city watches nervously.",
    weight: 9,
    choices: [
      {
        label: "Pay What's Owed",
        description: "-220 Treasury, +10 Army loyalty, +4 Stability, Honor the debt",
        effects: [{ label: "Veterans paid", delta: { treasury: -220, stability: +4, loyalty: { army: +10 } } }]
      },
      {
        label: "Negotiate Partial Payment",
        description: "-100 Treasury, +4 Army loyalty, +1 Stability, Compromise reached",
        effects: [{ label: "Partial payment", delta: { treasury: -100, stability: +1, loyalty: { army: +4 } } }]
      },
      {
        label: "Disperse Them by Force",
        description: "-8 Army loyalty, -6 Stability, +5 Coup Risk, Blood in the streets",
        effects: [{ label: "Veterans dispersed", delta: { stability: -6, coupRisk: +5, loyalty: { army: -8 } } }]
      }
    ]
  },

  // ========== MAGICAL & MYSTICAL EVENTS ==========
  {
    id: "story_cursed_artifact",
    title: "The Cursed Artifact",
    body: "An ancient artifact was unearthed near the capital. The Mage College claims it's dangerous and must be studied. The Church wants it destroyed.",
    weight: 8,
    choices: [
      {
        label: "Give it to the Mages",
        description: "+8 Mage loyalty, -4 Peasant loyalty, +3 Corruption, Dark knowledge gained",
        effects: [{ label: "Mages study artifact", delta: { corruption: +3, loyalty: { mages: +8, peasants: -4 } } }]
      },
      {
        label: "Have it Destroyed",
        description: "+5 Peasant loyalty, -6 Mage loyalty, +3 Stability, The people feel safer",
        effects: [{ label: "Artifact destroyed", delta: { stability: +3, loyalty: { peasants: +5, mages: -6 } } }]
      },
      {
        label: "Sell it to Foreign Collectors",
        description: "+180 Treasury, -3 Mage loyalty, -2 Peasant loyalty, +2 Corruption",
        effects: [{ label: "Artifact sold", delta: { treasury: +180, corruption: +2, loyalty: { mages: -3, peasants: -2 } } }]
      }
    ]
  },
  {
    id: "story_healing_springs",
    title: "Miraculous Springs",
    body: "A spring with apparent healing properties has been discovered. Pilgrims are already gathering. How shall the crown manage this?",
    weight: 9,
    choices: [
      {
        label: "Build a Public Shrine",
        description: "-120 Treasury, +8 Peasant loyalty, +6 Stability, Hope spreads",
        effects: [{ label: "Shrine built", delta: { treasury: -120, stability: +6, loyalty: { peasants: +8 } } }]
      },
      {
        label: "Tax the Pilgrims",
        description: "+100 Treasury, -3 Peasant loyalty, +2 Corruption, Profitable but cynical",
        effects: [{ label: "Pilgrims taxed", delta: { treasury: +100, corruption: +2, loyalty: { peasants: -3 } } }]
      },
      {
        label: "Grant it to the Mage College",
        description: "+6 Mage loyalty, -3 Peasant loyalty, Mages will study its properties",
        effects: [{ label: "Springs to mages", delta: { loyalty: { mages: +6, peasants: -3 } } }]
      }
    ]
  },
  {
    id: "story_weather_magic",
    title: "Weather Manipulation",
    body: "The Mage College offers to manipulate the weather to ensure good harvests. The peasants fear such unnatural magic.",
    weight: 8,
    choices: [
      {
        label: "Accept the Offer",
        description: "-100 Treasury, +150 Treasury next season, +5 Mage loyalty, -4 Peasant loyalty",
        effects: [
          { label: "Weather magic approved", delta: { treasury: -100, loyalty: { mages: +5, peasants: -4 } } },
          { label: "Scheduled: Bountiful harvest", delayed: { inWeeks: 4, effect: { label: "Harvest bonus", delta: { treasury: +150, stability: +3 } } } }
        ]
      },
      {
        label: "Decline Respectfully",
        description: "+3 Peasant loyalty, -2 Mage loyalty, Trust nature's course",
        effects: [{ label: "Magic declined", delta: { loyalty: { peasants: +3, mages: -2 } } }]
      },
      {
        label: "Ban Such Magic Entirely",
        description: "+6 Peasant loyalty, -8 Mage loyalty, -2 Stability, Mages feel persecuted",
        effects: [{ label: "Weather magic banned", delta: { stability: -2, loyalty: { peasants: +6, mages: -8 } } }]
      }
    ]
  },

  // ========== ECONOMIC & TRADE EVENTS ==========
  {
    id: "story_foreign_merchants",
    title: "Foreign Trade Delegation",
    body: "Merchants from a distant land seek to establish trade. They bring exotic goods but their customs are strange to your people.",
    weight: 12,
    choices: [
      {
        label: "Welcome Them Warmly",
        description: "+140 Treasury, +3 Stability, -2 Peasant loyalty, +3 Inflation",
        effects: [{ label: "Trade established", delta: { treasury: +140, stability: +3, inflation: +3, loyalty: { peasants: -2 } } }]
      },
      {
        label: "Limited Trade Agreement",
        description: "+60 Treasury, +1 Stability, +1 Inflation, Cautious approach",
        effects: [{ label: "Limited trade", delta: { treasury: +60, stability: +1, inflation: +1 } } ]
      },
      {
        label: "Turn Them Away",
        description: "+3 Peasant loyalty, -2 Stability, Isolationism has costs",
        effects: [{ label: "Foreigners rejected", delta: { stability: -2, loyalty: { peasants: +3 } } }]
      }
    ]
  },
  {
    id: "story_guild_dispute",
    title: "Guild War",
    body: "The Merchant Guild and Craftsmen Guild are in bitter dispute. Both demand you side with them. Commerce has ground to a halt.",
    weight: 10,
    choices: [
      {
        label: "Side with Merchants",
        description: "+100 Treasury, +4 Noble loyalty, -5 Peasant loyalty, -2 Stability",
        effects: [{ label: "Merchants favored", delta: { treasury: +100, stability: -2, loyalty: { nobles: +4, peasants: -5 } } }]
      },
      {
        label: "Side with Craftsmen",
        description: "+6 Peasant loyalty, -4 Noble loyalty, -60 Treasury, Quality over profit",
        effects: [{ label: "Craftsmen favored", delta: { treasury: -60, loyalty: { peasants: +6, nobles: -4 } } }]
      },
      {
        label: "Force a Compromise",
        description: "-2 Noble loyalty, -2 Peasant loyalty, +3 Stability, Neither side happy",
        effects: [{ label: "Forced compromise", delta: { stability: +3, loyalty: { nobles: -2, peasants: -2 } } }]
      }
    ]
  },
  {
    id: "story_mine_discovery",
    title: "Silver Mine Discovered",
    body: "Prospectors have found a rich silver vein in the mountains. Multiple factions claim rights to the land.",
    weight: 7,
    choices: [
      {
        label: "Crown Claims the Mine",
        description: "+200 Treasury over time, -4 Noble loyalty, +3 Corruption",
        effects: [
          { label: "Crown mining rights", delta: { corruption: +3, loyalty: { nobles: -4 } } },
          { label: "Scheduled: Mining income", delayed: { inWeeks: 3, effect: { label: "Silver revenue", delta: { treasury: +200 } } } }
        ]
      },
      {
        label: "Grant it to Nobles",
        description: "+8 Noble loyalty, -3 Peasant loyalty, They'll exploit it themselves",
        effects: [{ label: "Nobles get mine", delta: { loyalty: { nobles: +8, peasants: -3 } } }]
      },
      {
        label: "Create a Public Mining Company",
        description: "-80 Treasury startup, +6 Peasant loyalty, +4 Stability, Jobs for the people",
        effects: [
          { label: "Public company formed", delta: { treasury: -80, stability: +4, loyalty: { peasants: +6 } } },
          { label: "Scheduled: Company profits", delayed: { inWeeks: 5, effect: { label: "Mining dividends", delta: { treasury: +120, stability: +2 } } } }
        ]
      }
    ]
  },

  // ========== CRIME & UNDERWORLD EVENTS ==========
  {
    id: "story_thieves_guild",
    title: "Thieves Guild Offer",
    body: "The Thieves Guild offers a deal: they'll reduce visible crime and share intelligence if you look the other way.",
    weight: 9,
    choices: [
      {
        label: "Accept the Deal",
        description: "+10 Underworld loyalty, -3 Coup Risk, +6 Corruption, -3 Peasant loyalty",
        effects: [{ label: "Deal with thieves", delta: { corruption: +6, coupRisk: -3, loyalty: { underworld: +10, peasants: -3 } } }]
      },
      {
        label: "Demand Better Terms",
        description: "+60 Treasury, +5 Underworld loyalty, +4 Corruption, They respect boldness",
        effects: [{ label: "Thieves pay tribute", delta: { treasury: +60, corruption: +4, loyalty: { underworld: +5 } } }]
      },
      {
        label: "Crack Down Instead",
        description: "-8 Underworld loyalty, +4 Peasant loyalty, +5 Coup Risk, War on crime",
        effects: [{ label: "Crackdown ordered", delta: { coupRisk: +5, loyalty: { underworld: -8, peasants: +4 } } }]
      }
    ]
  },
  {
    id: "story_prison_riot",
    title: "Prison Uprising",
    body: "Prisoners in the royal dungeons have seized control. They have hostages and demand amnesty.",
    weight: 8,
    choices: [
      {
        label: "Grant Amnesty",
        description: "+5 Underworld loyalty, -5 Army loyalty, -4 Stability, They walk free",
        effects: [{ label: "Prisoners freed", delta: { stability: -4, loyalty: { underworld: +5, army: -5 } } }]
      },
      {
        label: "Negotiate Release of Hostages",
        description: "-80 Treasury ransom, -2 Stability, Pragmatic solution",
        effects: [{ label: "Ransom paid", delta: { treasury: -80, stability: -2 } } ]
      },
      {
        label: "Storm the Prison",
        description: "+4 Army loyalty, -6 Underworld loyalty, -3 Stability, Blood will be spilled",
        effects: [{ label: "Prison stormed", delta: { stability: -3, loyalty: { army: +4, underworld: -6 } } }]
      }
    ]
  },
  {
    id: "story_smuggler_info",
    title: "Smuggler's Intelligence",
    body: "Captured smugglers offer valuable information about a conspiracy in exchange for their freedom.",
    weight: 8,
    choices: [
      {
        label: "Accept the Deal",
        description: "-5 Coup Risk, +3 Corruption, +3 Underworld loyalty, Information is power",
        effects: [{ label: "Intel acquired", delta: { coupRisk: -5, corruption: +3, loyalty: { underworld: +3 } } }]
      },
      {
        label: "Execute Them Anyway",
        description: "+3 Army loyalty, -6 Underworld loyalty, +2 Coup Risk, Make an example",
        effects: [{ label: "Smugglers executed", delta: { coupRisk: +2, loyalty: { army: +3, underworld: -6 } } }]
      },
      {
        label: "Regular Trial",
        description: "+2 Stability, +2 Peasant loyalty, Let justice take its course",
        effects: [{ label: "Fair trial held", delta: { stability: +2, loyalty: { peasants: +2 } } }]
      }
    ]
  },

  // ========== NATURAL DISASTERS & CRISIS ==========
  {
    id: "story_flood_relief",
    title: "River Floods",
    body: "Heavy rains have caused devastating floods in the farming districts. Thousands are displaced and crops are ruined.",
    weight: 10,
    choices: [
      {
        label: "Major Relief Effort",
        description: "-200 Treasury, +10 Peasant loyalty, +5 Stability, The crown cares",
        effects: [{ label: "Relief provided", delta: { treasury: -200, stability: +5, loyalty: { peasants: +10 } } }]
      },
      {
        label: "Modest Assistance",
        description: "-80 Treasury, +4 Peasant loyalty, +2 Stability, Some help is better than none",
        effects: [{ label: "Limited relief", delta: { treasury: -80, stability: +2, loyalty: { peasants: +4 } } }]
      },
      {
        label: "Leave it to Local Lords",
        description: "-6 Peasant loyalty, -4 Stability, +3 Noble loyalty, Not the crown's problem",
        effects: [{ label: "No royal relief", delta: { stability: -4, loyalty: { peasants: -6, nobles: +3 } } }]
      }
    ]
  },
  {
    id: "story_plague_outbreak",
    title: "Plague in the Slums",
    body: "A mysterious sickness spreads through the poor quarters. Healers are overwhelmed and fear grips the city.",
    weight: 7,
    choices: [
      {
        label: "Fund Emergency Response",
        description: "-180 Treasury, +8 Peasant loyalty, +4 Stability, Lives saved",
        effects: [{ label: "Plague response", delta: { treasury: -180, stability: +4, loyalty: { peasants: +8 } } }]
      },
      {
        label: "Quarantine the Area",
        description: "-4 Peasant loyalty, +2 Stability, -2 Corruption, Contain the spread",
        effects: [{ label: "Quarantine enforced", delta: { stability: +2, corruption: -2, loyalty: { peasants: -4 } } }]
      },
      {
        label: "Ask Mages to Investigate",
        description: "-60 Treasury, +4 Mage loyalty, Magical solution possible",
        effects: [
          { label: "Mages investigate", delta: { treasury: -60, loyalty: { mages: +4 } } },
          { label: "Scheduled: Cure discovered", delayed: { inWeeks: 2, effect: { label: "Magical cure", delta: { stability: +6, loyalty: { peasants: +5, mages: +3 } } } } }
        ]
      }
    ]
  },
  {
    id: "story_earthquake",
    title: "Earthquake Strikes",
    body: "A powerful earthquake has damaged buildings throughout the city. The great cathedral's bell tower has collapsed.",
    weight: 6,
    choices: [
      {
        label: "Comprehensive Rebuilding",
        description: "-300 Treasury, +8 Stability, +6 Peasant loyalty, Rebuild better",
        effects: [{ label: "Full reconstruction", delta: { treasury: -300, stability: +8, loyalty: { peasants: +6 } } }]
      },
      {
        label: "Focus on Essential Repairs",
        description: "-120 Treasury, +3 Stability, +2 Peasant loyalty, Prioritize needs",
        effects: [{ label: "Essential repairs", delta: { treasury: -120, stability: +3, loyalty: { peasants: +2 } } }]
      },
      {
        label: "Raise Emergency Taxes",
        description: "+80 Treasury, -6 Peasant loyalty, -2 Stability, +3 Inflation, People pay twice",
        effects: [{ label: "Emergency tax", delta: { treasury: +80, stability: -2, inflation: +3, loyalty: { peasants: -6 } } }]
      }
    ]
  },

  // ========== POLITICAL INTRIGUE EVENTS ==========
  {
    id: "story_assassination_plot",
    title: "Whispers of Assassination",
    body: "Your spymaster reports an assassination plot among the nobility. The evidence is circumstantial but concerning.",
    weight: 7,
    choices: [
      {
        label: "Arrest the Suspects",
        description: "-8 Noble loyalty, +4 Stability, -4 Coup Risk, Send a message",
        effects: [{ label: "Nobles arrested", delta: { stability: +4, coupRisk: -4, loyalty: { nobles: -8 } } }]
      },
      {
        label: "Increase Security Quietly",
        description: "-60 Treasury, -2 Coup Risk, +2 Stability, Watch and wait",
        effects: [{ label: "Security increased", delta: { treasury: -60, stability: +2, coupRisk: -2 } } ]
      },
      {
        label: "Ignore the Rumors",
        description: "No immediate cost, but +4 Coup Risk, Perhaps it's nothing...",
        effects: [{ label: "Rumors ignored", delta: { coupRisk: +4 } }]
      }
    ]
  },
  {
    id: "story_heir_scandal",
    title: "The Heir's Scandal",
    body: "Rumors spread that the crown heir was seen in compromising circumstances. The court gossips endlessly.",
    weight: 8,
    choices: [
      {
        label: "Public Denial",
        description: "-2 Stability, +2 Corruption, Some believe, some don't",
        effects: [{ label: "Official denial", delta: { stability: -2, corruption: +2 } }]
      },
      {
        label: "Silence the Witnesses",
        description: "-100 Treasury, +5 Corruption, +3 Underworld loyalty, What scandal?",
        effects: [{ label: "Witnesses silenced", delta: { treasury: -100, corruption: +5, loyalty: { underworld: +3 } } }]
      },
      {
        label: "Acknowledge and Move On",
        description: "-4 Noble loyalty, +3 Peasant loyalty, +2 Stability, Honesty is refreshing",
        effects: [{ label: "Truth acknowledged", delta: { stability: +2, loyalty: { nobles: -4, peasants: +3 } } }]
      }
    ]
  },
  {
    id: "story_neighboring_war",
    title: "War on the Border",
    body: "A neighboring kingdom has erupted into civil war. Refugees stream across your borders, and both sides seek your support.",
    weight: 8,
    choices: [
      {
        label: "Support the Rebels",
        description: "-150 Treasury, +5 Army loyalty, Risk of retaliation if they lose",
        effects: [
          { label: "Rebels supported", delta: { treasury: -150, loyalty: { army: +5 } } },
          { label: "Scheduled: Outcome", delayed: { inWeeks: 6, effect: { label: "Rebel victory tribute", delta: { treasury: +200, stability: +4 } } } }
        ]
      },
      {
        label: "Support the Crown",
        description: "-150 Treasury, +5 Noble loyalty, Traditional alliance",
        effects: [
          { label: "Crown supported", delta: { treasury: -150, loyalty: { nobles: +5 } } },
          { label: "Scheduled: Gratitude", delayed: { inWeeks: 6, effect: { label: "Royal gratitude", delta: { treasury: +180, loyalty: { nobles: +4 } } } } }
        ]
      },
      {
        label: "Stay Neutral",
        description: "+3 Stability, -2 Army loyalty, -2 Noble loyalty, Help the refugees",
        effects: [{ label: "Neutrality declared", delta: { stability: +3, loyalty: { army: -2, nobles: -2 } } }]
      }
    ]
  },

  // ========== RELIGIOUS & CULTURAL EVENTS ==========
  {
    id: "story_religious_schism",
    title: "Temple Schism",
    body: "Two factions within the temple have split over doctrine. Both claim to represent the true faith and demand royal endorsement.",
    weight: 8,
    choices: [
      {
        label: "Support the Traditionalists",
        description: "+6 Peasant loyalty, -3 Mage loyalty, +2 Stability, Old ways preserved",
        effects: [{ label: "Traditionalists endorsed", delta: { stability: +2, loyalty: { peasants: +6, mages: -3 } } }]
      },
      {
        label: "Support the Reformers",
        description: "+4 Mage loyalty, +3 Noble loyalty, -4 Peasant loyalty, Progress embraced",
        effects: [{ label: "Reformers endorsed", delta: { loyalty: { mages: +4, nobles: +3, peasants: -4 } } }]
      },
      {
        label: "Declare Religious Freedom",
        description: "-2 Stability, +2 Corruption, All factions -2 loyalty, No one is happy",
        effects: [{ label: "Freedom declared", delta: { stability: -2, corruption: +2, loyalty: { peasants: -2, nobles: -2, mages: -2 } } }]
      }
    ]
  },
  {
    id: "story_ancient_tomb",
    title: "Ancient Tomb Opened",
    body: "Workers have accidentally breached an ancient royal tomb. Treasures glitter within, but disturbing the dead is taboo.",
    weight: 7,
    choices: [
      {
        label: "Claim the Treasures",
        description: "+250 Treasury, -6 Peasant loyalty, +4 Corruption, Grave robbery",
        effects: [{ label: "Tomb looted", delta: { treasury: +250, corruption: +4, loyalty: { peasants: -6 } } }]
      },
      {
        label: "Seal it and Build a Memorial",
        description: "-60 Treasury, +6 Peasant loyalty, +4 Stability, Honor the ancestors",
        effects: [{ label: "Tomb sealed", delta: { treasury: -60, stability: +4, loyalty: { peasants: +6 } } }]
      },
      {
        label: "Let Mages Study It",
        description: "+80 Treasury, +5 Mage loyalty, -3 Peasant loyalty, Ancient knowledge",
        effects: [{ label: "Mages study tomb", delta: { treasury: +80, loyalty: { mages: +5, peasants: -3 } } }]
      }
    ]
  },
  {
    id: "story_famous_bard",
    title: "The Famous Bard",
    body: "A renowned bard arrives, whose songs can sway public opinion. He offers to compose an epic about your reign—for a price.",
    weight: 10,
    choices: [
      {
        label: "Commission a Heroic Epic",
        description: "-120 Treasury, +6 Stability, +4 Peasant loyalty, Songs shape history",
        effects: [{ label: "Epic commissioned", delta: { treasury: -120, stability: +6, loyalty: { peasants: +4 } } }]
      },
      {
        label: "Modest Payment for a Ballad",
        description: "-40 Treasury, +2 Stability, +2 Peasant loyalty, A smaller tale",
        effects: [{ label: "Ballad written", delta: { treasury: -40, stability: +2, loyalty: { peasants: +2 } } }]
      },
      {
        label: "Decline His Services",
        description: "-2 Stability, He may sing for your enemies instead",
        effects: [{ label: "Bard rejected", delta: { stability: -2 } }]
      }
    ]
  }
];

// Regular automatic events (these just happen, no choice)
export const EVENTS: EventCard[] = [
  {
    id: "evt_dragon_tithe",
    title: "Dragon Tithe",
    body: "A dragon circles the valley and demands tribute. Pay, or it will take what it wants.",
    weight: 8,
    effects: [
      { label: "Tribute demanded", delta: { stability: -2, coupRisk: +2 } }
    ]
  },
  {
    id: "evt_cult_blossoms",
    title: "Cult Blossoms",
    body: "A radiant cult spreads among the poor. It promises bread—then obedience. The court asks what the ledger permits.",
    weight: 10,
    effects: [
      { label: "Faith shifts power", delta: { loyalty: { peasants: -2, nobles: -1 }, stability: -1, corruption: +1 } }
    ]
  },
  {
    id: "evt_good_harvest",
    title: "A Good Harvest",
    body: "Fields yield more than expected. Traders praise your administration (whether deserved or not).",
    weight: 14,
    effects: [
      { label: "Prosperity", delta: { treasury: +120, stability: +2, loyalty: { peasants: +3 } } }
    ]
  },
  {
    id: "evt_mage_duel",
    title: "Mage Duel in the Plaza",
    body: "Two archmages settle a dispute publicly. Half the district is scorched. Repairs are inevitable.",
    weight: 9,
    effects: [
      { label: "Arcane damages", delta: { stability: -3, loyalty: { mages: -2 }, corruption: +1 } }
    ]
  },
  {
    id: "evt_blackmail",
    title: "A Blackmail Ledger",
    body: "Someone slides you a book of names: corrupt officials, noble affairs, secret debts. It can be weaponized… or burned.",
    weight: 7,
    effects: [
      { label: "Temptation rises", delta: { corruption: +2, coupRisk: +1 } }
    ]
  },
  {
    id: "evt_market_panic",
    title: "Market Panic",
    body: "Whispers of insolvency ripple through merchants. Prices jump. The currency feels… lighter.",
    weight: 8,
    effects: [
      { label: "Prices surge", delta: { inflation: +4, stability: -2 } }
    ]
  },
  {
    id: "evt_trade_boom",
    title: "Trade Boom",
    body: "Foreign merchants flood the markets with exotic goods. Coin flows freely through the capital.",
    weight: 10,
    effects: [
      { label: "Commerce flourishes", delta: { treasury: +80, inflation: +2, stability: +1 } }
    ]
  },
  {
    id: "evt_noble_feud",
    title: "Noble Feud",
    body: "Two prominent houses engage in a bitter public dispute. The court takes sides.",
    weight: 9,
    effects: [
      { label: "Houses divided", delta: { stability: -2, loyalty: { nobles: -3 }, coupRisk: +1 } }
    ]
  },
  {
    id: "evt_bumper_crops",
    title: "Bumper Crops",
    body: "Perfect weather has blessed the farms. Granaries overflow with abundance.",
    weight: 11,
    effects: [
      { label: "Agricultural bounty", delta: { treasury: +60, stability: +3, loyalty: { peasants: +4 } } }
    ]
  },
  {
    id: "evt_army_parade",
    title: "Military Parade",
    body: "The army marches through the capital in a display of might. Citizens cheer (or cower).",
    weight: 10,
    effects: [
      { label: "Show of force", delta: { stability: +2, loyalty: { army: +3 }, coupRisk: -1 } }
    ]
  },
  {
    id: "evt_corruption_exposed",
    title: "Corruption Exposed",
    body: "A clerk's meticulous records reveal embezzlement throughout the treasury.",
    weight: 8,
    effects: [
      { label: "Scandal breaks", delta: { corruption: -3, stability: -2, treasury: +40 } }
    ]
  },
  {
    id: "evt_foreign_gift",
    title: "Diplomatic Gift",
    body: "A foreign ambassador arrives bearing gifts and honeyed words.",
    weight: 10,
    effects: [
      { label: "Gifts received", delta: { treasury: +100, stability: +1 } }
    ]
  }
];
