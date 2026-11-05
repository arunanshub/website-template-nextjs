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
    turbopackPluginRuntimeStrategy: 'workerThreads',
    cssChunking: { type: 'graph' },

    // DX improvement
    requestInsights: true,
    turbopackGc: true,
    serverComponentsHmrCancellation: true,
    turbopackLazyDynamicImports: true,
    memoryBasedWorkersCount: true,
    workerThreads: true,
    turbopackImportTypeBytes: true,

    // perf
    turbopackRustReactCompiler: true,
  },

  turbopack: {
    rules: {
      '*.css': {
        // Own CSS only: `as: '*.css'` would turn a package's `*.module.css`
        // into plain CSS.
        condition: { not: 'foreign' },
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
