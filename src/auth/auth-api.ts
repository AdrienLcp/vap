import { ApiClient } from '@/api/client'
import type { EmailSignInResponse, EmailSignUpResponse, SignInInfo, SignUpInfo, SocialProvider, SocialSignInResponse } from '@/auth/domain/auth-entities'

const emailSignIn = async (signInInfo: SignInInfo) => {
  return await ApiClient.POST<EmailSignInResponse>('/auth/email-sign-in', signInInfo)
}

const emailSignUp = async (signUpInfo: SignUpInfo) => {
  return await ApiClient.POST<EmailSignUpResponse>('/auth/email-sign-up', signUpInfo)
}

const socialSignIn = async (provider: SocialProvider) => {
  return await ApiClient.POST<SocialSignInResponse>('/auth/social-sign-in', { provider })
}

export const authApi = {
  emailSignIn,
  emailSignUp,
  socialSignIn
}
