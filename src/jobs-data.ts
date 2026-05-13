/** Every job-built Worker must satisfy this HTTP surface (see DESIGN.md). */
export const WORKER_PLATFORM_CONTRACT = {
  jsonIO:
    'Primary business routes accept **JSON request bodies** (where a body is used) and return **JSON responses** with `Content-Type: application/json`. Validation errors use a stable JSON error shape (machine-readable `code` + human `message`).',
  health:
    'Expose **`GET /health`** returning **200** and a small JSON payload (e.g. `{ "ok": true }`) with **no side effects**—suitable for orchestration, deploy probes, and ops dashboards.',
  singlePurpose:
    'The Worker implements **one coherent capability** matching this job’s description—no unrelated products, admin UIs, or extra public domains bundled into the same deploy unless explicitly split as separate jobs.',
  deployGate:
    '**All acceptance tests** listed for this job **must pass in CI** before the revision is **approved for production deploy** (merge to deploy branch / tag / promotion step—exact gate TBD with pipeline design).',
  ciNote:
    '**Where** these tests execute (Workers Builds only, GitHub Actions + `wrangler dev`, e2e against preview URLs, etc.) is **not decided yet**—the tests below are the **contract** regardless of runner.',
} as const

export type AcceptanceTest = {
  /** Stable id for CI filters, e.g. dice-rng-distribution */
  id: string
  name: string
  description: string
}

export type Job = {
  id: string
  title: string
  /** One line for the board; tuned for quick scanning. */
  summary: string
  /** Narrative scope for the Worker. */
  detail: string
  /** Single bounded capability this Worker exposes (one sentence). */
  workerPurpose: string
  /** Mock acceptance tests—must pass before deploy (see WORKER_PLATFORM_CONTRACT.deployGate). */
  acceptanceTests: AcceptanceTest[]
}

