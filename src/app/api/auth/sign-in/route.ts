import type { NextRequest } from 'next/server'

import { nextResponse } from '@/api/server'
import { AuthController } from '@/auth/server/auth-controller'

export const POST = async (request: NextRequest) => {
  return nextResponse(AuthController.emailSignIn(request))
}
