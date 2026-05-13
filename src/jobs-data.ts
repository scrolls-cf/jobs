export type Job = {
  id: string
  title: string
  /** One line for the board; tuned for quick scanning. */
  summary: string
  /** Fuller description when the user opens a job. */
  detail: string
}

export const JOBS: Job[] = [
  {
    id: 'dice-rng',
    title: 'Dice & number generator',
    summary: 'Dice, pools, and D&D-style RNG in a Worker.',
    detail:
      'Worker that rolls dice and generates random numbers (D&D-style checks, advantage, pools). Expose a small HTTP or RPC surface, keep distributions testable, and document limits for abuse prevention.',
  },
  {
    id: 'geo',
    title: 'Player location',
    summary: 'Resolve or validate player location for world and travel rules.',
    detail:
      'Worker that resolves or validates a user’s location for world state, travel, or regional rules. Consider privacy, coarse vs precise signals, and how location feeds other Workers without tight coupling.',
  },
  {
    id: 'character-levels',
    title: 'Character levels',
    summary: 'Own character level read/write with caps, audits, and abuse checks.',
    detail:
      'Worker that owns progression: read/write character level per account with sane caps and audits. Think idempotency, admin overrides, and event logs for support.',
  },
  {
    id: 'agentic-wallet',
    title: 'Agentic wallet',
    summary: 'Agent-scoped wallet: balances, intents, and policy hooks.',
    detail:
      'Worker that provisions and controls an agent-scoped wallet (balances, intents, policy hooks). Clarify trust boundaries between user, agent, and ledger-like storage.',
  },
  {
    id: 'stripe',
    title: 'Stripe billing',
    summary: 'Stripe customers, subs, webhooks, idempotent event handling.',
    detail:
      'Worker that talks to the Stripe API: customers, subs, webhooks, and idempotent event handling. Cover signature verification, replay safety, and dead-letter patterns.',
  },
  {
    id: 'xp-system',
    title: 'XP system',
    summary: 'XP curves, grants, multipliers, reconciliation with combat and quests.',
    detail:
      'Worker that defines XP curves, grants, multipliers, and reconciliation with combat / quests. Plan for backfills, seasonal resets, and anti-exploit rate limits.',
  },
  {
    id: 'mob-spawn',
    title: 'Mob generator',
    summary: 'Spawn fights: tiers, affixes, loot tables, difficulty scaling.',
    detail:
      'Worker that spawns mobs for the player to fight: tiers, affixes, loot tables, and difficulty scaling. Keep generation deterministic where needed for replays or audits.',
  },
  {
    id: 'asset-pipeline',
    title: 'Models & textures',
    summary: 'Pipeline or orchestrator for 3D models and textures for Scrolls.',
    detail:
      'Worker (or orchestrator) that designs or pipelines 3D models and textures for Scrolls content. Define inputs/outputs, storage (R2), and how humans approve generated assets.',
  },
  {
    id: 'melvor-idle-systems',
    title: "Reuse Melvor Idle's game system",
    summary: 'Map Melvor-style idle loops—skills, mastery, combat, bank—into Scrolls Workers.',
    detail:
      'Treat Melvor Idle as a systems reference: offline tick resolution, non-combat skills, mastery pools, action bars, and loot/bank semantics. Produce a legal, original design spec and Worker boundaries (what runs on tick vs request), how Scrolls differs, and which existing jobs (XP, mobs, RNG) this orchestrates. Do not copy Melvor assets, code, or text; cite inspiration only and keep compatibility with your own narrative.',
  },
]
