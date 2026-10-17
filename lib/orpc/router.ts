/**
 * Aggregate all the routers here.
 */
import 'server-only'

import { base } from './orpc'

export const router = {
  index: base.lazy(async () => import('@/app/(app)/routes')),
}
