import type { AuthUser, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { fetchApi } from '@/helpers/fetch'
import { Result } from '@/helpers/result'

const authApiRoute = '/api/auth'

const signUpWithEmailAndPassword = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  return await fetchApi<SignUpError, AuthUser>(`${authApiRoute}/sign-up`, 'POST', signUpInfo)
}

export const authApi = {
  signUpWithEmailAndPassword
}
