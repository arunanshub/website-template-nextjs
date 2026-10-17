import { os } from '@orpc/server'
import type {
  RequestHeadersHandlerPluginContext,
  ResponseHeadersHandlerPluginContext,
} from '@orpc/server/plugins'

export interface ServerContext
  extends ResponseHeadersHandlerPluginContext, RequestHeadersHandlerPluginContext {}

export const base = os.$context<ServerContext>()
