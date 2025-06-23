import { AuthUser, SignInError, SignInInfo, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { AuthRepository } from '@/auth/server/auth-repository'
import { Result } from '@/helpers/result'

const emailSignIn = async (signInInfo: SignInInfo): Promise<Result<SignInError, AuthUser>> => {
  return await AuthRepository.emailSignIn(signInInfo)
}

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  return await AuthRepository.emailSignUp(signUpInfo)
}

export const AuthService = {
  emailSignIn,
  emailSignUp
}
