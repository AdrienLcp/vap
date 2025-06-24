import type { AuthUser, SignInError, SignInInfo, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { fetchApi } from '@/helpers/fetch'
import { Result } from '@/helpers/result'

const emailSignIn = async (signInInfo: SignInInfo): Promise<Result<SignInError, AuthUser>> => {
  return await fetchApi<SignInError, AuthUser>('/auth/sign-in', 'POST', signInInfo)
}

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  return await fetchApi<SignUpError, AuthUser>('/auth/sign-up', 'POST', signUpInfo)
}

export const authApi = {
  emailSignIn,
  emailSignUp
}
