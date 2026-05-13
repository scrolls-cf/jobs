/**
 * Small helpers aligned with context-engineering practices for Workers:
 * bound JSON payloads, stable error envelopes, UTF-8 byte accounting.
 * Not wired into routes by default — import where you return agent/tool JSON.
 */

const encoder = new TextEncoder()

export function utf8ByteLength(s: string): number {
  return encoder.encode(s).byteLength
}

export function jsonUtf8ByteLength(
  data: unknown,
  maxBytes = 1_000_000,
): { text: string; truncated: boolean } {
  const text = JSON.stringify(data)
  if (utf8ByteLength(text) <= maxBytes) {
    return { text, truncated: false }
  }
  return { text: '', truncated: true }
}

export function boundedJsonResponse(
  data: unknown,
  maxBytes = 512_000,
  init: ResponseInit = {},
): Response {
  const { text, truncated } = jsonUtf8ByteLength(data, maxBytes)
  if (!truncated) {
    return new Response(text, {
      ...init,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        ...init.headers,
      },
    })
  }
  const fallback = JSON.stringify({
    ok: false,
    error: 'payload_too_large',
    hint: 'Store large output in KV/R2/D1 and return a handle or summary.',
  })
  return new Response(fallback, {
    status: 413,
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...init.headers,
    },
  })
}
