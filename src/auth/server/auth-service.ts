import { AuthUser, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { AuthRepository } from '@/auth/server/auth-repository'
import { Result } from '@/helpers/result'

const signUpEmail = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  return await AuthRepository.signUpEmail(signUpInfo)
}

export const AuthService = {
  signUpEmail
}
