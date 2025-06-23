import type { AuthUser, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { fetchApi } from '@/helpers/fetch'
import { Result } from '@/helpers/result'

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  return await fetchApi<SignUpError, AuthUser>('/auth/sign-up', 'POST', signUpInfo)
}

export const authApi = {
  emailSignUp
}
