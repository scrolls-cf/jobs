import type { BacklogItem, BacklogItemRow, BacklogKind } from './types'
import { BACKLOG_KINDS } from './types'

export function rowToItem(row: BacklogItemRow): BacklogItem {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    body: row.body,
    kind: row.kind as BacklogKind,
    voteScore: row.vote_score,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function listBacklogItems(db: D1Database): Promise<BacklogItem[]> {
  const result = await db
    .prepare(
      `SELECT id, title, summary, body, kind, vote_score, created_at, updated_at
       FROM backlog_items
       ORDER BY vote_score DESC, updated_at DESC`,
    )
    .all<BacklogItemRow>()
  return (result.results ?? []).map(rowToItem)
}

export async function insertBacklogItem(
  db: D1Database,
  input: {
    id: string
    title: string
    summary: string
    body: string
    kind: BacklogKind
    createdAt: string
  },
): Promise<BacklogItem> {
  const updatedAt = input.createdAt
  await db
    .prepare(
      `INSERT INTO backlog_items (id, title, summary, body, kind, vote_score, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 0, ?, ?)`,
    )
    .bind(input.id, input.title, input.summary, input.body, input.kind, input.createdAt, updatedAt)
    .run()
  return {
    id: input.id,
    title: input.title,
    summary: input.summary,
    body: input.body,
    kind: input.kind,
    voteScore: 0,
    createdAt: input.createdAt,
    updatedAt,
  }
}

export function isBacklogKind(value: string): value is BacklogKind {
  return (BACKLOG_KINDS as readonly string[]).includes(value)
}
