CREATE TABLE backlog_votes (
  item_id TEXT NOT NULL REFERENCES backlog_items (id) ON DELETE CASCADE,
  voter_id TEXT NOT NULL,
  value INTEGER NOT NULL CHECK (value IN (-1, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (item_id, voter_id)
);

CREATE TABLE work_claims (
  id TEXT NOT NULL PRIMARY KEY,
  item_id TEXT NOT NULL REFERENCES backlog_items (id) ON DELETE CASCADE,
  claimer_id TEXT NOT NULL,
  repo_full_name TEXT NOT NULL DEFAULT '',
  branch TEXT NOT NULL DEFAULT 'master',
  worker_name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'released')),
  claimed_at TEXT NOT NULL
);

CREATE INDEX work_claims_item_active ON work_claims (item_id, status);

CREATE TABLE backlog_revisions (
  id TEXT NOT NULL PRIMARY KEY,
  item_id TEXT NOT NULL REFERENCES backlog_items (id) ON DELETE CASCADE,
  editor_id TEXT NOT NULL,
  snapshot_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX backlog_revisions_item ON backlog_revisions (item_id, created_at DESC);
