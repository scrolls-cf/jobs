import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/health', (c) => {
  return c.json({
    ok: true,
    service: 'scaffold',
    runtime: 'workers',
  })
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
