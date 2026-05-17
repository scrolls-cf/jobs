export const BACKLOG_KINDS = ['function', 'api', 'design'] as const
export type BacklogKind = (typeof BACKLOG_KINDS)[number]

export type BacklogItem = {
  id: string
  title: string
  summary: string
  body: string
  kind: BacklogKind
  voteScore: number
  createdAt: string
  updatedAt: string
}

export type BacklogItemRow = {
  id: string
  title: string
  summary: string
  body: string
  kind: string
  vote_score: number
  created_at: string
  updated_at: string
}
