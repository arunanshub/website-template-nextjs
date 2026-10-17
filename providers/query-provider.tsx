'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from 'react'

import { getQueryClient } from '@/lib/query'

export function TanstackQueryProvider({ children }: { children: ReactNode }) {
  // Not useState: without a Suspense boundary above, React would discard it on suspend
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
    </QueryClientProvider>
  )
}
