import { createEnv } from '@t3-oss/env-nextjs'
import * as v from 'valibot'

export const env = createEnv({
  server: {
    OUTPUT_MODE: v.optional(v.literal('standalone')),
  },

  shared: {
    NODE_ENV: v.picklist(['development', 'production', 'test']),
  },

  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
})
