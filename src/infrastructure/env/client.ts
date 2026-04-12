import { createEnv } from '@t3-oss/env-nextjs'

import { createRequiredEnvString } from '@/infrastructure/env/env-schemas'

export const CLIENT_ENV = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: createRequiredEnvString('NEXT_PUBLIC_APP_URL')
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
  }
})
