import type { NextRequest } from 'next/server'

import { AuthController } from '@/auth/server/auth-controller'
import { nextResponse } from '@/lib/next'

export const POST = async (request: NextRequest) => {
  return nextResponse(AuthController.emailSignIn(request))
}
