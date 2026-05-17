/** URL-safe id from title + time (no crypto required for MVP). */
export function backlogItemId(title: string, nowMs: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
  const base = slug.length > 0 ? slug : 'item'
  return `${base}-${nowMs.toString(36)}`
}
