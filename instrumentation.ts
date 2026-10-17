export async function register() {
  const { initLogger, log } = await import('evlog')
  initLogger({
    env: { service: 'my-app' },
  })

  await import('@/lib/orpc/server-init')

  log.info('instrumentation', 'instumentation is set up')
}
