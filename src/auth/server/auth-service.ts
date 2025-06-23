import { AuthUser, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { AuthRepository } from '@/auth/server/auth-repository'
import { Result } from '@/helpers/result'

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  return await AuthRepository.emailSignUp(signUpInfo)
}

export const AuthService = {
  emailSignUp
}
