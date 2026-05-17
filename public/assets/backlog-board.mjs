import { stackReorder } from '../js/animations/index.mjs'

/**
 * @param {HTMLElement} li
 * @param {{
 *   id: string
 *   title: string
 *   summary: string
 *   kind: string
 *   voteScore?: number
 *   repo?: string
 *   branch?: string
 *   claimState?: 'available' | 'claimed'
 *   claimLabel?: string
 *   claimOthers?: string
 *   showSpawnWorker?: boolean
 * }} item
 */
export function fillBacklogRow(li, item) {
  const score = item.voteScore ?? 0
  const claimState = item.claimState ?? 'available'
  const repo = item.repo?.trim() ?? ''
  const branch = item.branch?.trim() ?? ''

  li.dataset.backlogId = item.id
  li.dataset.title = item.title
  li.dataset.summary = item.summary
  li.dataset.kind = item.kind
  li.dataset.score = String(score)
  li.dataset.repo = repo
  li.dataset.branch = branch
  li.dataset.claimState = claimState

  const titleEl = li.querySelector('[data-title]')
  const summaryEl = li.querySelector('[data-summary]')
  const kindEl = li.querySelector('[data-kind]')
  const scoreEls = li.querySelectorAll('[data-score]')
  if (titleEl) titleEl.textContent = item.title
  if (summaryEl) summaryEl.textContent = item.summary
  if (kindEl) kindEl.textContent = item.kind
  for (const el of scoreEls) el.textContent = String(score)

  const repoEl = li.querySelector('[data-repo]')
  const branchEl = li.querySelector('[data-branch]')
  if (repoEl) {
    repoEl.textContent = repo
    repoEl.hidden = repo.length === 0
  }
  if (branchEl) {
    branchEl.textContent = branch
    branchEl.hidden = branch.length === 0
  }

  const chip = li.querySelector('[data-claim-chip]')
  if (chip) {
    if (claimState === 'claimed' && item.claimLabel) {
      chip.textContent = item.claimLabel
      chip.className = 'badge badge-sm border-accent/30 bg-accent/15 text-accent'
    } else {
      chip.textContent = 'available'
      chip.className =
        'badge badge-sm badge-outline border-base-content/20 text-base-content/70'
    }
  }

  const others = li.querySelector('[data-claim-others]')
  if (others) {
    const extra = item.claimOthers?.trim() ?? ''
    if (extra.length > 0) {
      others.textContent = extra
      others.hidden = false
    } else {
      others.hidden = true
    }
  }

  const spawn = li.querySelector('[data-action-spawn-worker]')
  if (spawn) {
    const show = Boolean(item.showSpawnWorker)
    spawn.hidden = !show
    spawn.classList.toggle('hidden', !show)
  }
}

/**
 * @param {HTMLElement} listEl
 * @param {HTMLTemplateElement} template
 * @param {Parameters<typeof fillBacklogRow>[1][]} items
 * @param {{ animate?: boolean; onActivate: (item: unknown, li: HTMLElement) => void }} opts
 */
export function paintBacklogList(listEl, template, items, { animate = false, onActivate }) {
  const sorted = [...items].sort((a, b) => {
    const ds = (b.voteScore ?? 0) - (a.voteScore ?? 0)
    if (ds !== 0) return ds
    return String(b.updatedAt ?? '').localeCompare(String(a.updatedAt ?? ''))
  })

  const render = () => {
    listEl.replaceChildren()
    for (const item of sorted) {
      const node = template.content.cloneNode(true)
      const li = /** @type {HTMLElement} */ (node.querySelector('[data-backlog-row]'))
      fillBacklogRow(li, item)
      wireBacklogRow(li, item, onActivate)
      listEl.appendChild(node)
    }
  }

  if (animate && listEl.children.length > 1) {
    stackReorder(listEl, render)
  } else {
    render()
  }
}

/**
 * @param {HTMLElement} li
 * @param {unknown} item
 * @param {(item: unknown, li: HTMLElement) => void} onActivate
 */
function wireBacklogRow(li, item, onActivate) {
  const activate = () => onActivate(item, li)
  li.addEventListener('click', (e) => {
    const t = /** @type {HTMLElement} */ (e.target)
    if (t.closest('[data-vote-up], [data-vote-down], [data-action-spawn-worker]')) return
    activate()
  })
  li.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      activate()
    }
  })

  for (const btn of li.querySelectorAll('[data-vote-up], [data-vote-down]')) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      e.preventDefault()
    })
  }
  const spawn = li.querySelector('[data-action-spawn-worker]')
  spawn?.addEventListener('click', (e) => {
    e.stopPropagation()
    e.preventDefault()
  })
}
