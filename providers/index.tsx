import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import 'server-only'

import { TanstackQueryProvider } from './query-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ThemeProvider>
  )
}
