export async function register() {
  const { initLogger, log } = await import('evlog')
  initLogger({
    env: { service: 'my-app' },
  })

  // this is required mostly for runtime. I am not sure why, but having
  // this ensures that during navigations, correct oRPC client is selected.
  await import('@/lib/orpc/server-init')

  log.info('instrumentation', 'instrumentation is set up')
}
