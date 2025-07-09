import type { NextRequest } from 'next/server'

import { nextResponse } from '@/api/server'
import { AuthController } from '@/auth/auth-controller'

export const POST = (request: NextRequest) => {
  return nextResponse(AuthController.emailSignUp(request))
}
