/**
 * Short-lived `wrangler dev` for agents: binds only to SCAFFOLD_AGENT_VERIFY_PORT_MIN..MAX
 * (default 47910–47919), probes /health, tears down the process group, and asserts ports
 * are released (guards against orphaned workerd/wrangler).
 */
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(path.join(root, 'package.json'))
const wranglerJs = require.resolve('wrangler/bin/wrangler.js')

const PORT_MIN = Number(process.env.SCAFFOLD_AGENT_VERIFY_PORT_MIN ?? 47910)
const PORT_MAX = Number(process.env.SCAFFOLD_AGENT_VERIFY_PORT_MAX ?? 47919)
const STARTUP_MS = Number(process.env.SCAFFOLD_AGENT_VERIFY_STARTUP_MS ?? 60000)
const RELEASE_MS = Number(process.env.SCAFFOLD_AGENT_VERIFY_RELEASE_MS ?? 15000)

function assertPortRange() {
  if (
    !Number.isInteger(PORT_MIN) ||
    !Number.isInteger(PORT_MAX) ||
    PORT_MIN > PORT_MAX ||
    PORT_MAX - PORT_MIN + 1 !== 10
  ) {
    throw new Error(
      `Expected a 10-port inclusive range via SCAFFOLD_AGENT_VERIFY_PORT_MIN/MAX (got ${PORT_MIN}–${PORT_MAX})`,
    )
  }
}

function canBind(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.once('error', () => resolve(false))
    server.listen(port, '127.0.0.1', () => {
      server.close(() => resolve(true))
    })
  })
}

async function pickTwoPorts() {
  const available = []
  for (let p = PORT_MIN; p <= PORT_MAX; p++) {
    if (await canBind(p)) available.push(p)
  }
  if (available.length < 2) {
    throw new Error(
      `Need two free ports in ${PORT_MIN}–${PORT_MAX}. Close listeners in that range (reserved for agent verify).`,
    )
  }
  return { http: available[0], inspector: available[1] }
}

async function waitForHealth(port) {
  const url = `http://127.0.0.1:${port}/health`
  const deadline = Date.now() + STARTUP_MS
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2500) })
      if (res.ok) return
    } catch {
      /* retry */
    }
    await delay(300)
  }
  throw new Error(`Timed out after ${STARTUP_MS}ms waiting for ${url}`)
}

function killTree(child) {
  if (!child.pid) return
  if (process.platform === 'win32') {
    spawn('taskkill', ['/T', '/F', '/PID', String(child.pid)], {
      stdio: 'ignore',
      windowsHide: true,
    })
    return
  }
  try {
    process.kill(-child.pid, 'SIGTERM')
  } catch {
    try {
      child.kill('SIGTERM')
    } catch {
      /* ignore */
    }
  }
}

function forceKillTree(child) {
  if (!child.pid || process.platform === 'win32') return
  try {
    process.kill(-child.pid, 'SIGKILL')
  } catch {
    try {
      child.kill('SIGKILL')
    } catch {
      /* ignore */
    }
  }
}

function waitExit(child, ms) {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve('timeout'), ms)
    child.once('exit', (code, signal) => {
      clearTimeout(t)
      resolve({ code, signal })
    })
    child.once('error', () => {
      clearTimeout(t)
      resolve('error')
    })
  })
}

async function assertPortsReleased(http, inspector, label) {
  const deadline = Date.now() + RELEASE_MS
  while (Date.now() < deadline) {
    if ((await canBind(http)) && (await canBind(inspector))) return
    await delay(200)
  }
  throw new Error(
    `${label}: ports ${http} and/or ${inspector} still in use after teardown — possible orphaned wrangler/workerd. Check ${PORT_MIN}–${PORT_MAX}.`,
  )
}

function assertProcessGroupGone(pid) {
  if (process.platform === 'win32' || !pid) return
  try {
    process.kill(-pid, 0)
  } catch (e) {
    if (e && e.code === 'ESRCH') return
    return
  }
  throw new Error(`Process group ${pid} still exists after teardown — orphan risk.`)
}

async function main() {
  assertPortRange()
  const css = spawnSync('npm', ['run', 'build:css'], {
    cwd: root,
    stdio: 'inherit',
    shell: false,
  })
  if (css.status !== 0) process.exit(css.status ?? 1)

  const envFile = fs.existsSync(path.join(root, '.env')) ? '.env' : '.env.example'
  console.error(`[agent-verify] using --env-file ${envFile}`)

  const { http, inspector } = await pickTwoPorts()

  const child = spawn(
    process.execPath,
    [
      wranglerJs,
      'dev',
      '--env-file',
      envFile,
      '--port',
      String(http),
      '--inspector-port',
      String(inspector),
      '--show-interactive-dev-session',
      'false',
      '--log-level',
      'warn',
    ],
    {
      cwd: root,
      detached: true,
      stdio: 'ignore',
      env: { ...process.env },
    },
  )

  if (!child.pid) {
    throw new Error('Failed to spawn wrangler dev')
  }

  const pid = child.pid

  try {
    await waitForHealth(http)
    console.error(
      `[agent-verify] wrangler dev responded on 127.0.0.1:${http}/health (inspector ${inspector})`,
    )
  } finally {
    killTree(child)
  }

  let out = await waitExit(child, RELEASE_MS + 5000)
  if (out === 'timeout') {
    forceKillTree(child)
    out = await waitExit(child, 8000)
    if (out === 'timeout') {
      throw new Error('wrangler dev did not exit after SIGTERM/SIGKILL')
    }
  }

  await assertPortsReleased(http, inspector, 'Post-teardown')
  assertProcessGroupGone(pid)

  console.error('[agent-verify] wrangler dev teardown OK; ports released.')
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
