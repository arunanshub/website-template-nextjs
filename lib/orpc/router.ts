/**
 * Aggregate all the routers here.
 */
import 'server-only'

import { base } from '.'

export const router = {
  index: base.lazy(async () => import('@/app/(app)/routes')),
}
