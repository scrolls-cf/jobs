import { Hono } from 'hono'

import { insertBacklogItem, isBacklogKind, listBacklogItems } from '../lib/backlog/db'
import { backlogItemId } from '../lib/backlog/id'
import { BACKLOG_KINDS } from '../lib/backlog/types'

type BacklogBindings = {
  DB: D1Database
}

const backlog = new Hono<{ Bindings: BacklogBindings }>()

backlog.get('/', async (c) => {
  const db = c.env.DB
  const items = await listBacklogItems(db)
  return c.json({ items })
})

backlog.post('/', async (c) => {
  const db = c.env.DB
  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'expected application/json body' }, 400)
  }
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return c.json({ error: 'body must be a JSON object' }, 400)
  }
  const raw = body as Record<string, unknown>

  if (typeof raw.title !== 'string' || raw.title.trim().length === 0) {
    return c.json({ error: 'title must be a non-empty string' }, 400)
  }
  const title = raw.title.trim()

  const summary =
    typeof raw.summary === 'string' && raw.summary.trim().length > 0
      ? raw.summary.trim()
      : title

  const detail = typeof raw.body === 'string' ? raw.body.trim() : ''

  const kindRaw = typeof raw.kind === 'string' ? raw.kind.trim() : 'function'
  if (!isBacklogKind(kindRaw)) {
    return c.json(
      { error: 'kind must be one of: ' + BACKLOG_KINDS.join(', ') },
      400,
    )
  }

  const now = new Date().toISOString()
  const id = typeof raw.id === 'string' && raw.id.trim().length > 0 ? raw.id.trim() : backlogItemId(title, Date.now())

  try {
    const item = await insertBacklogItem(db, {
      id,
      title,
      summary,
      body: detail,
      kind: kindRaw,
      createdAt: now,
    })
    return c.json({ item }, 201)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg.includes('UNIQUE') || msg.includes('unique')) {
      return c.json({ error: 'id_already_exists', id }, 409)
    }
    throw e
  }
})

export { backlog }
