import type { AuthUser, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { fetchApi } from '@/helpers/fetch'
import { Result } from '@/helpers/result'

const signUpEmail = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  return await fetchApi<SignUpError, AuthUser>('/auth/sign-up', 'POST', signUpInfo)
}

export const authApi = {
  signUpEmail
}
