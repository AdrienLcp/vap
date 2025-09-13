import 'server-only'

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const SERVER_ENV = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: {
    AUTH_GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID,
    AUTH_GOOGLE_CLIENT_SECRET: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL
  },
  server: {
    AUTH_GOOGLE_CLIENT_ID: z.string().min(1, 'AUTH_GOOGLE_CLIENT_ID is required'),
    AUTH_GOOGLE_CLIENT_SECRET: z.string().min(1, 'AUTH_GOOGLE_CLIENT_SECRET is required'),
    BETTER_AUTH_SECRET: z.string().min(1, 'BETTER_AUTH_SECRET is required'),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required')
  }
})
