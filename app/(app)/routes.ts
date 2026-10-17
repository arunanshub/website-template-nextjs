import 'server-only'

import { base } from '@/lib/orpc/orpc'

const routes = {
  fetchData: base.handler(async () => {
    // oxlint-disable-next-line typescript/strict-void-return no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return 'data from server'
  }),
}

export default routes
