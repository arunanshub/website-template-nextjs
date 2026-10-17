import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import 'server-only'

import { TanstackQueryProvider } from './query-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ThemeProvider>
  )
}
