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

// On the server this is the in-process router client; in the browser, an HTTP client
// to the current origin.
export const client: CustomRouterClient = globalThis.$client ?? createORPCClient(link)

export const orpcQuery = createTanstackQueryUtils(client)
