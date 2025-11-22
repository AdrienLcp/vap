import { CLIENT_ENV } from '@/infrastructure/env/client'

export const buildLocationUrl = (basePath: string, resourceKey: string): string => {
  return `${CLIENT_ENV.NEXT_PUBLIC_APP_URL}/api/${basePath}/${encodeURIComponent(resourceKey)}`
}
