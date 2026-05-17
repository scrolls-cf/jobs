CREATE TABLE backlog_items (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL CHECK (kind IN ('function', 'api', 'design')),
  vote_score INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX backlog_items_rank ON backlog_items (vote_score DESC, updated_at DESC);
