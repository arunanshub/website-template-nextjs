import { createLoggerStorage } from '@orpc/evlog/node'
import 'server-only'

export const { storage: loggerStorage, useLogger } = createLoggerStorage()
