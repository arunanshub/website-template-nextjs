import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import 'server-only'

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
