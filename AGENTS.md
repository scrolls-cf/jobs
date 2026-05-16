# Agent notes (scaffold)

## Verify compile or dev server without blocking a human session

Do **not** run `npm run dev` for a quick compile or “does it boot?” check. That starts a long-lived `wrangler dev` on the default port and ties up a terminal.

Use the **agent-only** npm scripts instead. They exit when done and keep local I/O on a **reserved 10-port block** so they are less likely to collide with a developer’s normal `wrangler dev`.

| Goal | Command |
|------|---------|
| CSS / static build only | `npm run agent:verify:build` |
| Build + short-lived `wrangler dev` + `/health` probe + teardown checks | `npm run agent:verify:dev` |
| Both | `npm run agent:verify` |

### Port reservation

`agent:verify:dev` uses **`SCAFFOLD_AGENT_VERIFY_PORT_MIN` / `SCAFFOLD_AGENT_VERIFY_PORT_MAX`**, default **`47910`–`47919`** (exactly ten ports). Humans should avoid binding services in that range locally.

Optional tuning:

- `SCAFFOLD_AGENT_VERIFY_STARTUP_MS` — wait for `/health` (default `60000`).
- `SCAFFOLD_AGENT_VERIFY_RELEASE_MS` — wait for ports to free after kill (default `15000`).

`agent:verify:dev` passes **`--env-file .env`** when that file exists; otherwise **`.env.example`** so automated checks can boot without copying secrets into `.env`.

### What `agent:verify:dev` asserts

After a successful `/health` response it sends **SIGTERM** to the **process group**, waits for exit, escalates to **SIGKILL** if needed, then checks that the chosen HTTP and inspector ports can be bound again and that the process group is gone (reduces orphaned `workerd` / `wrangler` risk).

Implementation: `scripts/agent-verify-wrangler-dev.mjs`.
