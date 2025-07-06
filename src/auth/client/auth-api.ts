import { fetchApi } from '@/api/client'
import type { SignInInfo, SignInResponse, SignUpInfo, SignUpResponse } from '@/auth/domain/auth-entities'

const emailSignIn = async (signInInfo: SignInInfo) => {
  return await fetchApi<SignInResponse>('/auth/sign-in', 'POST', signInInfo)
}

const emailSignUp = async (signUpInfo: SignUpInfo) => {
  return await fetchApi<SignUpResponse>('/auth/sign-up', 'POST', signUpInfo)
}

export const authApi = {
  emailSignIn,
  emailSignUp
}
