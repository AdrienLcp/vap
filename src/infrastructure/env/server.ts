import 'server-only'

import { createEnv } from '@t3-oss/env-nextjs'

import { createRequiredEnvString } from '@/infrastructure/env/env-schemas'

export const SERVER_ENV = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: {
    AUTH_GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID,
    AUTH_GOOGLE_CLIENT_SECRET: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL
  },
  server: {
    AUTH_GOOGLE_CLIENT_ID: createRequiredEnvString('AUTH_GOOGLE_CLIENT_ID'),
    AUTH_GOOGLE_CLIENT_SECRET: createRequiredEnvString('AUTH_GOOGLE_CLIENT_SECRET'),
    BETTER_AUTH_SECRET: createRequiredEnvString('BETTER_AUTH_SECRET'),
    DATABASE_URL: createRequiredEnvString('DATABASE_URL')
  }
})
