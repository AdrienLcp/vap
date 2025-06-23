import { type NextRequest, NextResponse } from 'next/server'

import { AuthController } from '@/auth/server/auth-controller'

export const POST = async (request: NextRequest) => {
  const result = await AuthController.emailSignUp(request)
  return NextResponse.json(result)
}
