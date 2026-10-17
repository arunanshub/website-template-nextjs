export async function register() {
  const { initLogger, log } = await import('evlog')
  initLogger({
    env: { service: 'my-app' },
  })

  log.info('instrumentation', 'instrumentation is set up')
}
