/**
 * This initializes the oRPC server-side client. This allows the server to call
 * its own oRPC routes without going through a fetch call to itself, and instead
 * becomes a normal function call.
 *
 * This should end up in build output. The simplest way to do so is to import it in
 * `app/layout.tsx`.
 *
 * @link https://orpc.dev/blog/stop-fetching-from-yourself
 */
import { createRouterClient } from '@orpc/server'
import 'server-only'

import type { ServerContext } from '.'
import { router } from './router'

globalThis.$client = createRouterClient(router, {
  context: async () => ({}) satisfies ServerContext,
})
