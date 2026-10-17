import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

import type { router } from '@/lib/orpc/router'

import { getSerializer } from './serializer'

type CustomRouterClient = RouterClient<typeof router>

const link = new RPCLink({
  url: '/rpc',
  // Resolved lazily per call, so the guard below throws at call time.
  origin: () => {
    // lib.dom declares window as always present, so typeof is the honest check.
    if (typeof window === 'undefined') {
      // Throw on the server: server calls must go through globalThis.$client
      throw new TypeError('oRPC RPCLink must not run on the server. use globalThis.$client.')
    }
    return location.origin
  },
  serializer: getSerializer(),
})

declare global {
  var $client: CustomRouterClient | undefined
}

/**
 * Prefer creating `createRouterClient(routes)` for server functions. See
 * `functions.ts` in `app/(app)/` for example. This variable exists only to
 * allow oRPC Tanstack integration to work in both server and client
 * environments without making a backend call via HTTP and use the router client
 * directly.
 */
const client: CustomRouterClient = globalThis.$client ?? createORPCClient(link)

export const orpcQuery = createTanstackQueryUtils(client)
