import { AuthUser, SignInError, SignUpError } from '@/auth/domain/auth-entities'
import { SignInInfoSchema, SignUpInfoSchema } from '@/auth/domain/auth-schema'
import { AuthService } from '@/auth/server/auth-service'
import { badRequestResult, ControllerResult, createdResult, internalServerErrorResult, okResult } from '@/helpers/controller-result'

const emailSignIn = async (request: Request): Promise<ControllerResult<SignInError, AuthUser>> => {
  const requestBody = await request.json()
  const signInInfoResult = SignInInfoSchema.safeParse(requestBody)

  if (signInInfoResult.error) {
    return badRequestResult('UNEXPECTED_ERROR')
  }
  
  const signInResult = await AuthService.emailSignIn(signInInfoResult.data)

  if (signInResult.status === 'ERROR') {
    return internalServerErrorResult(signInResult.errors)
  }

  return okResult(signInResult.data)
}

const emailSignUp = async (request: Request): Promise<ControllerResult<SignUpError, AuthUser>> => {
  const requestBody = await request.json()
  const signUpInfoResult = SignUpInfoSchema.safeParse(requestBody)

  if (signUpInfoResult.error) {
    return badRequestResult('INVALID_EMAIL')
  }
  
  const signUpResult = await AuthService.emailSignUp(signUpInfoResult.data)

  if (signUpResult.status === 'ERROR') {
    return internalServerErrorResult(signUpResult.errors)
  }

  return createdResult(signUpResult.data)
}

export const AuthController = {
  emailSignIn,
  emailSignUp
}
