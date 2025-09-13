import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const CLIENT_ENV = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1, 'NEXT_PUBLIC_APP_URL is required')
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
  }
})

export const buildLocationUrl = (basePath: string, resourceKey: string): string => {
  return `${CLIENT_ENV.NEXT_PUBLIC_APP_URL}/api/${basePath}/${encodeURIComponent(resourceKey)}`
}
