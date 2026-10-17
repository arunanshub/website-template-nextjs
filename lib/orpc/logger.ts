import { createLoggerStorage } from '@orpc/evlog/node'
import 'server-only'

const { storage: loggerStorage, useLogger } = createLoggerStorage()

export function getLoggerStorage() {
  return loggerStorage
}

export default { useLogger }
