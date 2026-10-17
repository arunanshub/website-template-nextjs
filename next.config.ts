import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,

  experimental: {
    agentFeedback: true,

    // build output improvement
    turbopackCrossModuleConstants: true,
    turbopackChunking: { generateComponentChunks: true },

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
