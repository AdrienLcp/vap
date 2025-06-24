import { AuthUser, SignInError, SignInInfo, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { SignInRequestBodySchema, SignUpRequestBodySchema } from '@/auth/domain/auth-schema'
import { AuthService } from '@/auth/server/auth-service'
import { badRequestResult, ControllerResult, createdResult, internalServerErrorResult, okResult } from '@/helpers/controller-result'

const emailSignIn = async (request: Request): Promise<ControllerResult<SignInError, AuthUser>> => {
  const body = await request.json()

  const signInBodyResult = SignInRequestBodySchema.safeParse(body)

  if (signInBodyResult.error) {
    return badRequestResult('UNEXPECTED_ERROR')
  }

  const signInInfo: SignInInfo = signInBodyResult.data
  
  const signInResult = await AuthService.emailSignIn(signInInfo)

  if (signInResult.status === 'ERROR') {
    return internalServerErrorResult(signInResult.errors)
  }

  return okResult(signInResult.data)
}

const emailSignUp = async (request: Request): Promise<ControllerResult<SignUpError, AuthUser>> => {
  const body = await request.json()

  const signUpBodyResult = SignUpRequestBodySchema.safeParse(body)

  if (signUpBodyResult.error) {
    return badRequestResult('INVALID_EMAIL')
  }

  const signUpInfo: SignUpInfo = signUpBodyResult.data
  
  const signUpResult = await AuthService.emailSignUp(signUpInfo)

  if (signUpResult.status === 'ERROR') {
    return internalServerErrorResult(signUpResult.errors)
  }

  return createdResult(signUpResult.data)
}

export const AuthController = {
  emailSignIn,
  emailSignUp
}
