import { ApiClient } from '@/api/client'
import type { EmailSignInResponse, EmailSignUpResponse, SignInInfo, SignOutResponse, SignUpInfo, SocialProvider, SocialSignInResponse } from '@/auth/domain/auth-entities'
import { failure, success } from '@/helpers/result'

const emailSignIn = async (signInInfo: SignInInfo) => {
  try {
    const emailSignInResponse = await ApiClient.POST<EmailSignInResponse>('/auth/email-sign-in', signInInfo)

    if (emailSignInResponse.status === 'SUCCESS') {
      return success(emailSignInResponse.data)
    }

    switch (emailSignInResponse.errors) {
      case 'INVALID_CREDENTIALS':
        return failure('INVALID_CREDENTIALS')
      case 'NOT_FOUND':
        return failure('NOT_FOUND')
      case 'UNEXPECTED_ERROR':
        return failure()
      default:
        return failure(emailSignInResponse.errors)
    }
  } catch (error) {
    console.error('Email sign-in error:', error)
    return failure()
  }
}

const emailSignUp = async (signUpInfo: SignUpInfo) => {
  try {
    const emailSignUpResponse = await ApiClient.POST<EmailSignUpResponse>('/auth/email-sign-up', signUpInfo)

    if (emailSignUpResponse.status === 'SUCCESS') {
      return success(emailSignUpResponse.data)
    }

    switch (emailSignUpResponse.errors) {
      case 'USER_ALREADY_EXISTS':
        return failure('USER_ALREADY_EXISTS')
      case 'NOT_FOUND':
        return failure('NOT_FOUND')
      case 'UNEXPECTED_ERROR':
        return failure()
      default:
        return failure(emailSignUpResponse.errors)
    }
  } catch (error) {
    console.error('Email sign-up error:', error)
    return failure()
  }
}

const signOut = async () => {
  try {
    const signOutResponse = await ApiClient.POST<SignOutResponse>('/auth/sign-out')

    if (signOutResponse.status === 'SUCCESS') {
      return success()
    }

    return failure(signOutResponse.errors)
  } catch (error) {
    console.error('Sign out error:', error)
    return failure()
  }
}

const socialSignIn = async (provider: SocialProvider) => {
  try {
    const signInResponse = await ApiClient.POST<SocialSignInResponse>('/auth/social-sign-in', { provider })

    if (signInResponse.status === 'SUCCESS') {
      return success(signInResponse.data)
    }

    switch (signInResponse.errors) {
      case 'NOT_FOUND':
        return failure('NOT_FOUND')
      case 'UNEXPECTED_ERROR':
        return failure()
      default:
        return failure(signInResponse.errors)
    }
  } catch (error) {
    console.error('Social sign-in error:', error)
    return failure()
  }
}

export const AuthClient = {
  emailSignIn,
  emailSignUp,
  signOut,
  socialSignIn
}
