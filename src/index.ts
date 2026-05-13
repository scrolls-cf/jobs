import { Hono } from 'hono'

import { JOBS } from './jobs-data'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/health', (c) => {
  return c.json({
    ok: true,
    service: 'scrolls-matrix-jobs',
    runtime: 'workers',
  })
})

/** Full job board as JSON (same shape as POST with an empty filter). */
app.get('/api/jobs', (c) => {
  return c.json({ jobs: JOBS })
})

/**
 * JSON query for jobs. Body examples:
 * - `{}` — all jobs
 * - `{ "id": "geo" }` — one job (404 if missing)
 * - `{ "ids": ["geo", "stripe"] }` — jobs with those ids (subset, order follows data)
 *
 * Priority when multiple fields are present: `id` → `ids` → all.
 */
app.post('/api/jobs', async (c) => {
  const raw = await c.req.text()
  let body: Record<string, unknown> = {}
  if (raw.trim()) {
    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch {
      return c.json({ error: 'invalid json' }, 400)
    }
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return c.json({ error: 'body must be a JSON object' }, 400)
    }
    body = parsed as Record<string, unknown>
  }

  if (body.id !== undefined) {
    if (typeof body.id !== 'string' || body.id.length === 0) {
      return c.json({ error: 'id must be a non-empty string' }, 400)
    }
    const job = JOBS.find((j) => j.id === body.id)
    if (!job) return c.json({ error: 'not_found', jobs: [] }, 404)
    return c.json({ jobs: [job] })
  }

  if (body.ids !== undefined) {
    if (!Array.isArray(body.ids) || !body.ids.every((x) => typeof x === 'string')) {
      return c.json({ error: 'ids must be an array of strings' }, 400)
    }
    const want = new Set(body.ids as string[])
    const jobs = JOBS.filter((j) => want.has(j.id))
    return c.json({ jobs })
  }

  return c.json({ jobs: JOBS })
})

/** Required: accepts a JSON request body. */
app.post('/json/in', async (c) => {
  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'expected application/json body' }, 400)
  }
  return c.json({ ok: true, received: body })
})

/** Required: responds with JSON. */
app.get('/json/out', (c) => {
  return c.json({ ok: true })
})

export default {
  fetch(request: Request, env: CloudflareBindings, ctx: ExecutionContext) {
    return handle(request, env, ctx)
  },
}

async function handle(
  request: Request,
  env: CloudflareBindings,
  ctx: ExecutionContext,
): Promise<Response> {
  const res = await app.fetch(request, env, ctx)
  if (res.status !== 404) return res
  const method = request.method
  if ((method === 'GET' || method === 'HEAD') && env.ASSETS) {
    return env.ASSETS.fetch(request)
  }
  return res
}
