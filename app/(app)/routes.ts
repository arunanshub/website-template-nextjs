import 'server-only'

import { base } from '@/lib/orpc'

const routes = {
  fetchData: base.handler(async () => {
    // oxlint-disable-next-line typescript/strict-void-return no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return 'data from server'
  }),

  streamData: base.handler(async function* ({ signal, lastEventId }) {
    // oxlint-disable-next-line typescript/no-unnecessary-condition
    while (true) {
      signal?.throwIfAborted()
      const d = new Date()
      yield { message: 'Hello, world!', lastEventId, d }
      // oxlint-disable-next-line no-await-in-loop no-promise-executor-return typescript/strict-void-return
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }),
}

export default routes
