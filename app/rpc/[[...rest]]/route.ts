import { EvlogHandlerPlugin } from '@orpc/evlog'
import { RPCHandler } from '@orpc/server/fetch'
import { RequestHeadersHandlerPlugin, ResponseHeadersHandlerPlugin } from '@orpc/server/plugins'

import { getLoggerStorage } from '@/lib/orpc/logger'
import { router } from '@/lib/orpc/router'
import { getSerializer } from '@/lib/orpc/serializer'

const handler = new RPCHandler(router, {
  plugins: [
    // request and response headers, plus gives us cookie support via
    // https://orpc.dev/docs/helpers/cookie
    new ResponseHeadersHandlerPlugin(),
    new RequestHeadersHandlerPlugin(),

    // One wide event per request; errors are logged on it (warn for ORPCError, error otherwise)
    new EvlogHandlerPlugin({ logAbort: true, storage: getLoggerStorage() }),
  ],
  serializer: getSerializer(),
})

async function handleRequest(request: Request) {
  const { response } = await handler.handle(request, { prefix: '/rpc' })
  return response ?? new Response('Not found', { status: 404 })
}

export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest
