import { createAuthClient } from 'better-auth/react'

import type { Unauthorized } from '@/api/api-domain'
import { ApiClient } from '@/api/client'
import type { AuthUserDTO, AuthUserError, AuthUserResponse, SignInError, SignInInfo, SignUpError, SignUpInfo, SocialProvider } from '@/auth/domain/auth-entities'
import { failure, type Result, success } from '@/helpers/result'

export const betterAuthClient = createAuthClient()

const findUser = async (): Promise<Result<AuthUserError, AuthUserDTO>> => {
  try {
    const userResponse = await ApiClient.GET<AuthUserResponse>('/auth/user')

    if (userResponse.status === 'ERROR') {
      return failure(userResponse.errors)
    }

    return success(userResponse.data)
  } catch (error) {
    console.error('Sign out error:', error)
    return failure()
  }
}

const emailSignIn = async (signInInfo: SignInInfo): Promise<Result<SignInError, AuthUserDTO>> => {
  try {
    const emailSignInResponse = await betterAuthClient.signIn.email({
      email: signInInfo.email,
      password: signInInfo.password
    })

    if (emailSignInResponse.error) {
      switch (emailSignInResponse.error.code) {
        case 'INVALID_EMAIL_OR_PASSWORD':
          return failure('INVALID_CREDENTIALS')
        default:
          console.error('Unexpected error during email sign-in:', emailSignInResponse.error)
          return failure()
      }
    }

    return await findUser()
  } catch (error) {
    console.error('Email sign-in error:', error)
    return failure()
  }
}

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUserDTO>> => {
  try {
    const emailSignUpResponse = await betterAuthClient.signUp.email({
      email: signUpInfo.email,
      name: signUpInfo.name,
      password: signUpInfo.password
    })

    if (emailSignUpResponse.error) {
      switch (emailSignUpResponse.error.code) {
        case 'PASSWORD_TOO_SHORT':
          return failure('PASSWORD_TOO_SHORT')
        case 'USER_ALREADY_EXISTS':
          return failure('USER_ALREADY_EXISTS')
        default:
          console.error('Unexpected error during email sign-up:', emailSignUpResponse.error)
          return failure()
      }
    }

    return await findUser()
  } catch (error) {
    console.error('Email sign-up error:', error)
    return failure()
  }
}

const signOut = async (): Promise<Result<Unauthorized>> => {
  try {
    const signOutResponse = await betterAuthClient.signOut()

    if (signOutResponse.error) {
      console.error('Sign out error:', signOutResponse.error)
      return failure('UNAUTHORIZED')
    }

    return success()
  } catch (error) {
    console.error('Sign out error:', error)
    return failure()
  }
}

const socialSignIn = async (provider: SocialProvider) => {
  try {
    const signInResponse = await betterAuthClient.signIn.social({ provider })

    if (signInResponse.error) {
      console.error('Social sign-in error:', signInResponse.error)
      return failure()
    }

    return await findUser()
  } catch (error) {
    console.error('Social sign-in error:', error)
    return failure()
  }
}

export const AuthClient = {
  emailSignIn,
  emailSignUp,
  findUser,
  signOut,
  socialSignIn
}
