import { isLocalDevHost } from '../fleet-gateway/is-local-dev-host'

const ACCESS_EMAIL = 'cf-access-authenticated-user-email'

export class ActorRequiredError extends Error {
  readonly code = 'actor_required'
  constructor() {
    super('signed-in user required')
  }
}

/** Identity from Cloudflare Access (prod) or X-Jobs-Actor on localhost only. */
export function actorIdFromRequest(request: Request): string {
  const email = request.headers.get(ACCESS_EMAIL)?.trim()
  if (email) return email

  const url = new URL(request.url)
  if (isLocalDevHost(url.hostname)) {
    const dev = request.headers.get('X-Jobs-Actor')?.trim()
    if (dev) return dev
    return 'local-dev'
  }

  throw new ActorRequiredError()
}
