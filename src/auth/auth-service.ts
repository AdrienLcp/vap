import type { Unauthorized } from '@/api/api-domain'
import type { AuthUser, AuthUserError, SignInError, SignInInfo, SignUpError, SignUpInfo, SocialProvider } from '@/auth/domain/auth-entities'
import { AuthRepository } from '@/auth/auth-repository'
import { failure, success, type Result } from '@/helpers/result'

const emailSignIn = async (signInInfo: SignInInfo): Promise<Result<SignInError, AuthUser>> => {
  return await AuthRepository.emailSignIn(signInInfo)
}

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  return await AuthRepository.emailSignUp(signUpInfo)
}

const findUser = async (): Promise<Result<Unauthorized, AuthUser>> => {
  const userResult = await AuthRepository.findUser()

  if (userResult.status === 'ERROR') {
    return failure('UNAUTHORIZED')
  }

  return success(userResult.data)
}

const signOut = async (): Promise<Result<Unauthorized>> => {
  return await AuthRepository.signOut()
}

const socialSignIn = async (socialProvider: SocialProvider): Promise<Result<AuthUserError, AuthUser>> => {
  return await AuthRepository.socialSignIn(socialProvider)
}

export const AuthService = {
  emailSignIn,
  emailSignUp,
  findUser,
  signOut,
  socialSignIn
}
