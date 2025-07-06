import type { SignInInfo, SignInResult, SignUpInfo, SignUpResult } from '@/auth/domain/auth-entities'
import { fetchApi } from '@/helpers/api'

const emailSignIn = async (signInInfo: SignInInfo) => {
  return await fetchApi<SignInResult>('/auth/sign-in', 'POST', signInInfo)
}

const emailSignUp = async (signUpInfo: SignUpInfo) => {
  return await fetchApi<SignUpResult>('/auth/sign-up', 'POST', signUpInfo)
}

export const authApi = {
  emailSignIn,
  emailSignUp
}
