import type { NextRequest } from 'next/server'

import { AuthController } from '@/auth/server/auth-controller'
import { nextResponse } from '@/lib/next'

export const POST = async (request: NextRequest) => {
  const result = await AuthController.emailSignIn(request)
  return nextResponse(result)
}
