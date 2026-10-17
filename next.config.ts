import type { NextConfig } from 'next'

import { env } from './env'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  typedRoutes: true,

  output: env.OUTPUT_MODE,

  experimental: {
    agentFeedback: true,

    // ux improvement
    cachedNavigations: true,

    // build output improvement
    turbopackCrossModuleConstants: true,
    turbopackChunking: { generateComponentChunks: true },
    serverMinification: true,
    turbopackCjsTreeShaking: true,
    turbopackCjsScopeHoisting: true,

    // DX improvement
    requestInsights: true,
    turbopackGc: true,

    // perf
    turbopackRustReactCompiler: true,
  },

  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
