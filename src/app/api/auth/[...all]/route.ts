import { toNextJsHandler } from 'better-auth/next-js'

import { auth } from '@/auth/auth-lib'

export const { GET, POST } = toNextJsHandler(auth.handler)
