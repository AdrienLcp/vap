import { createAuthClient } from 'better-auth/react'

import type { Unauthorized } from '@/api/api-domain'
import { ApiClient } from '@/api/api-client'
import { AUTH_API_ROUTES } from '@/auth/auth-api-routes'
import type { AuthUserDTO, AuthUserError, AuthUserResponse, SignInError, SignInInfo, SignUpError, SignUpInfo, SocialProvider } from '@/auth/domain/auth-entities'
import { failure, type Result, success, unknownError } from '@/helpers/result'

export const betterAuthClient = createAuthClient()

const findUser = async (): Promise<Result<AuthUserError, AuthUserDTO>> => {
  try {
    const userResponse = await ApiClient.GET<AuthUserResponse>(AUTH_API_ROUTES.user)

    if (userResponse.status === 'SUCCESS') {
      return success(userResponse.data)
    }

    switch (userResponse.errors) {
      case 'UNAUTHORIZED':
        return failure('UNAUTHORIZED')
      case 'INTERNAL_SERVER_ERROR':
      case 'UNEXPECTED_ERROR':
      default:
        return unknownError('User fetch error:', userResponse.errors)
    }
  } catch (error) {
    return unknownError('User fetch error:', error)
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
          return unknownError('Email sign-in error:', emailSignInResponse.error)
      }
    }

    return await findUser()
  } catch (error) {
    return unknownError('Email sign-in error:', error)
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
          return unknownError('Email sign-up error:', emailSignUpResponse.error)
      }
    }

    return await findUser()
  } catch (error) {
    return unknownError('Email sign-up error:', error)
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
    return unknownError('Sign out error:', error)
  }
}

const socialSignIn = async (provider: SocialProvider): Promise<Result<AuthUserError, AuthUserDTO>> => {
  try {
    const signInResponse = await betterAuthClient.signIn.social({ provider })

    if (signInResponse.error) {
      return unknownError('Social sign-in error:', signInResponse.error)
    }

    return await findUser()
  } catch (error) {
    return unknownError('Social sign-in error:', error)
  }
}

export const AuthClient = {
  emailSignIn,
  emailSignUp,
  findUser,
  signOut,
  socialSignIn
}
