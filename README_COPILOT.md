
### `README_COPILOT.md`
```md
# Copilot Iteration Guide — Last Ledger

## Goals of this codebase
- Fast iteration on systemic content (numbers-first).
- Runs are deterministic: a `seed` drives RNG so balancing is reproducible.
- Content is data-driven: policies, rulers, events, requests are plain objects.
- The engine is UI-agnostic: simulation is in `/src/engine`, UI in `/src/ui`.

## Where to change things
### Game feel / balance knobs
- `src/engine/balance.ts`: core constants (weeks, income curves, coup checks)
- `src/engine/simulation.ts`: weekly step order + how requests/events apply
- `src/engine/scoring.ts`: meta rewards + unlock progression
- `src/engine/game.ts`: end conditions and run state machine

### Add new content
- Policies: `src/data/policies.ts`
- Rulers: `src/data/rulers.ts`
- Requests: `src/data/requests.ts` (budget asks, repairs, army spend, etc.)
- Events: `src/data/events.ts` (dragons, cults, heroes, scandals, etc.)
- Unlock tables: `src/data/unlocks.ts`

### UI changes
- Screens: `src/ui/screens/*`
- Widgets: `src/ui/widgets/*`
- Layout: `src/ui/layout/*`
- Shared components: `src/ui/components/*`

## Core data model (keep consistent)
- Stats: Treasury, Debt, Corruption, Stability, Inflation, CoupRisk
- Factions: peasants, nobles, mages, army, underworld
- Each week:
  1) Apply ongoing modifiers (policies + ruler)
  2) Collect tax income (affected by inflation, stability, corruption, loyalty)
  3) Generate request queue (2–4 cards)
  4) Generate one event card
  5) Player resolves requests and optionally uses actions
  6) End-week decay/growth (corruption bleed, inflation drift, coup check)

## Determinism
- Use `rng.next()` and `rng.pick()` from `src/engine/rng.ts`.
- Never call `Math.random()` in engine code.
- UI animations can be non-deterministic; do not influence the engine.

## Adding a new Policy (example)
1) Add an entry in `src/data/policies.ts`:
   - id, name, rarity, description
   - modifiers: flat or percent deltas
   - hooks: `onWeekStart`, `onIncome`, `onApproveRequest`, etc. (optional)
2) Add unlock conditions in `src/data/unlocks.ts`.
3) Confirm it appears in PolicyPicker and affects simulation.

## Safety rules / design constraints
- No combat, no farming; all outcomes are ledger decisions.
- Every effect should be explainable in tooltips / event text.
- Prefer small interacting modifiers over big scripted outcomes.

## Suggested next upgrades (high impact)
1) Add a small chart sparkline for Treasury/Stability history (store already tracks history).
2) Add “delayed consequences” chain events (already supported via queued effects).
3) Add more faction sabotage/boons when thresholds crossed.
4) Add a “Ledger Notes” codex that unlocks lore snippets from failures.

## Testing notes
- You can “replay” a run by reusing the same seed and choices.
- To debug: log `state.run.seed`, `state.week`, and chosen actions.
