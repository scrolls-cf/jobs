export const BACKLOG_KINDS = ['function', 'api', 'design'] as const
export type BacklogKind = (typeof BACKLOG_KINDS)[number]

export type WorkClaim = {
  id: string
  itemId: string
  claimerId: string
  repoFullName: string
  branch: string
  workerName: string
  status: 'active' | 'released'
  claimedAt: string
}

export type BacklogItem = {
  id: string
  title: string
  summary: string
  body: string
  kind: BacklogKind
  voteScore: number
  createdAt: string
  updatedAt: string
  myVote: -1 | 0 | 1
  claims: WorkClaim[]
  claimLabel: string | null
  claimOthers: string | null
  claimState: 'available' | 'claimed'
  showSpawnWorker: boolean
  primaryRepo: string | null
  primaryBranch: string | null
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

export type WorkClaimRow = {
  id: string
  item_id: string
  claimer_id: string
  repo_full_name: string
  branch: string
  worker_name: string
  status: string
  claimed_at: string
}
