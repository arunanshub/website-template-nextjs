import { createRouterClient } from '@orpc/server'
import { setTimeout } from 'node:timers/promises'
import 'server-only'

import { base } from '@/lib/orpc/orpc'

const routes = {
  getName: base.handler(async () => {
    await setTimeout(1000)

    return 'name is foo from server'
  }),
}

export const r = createRouterClient(routes)
