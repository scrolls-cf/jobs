INSERT INTO backlog_items (
  id,
  title,
  summary,
  body,
  kind,
  vote_score,
  created_at,
  updated_at
)
VALUES (
  'designer-job-stack-kit',
  'scrollsdesigner: job-stack UI kit',
  'Ship job-stack.html, job-stack-form.html, and optional stack-reorder.mjs; sync to fleet via npm run sync:fleet.',
  'Designer ticket (blocks jobs board layout sprint until synced).

Deliverables in scrollsdesigner:
1. components/job-stack.html — ranked row: title, summary, vote +/- and score badge, repo + branch line, claim chip (available / @user), secondary action to start another worker.
2. components/job-stack-form.html — create/edit: title, summary, body, kind (function | api | design); DaisyUI 5 form goldpath ids.
3. src/animations/stack-reorder.mjs (optional) — list resort motion; honor prefers-reduced-motion; export from animations/index.mjs.

After merge: npm run build:css, commit, sync:fleet into scaffold and jobs. Jobs MVP backlog API is live; UI layouts wait on this kit.',
  'design',
  0,
  datetime('now'),
  datetime('now')
);