export const JOBS: Job[] = [
  {
    id: 'dice-rng',
    title: 'Dice & number generator',
    summary: 'Dice, pools, and D&D-style RNG in a Worker.',
    detail:
      'Worker that rolls dice and generates random numbers (D&D-style checks, advantage, pools). Expose a small HTTP or RPC surface, keep distributions testable, and document limits for abuse prevention.',
    workerPurpose:
      'Accept JSON roll specifications (dice notation, pools, advantage) and return JSON outcomes plus metadata—nothing else on the public surface.',
    acceptanceTests: [
      {
        id: 'dice-rng-health',
        name: 'Health probe',
        description: '`GET /health` returns 200 and JSON `{ ok: true }` (or documented schema) with no RNG side effects.',
      },
      {
        id: 'dice-rng-json-shape',
        name: 'JSON I/O contract',
        description:
          'POST to the documented roll endpoint with `Content-Type: application/json` returns 200 + JSON body; malformed JSON returns 400 + JSON error object.',
      },
      {
        id: 'dice-rng-distribution',
        name: 'Statistical sanity',
        description:
          'Property or Monte Carlo test: over many fair d20 rolls, empirical mean and variance stay within documented tolerances vs analytic bounds.',
      },
      {
        id: 'dice-rng-abuse-limits',
        name: 'Abuse caps',
        description:
          'Requests above max dice count / pool size are rejected with JSON error and do not allocate unbounded work.',
      },
    ],
  },
  {
    id: 'geo',
    title: 'Player location',
    summary: 'Resolve or validate player location for world and travel rules.',
    detail:
      'Worker that resolves or validates a user’s location for world state, travel, or regional rules. Consider privacy, coarse vs precise signals, and how location feeds other Workers without tight coupling.',
    workerPurpose:
      'Resolve or validate a player location from JSON input and return JSON location state—no unrelated map tile serving or analytics pipelines in this Worker.',
    acceptanceTests: [
      {
        id: 'geo-health',
        name: 'Health probe',
        description: '`GET /health` returns 200 + JSON per contract.',
      },
      {
        id: 'geo-json-schema',
        name: 'Schema validation',
        description:
          'Valid JSON body passes; unknown fields rejected or stripped per spec; invalid coordinates return JSON 4xx with stable error codes.',
      },
      {
        id: 'geo-privacy-coarse',
        name: 'Precision policy',
        description:
          'When policy requests coarse location, response JSON never exposes finer precision than allowed (assert bounding box / precision level).',
      },
    ],
  },
  {
    id: 'character-levels',
    title: 'Character levels',
    summary: 'Own character level read/write with caps, audits, and abuse checks.',
    detail:
      'Worker that owns progression: read/write character level per account with sane caps and audits. Think idempotency, admin overrides, and event logs for support.',
    workerPurpose:
      'Read and mutate character level for an account from JSON commands—single progression domain, no cross-cutting shop or mail logic.',
    acceptanceTests: [
      {
        id: 'levels-health',
        name: 'Health probe',
        description: '`GET /health` returns 200 + JSON per contract.',
      },
      {
        id: 'levels-idempotent',
        name: 'Idempotent writes',
        description:
          'Same idempotency key + payload does not double-apply level changes; JSON response reflects final level.',
      },
      {
        id: 'levels-cap',
        name: 'Cap enforcement',
        description: 'Level cannot exceed configured max; attempt returns JSON error, state unchanged.',
      },
    ],
  },
  {
    id: 'agentic-wallet',
    title: 'Agentic wallet',
    summary: 'Agent-scoped wallet: balances, intents, and policy hooks.',
    detail:
      'Worker that provisions and controls an agent-scoped wallet (balances, intents, policy hooks). Clarify trust boundaries between user, agent, and ledger-like storage.',
    workerPurpose:
      'Ledger-style JSON commands for one agent-scoped wallet (balance read, holds, releases)—no unrelated marketplace listing APIs.',
    acceptanceTests: [
      {
        id: 'wallet-health',
        name: 'Health probe',
        description: '`GET /health` returns 200 + JSON per contract.',
      },
      {
        id: 'wallet-json-intents',
        name: 'Intent JSON round-trip',
        description:
          'Documented intent types serialize/deserialize as JSON; unknown intent returns JSON 400 with code `unknown_intent`.',
      },
      {
        id: 'wallet-policy-deny',
        name: 'Policy hook',
        description:
          'When policy JSON marks an operation denied, Worker returns JSON denial and does not mutate balances.',
      },
    ],
  },
  {
    id: 'stripe',
    title: 'Stripe billing',
    summary: 'Stripe customers, subs, webhooks, idempotent event handling.',
    detail:
      'Worker that talks to the Stripe API: customers, subs, webhooks, and idempotent event handling. Cover signature verification, replay safety, and dead-letter patterns.',
    workerPurpose:
      'Stripe webhook verification + idempotent event application exposed as JSON-in/JSON-out internal routes (or single public webhook path)—no random CRUD unrelated to billing.',
    acceptanceTests: [
      {
        id: 'stripe-health',
        name: 'Health probe',
        description: '`GET /health` returns 200 + JSON per contract.',
      },
      {
        id: 'stripe-signature',
        name: 'Webhook signature',
        description:
          'Valid Stripe signature header verifies; tampered body returns 400 and JSON error; replayed event id returns deduped JSON response without double side effects.',
      },
      {
        id: 'stripe-json-errors',
        name: 'JSON errors',
        description: 'All error paths for the webhook handler return JSON bodies, never empty 500 HTML.',
      },
    ],
  },
  {
    id: 'xp-system',
    title: 'XP system',
    summary: 'XP curves, grants, multipliers, reconciliation with combat and quests.',
    detail:
      'Worker that defines XP curves, grants, multipliers, and reconciliation with combat / quests. Plan for backfills, seasonal resets, and anti-exploit rate limits.',
    workerPurpose:
      'Grant and query XP strictly via JSON operations for accounts—no combat simulation or quest engine in this Worker.',
    acceptanceTests: [
      {
        id: 'xp-health',
        name: 'Health probe',
        description: '`GET /health` returns 200 + JSON per contract.',
      },
      {
        id: 'xp-grant-json',
        name: 'Grant math',
        description:
          'Given JSON grant request, response JSON reflects new totals and audit fields; negative or overflow inputs rejected with JSON errors.',
      },
      {
        id: 'xp-rate-limit',
        name: 'Anti-exploit',
        description: 'Burst grants beyond configured rate return JSON `rate_limited` without corrupting stored XP.',
      },
    ],
  },
  {
    id: 'mob-spawn',
    title: 'Mob generator',
    summary: 'Spawn fights: tiers, affixes, loot tables, difficulty scaling.',
    detail:
      'Worker that spawns mobs for the player to fight: tiers, affixes, loot tables, and difficulty scaling. Keep generation deterministic where needed for replays or audits.',
    workerPurpose:
      'Deterministic or seeded mob spawn JSON in → spawn payload JSON out—no combat resolution or player damage in this Worker unless explicitly in scope.',
    acceptanceTests: [
      {
        id: 'mob-health',
        name: 'Health probe',
        description: '`GET /health` returns 200 + JSON per contract.',
      },
      {
        id: 'mob-determinism',
        name: 'Determinism',
        description:
          'Same JSON input + seed yields byte-identical JSON output for spawn payload (golden file or hash assertion).',
      },
      {
        id: 'mob-affix-validity',
        name: 'Affix rules',
        description: 'Invalid affix combinations in JSON are rejected before RNG with JSON error listing conflicts.',
      },
    ],
  },
  {
    id: 'asset-pipeline',
    title: 'Models & textures',
    summary: 'Pipeline or orchestrator for 3D models and textures for Scrolls.',
    detail:
      'Worker (or orchestrator) that designs or pipelines 3D models and textures for Scrolls content. Define inputs/outputs, storage (R2), and how humans approve generated assets.',
    workerPurpose:
      'JSON job tickets in → JSON status/artifact handles out for the asset pipeline stage this job owns—no unrelated auth or user profile endpoints.',
    acceptanceTests: [
      {
        id: 'asset-health',
        name: 'Health probe',
        description: '`GET /health` returns 200 + JSON per contract.',
      },
      {
        id: 'asset-ticket-schema',
        name: 'Ticket JSON',
        description: 'Valid pipeline ticket JSON accepted; missing required keys return JSON 400 with field paths.',
      },
      {
        id: 'asset-r2-handle',
        name: 'Output shape',
        description: 'Successful run returns JSON including non-sensitive R2 keys or signed URL placeholders per spec.',
      },
    ],
  },
  {
    id: 'melvor-idle-systems',
    title: "Reuse Melvor Idle's game system",
    summary: 'Map Melvor-style idle loops—skills, mastery, combat, bank—into Scrolls Workers.',
    detail:
      'Treat Melvor Idle as a systems reference: offline tick resolution, non-combat skills, mastery pools, action bars, and loot/bank semantics. Produce a legal, original design spec and Worker boundaries (what runs on tick vs request), how Scrolls differs, and which existing jobs (XP, mobs, RNG) this orchestrates. Do not copy Melvor assets, code, or text; cite inspiration only and keep compatibility with your own narrative.',
    workerPurpose:
      'This job is **design + boundaries only** until split: any Worker spun out from it must still honor JSON I/O + `/health` + single purpose for **each** extracted capability.',
    acceptanceTests: [
      {
        id: 'melvor-spec-json',
        name: 'Spec artifact',
        description:
          'Repo contains machine-readable JSON (or MD with embedded JSON blocks) describing tick vs request boundaries; CI validates parse + required keys.',
      },
      {
        id: 'melvor-no-assets',
        name: 'Legal guard',
        description:
          'Automated scan fails if Melvor-branded strings, asset paths, or verbatim rules text appear in checked-in artifacts.',
      },
      {
        id: 'melvor-worker-delegation',
        name: 'Delegation map',
        description:
          'JSON map lists which board jobs own which behaviors—CI asserts every referenced `id` exists in the `jobs` array from `GET /api/jobs`.',
      },
    ],
  },
]
