import { ApiClient } from '@/api/client'
import type { EmailSignInResponse, EmailSignUpResponse, SignInInfo, SignUpInfo } from '@/auth/domain/auth-entities'

const emailSignIn = async (signInInfo: SignInInfo) => {
  return await ApiClient.POST<EmailSignInResponse>('/auth/sign-in', signInInfo)
}

const emailSignUp = async (signUpInfo: SignUpInfo) => {
  return await ApiClient.POST<EmailSignUpResponse>('/auth/sign-up', signUpInfo)
}

export const authApi = {
  emailSignIn,
  emailSignUp
}
