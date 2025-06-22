import { NextRequest } from 'next/server'

import { AuthUser, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { SignUpRequestBodySchema } from '@/auth/domain/auth-schema'
import { AuthService } from '@/auth/server/auth-service'
import { badRequestResult, ControllerResult, createdResult, internalServerErrorResult } from '@/helpers/controller-result'

const signUpEmail = async (request: NextRequest): Promise<ControllerResult<SignUpError, AuthUser>> => {
  const body = await request.json()

  const signUpBodyResult = SignUpRequestBodySchema.safeParse(body)

  if (signUpBodyResult.error) {
    return badRequestResult('INVALID_EMAIL')
  }

  const signUpInfo: SignUpInfo = signUpBodyResult.data
  
  const signUpResult = await AuthService.signUpEmail(signUpInfo)

  if (signUpResult.status === 'ERROR') {
    return internalServerErrorResult(signUpResult.errors)
  }

  return createdResult(signUpResult.data)
}

export const AuthController = {
  signUpEmail
}
