import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const clientEnvVariables = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1, 'NEXT_PUBLIC_APP_URL is required')
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
  }
})

export const buildLocationUrl = (basePath: string, resourceId: string): string => {
  return `${clientEnvVariables.NEXT_PUBLIC_APP_URL}/api/${basePath}/${encodeURIComponent(resourceId)}`
}
