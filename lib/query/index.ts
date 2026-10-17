import { QueryClient, defaultShouldDehydrateQuery, environmentManager } from '@tanstack/react-query'
import { cache } from 'react'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // > 0 so the client doesn't refetch immediately after hydration
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // Next.js relies on its own errors to detect dynamic rendering; don't redact them
        shouldRedactErrors: () => false,
        // include pending queries so un-awaited prefetches stream to the client
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export const getQueryClient = cache(() => {
  // Server: a fresh client per request, so data never leaks between users
  if (environmentManager.isServer()) {
    return makeQueryClient()
  }

  // Browser: reuse one client, so React suspending during the first render doesn't drop it
  browserQueryClient ??= makeQueryClient()
  return browserQueryClient
})
