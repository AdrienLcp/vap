import { ApiClient } from '@/api/client'
import type { SignInInfo, SignInResponse, SignUpInfo, SignUpResponse } from '@/auth/domain/auth-entities'

const emailSignIn = async (signInInfo: SignInInfo) => {
  return await ApiClient.POST<SignInResponse>('/auth/sign-in', signInInfo)
}

const emailSignUp = async (signUpInfo: SignUpInfo) => {
  return await ApiClient.POST<SignUpResponse>('/auth/sign-up', signUpInfo)
}

export const authApi = {
  emailSignIn,
  emailSignUp
}
