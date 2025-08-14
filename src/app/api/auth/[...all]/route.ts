import { toNextJsHandler } from 'better-auth/next-js'

import { auth } from '@/auth/infrastructure/auth-lib'

export const { GET, POST } = toNextJsHandler(auth.handler)
