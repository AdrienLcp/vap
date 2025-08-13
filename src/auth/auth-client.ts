'use client'

import { createAuthClient } from 'better-auth/react'

import type { AuthUserDTO, AuthUserError, AuthUserResponse, ChangePasswordInfo, SignInError, SignInInfo, SignUpError, SignUpInfo, SocialProvider } from '@/auth/domain/auth-entities'
import { failure, type Result, success, unexpectedError } from '@/helpers/result'
import { ApiClient } from '@/infrastructure/api/api-client'
import type { Unauthorized } from '@/infrastructure/api/api-domain'

export const betterAuthClient = createAuthClient()

const changeEmail = async (newEmail: string): Promise<Result<Unauthorized>> => {
  try {
    const changeEmailResponse = await betterAuthClient.changeEmail({ newEmail })

    if (changeEmailResponse.error) {
      switch (changeEmailResponse.error.code) {
        default:
          return unexpectedError('Change email error:', changeEmailResponse.error)
      }
    }

    return success()
  } catch (error) {
    return unexpectedError('Change email error:', error)
  }
}

type ChangePasswordError = 'INVALID_PASSWORD' | 'PASSWORD_TOO_SHORT'

const changePassword = async (changePasswordInfo: ChangePasswordInfo): Promise<Result<ChangePasswordError>> => {
  try {
    const changeEmailResponse = await betterAuthClient.changePassword({
      currentPassword: changePasswordInfo.currentPassword,
      newPassword: changePasswordInfo.newPassword,
      revokeOtherSessions: true
    })

    if (changeEmailResponse.error) {
      switch (changeEmailResponse.error.code) {
        case 'INVALID_PASSWORD':
          return failure('INVALID_PASSWORD')
        case 'PASSWORD_TOO_SHORT':
          return failure('PASSWORD_TOO_SHORT')
        default:
          return unexpectedError('Change password error:', changeEmailResponse.error)
      }
    }

    return success()
  } catch (error) {
    return unexpectedError('Change password error:', error)
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
          return unexpectedError('Email sign-in error:', emailSignInResponse.error)
      }
    }

    return await findUser()
  } catch (error) {
    return unexpectedError('Email sign-in error:', error)
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
          return unexpectedError('Email sign-up error:', emailSignUpResponse.error)
      }
    }

    return await findUser()
  } catch (error) {
    return unexpectedError('Email sign-up error:', error)
  }
}

const deleteUser = async (password: string): Promise<Result<Unauthorized>> => {
  try {
    const deleteUserResponse = await betterAuthClient.deleteUser({ password })

    if (deleteUserResponse.error) {
      switch (deleteUserResponse.error.code) {
        default:
          console.error('Delete user error:', deleteUserResponse.error)
          return failure('UNAUTHORIZED')
      }
    }

    return success()
  } catch (error) {
    return unexpectedError('Delete user error:', error)
  }
}

const findUser = async (): Promise<Result<AuthUserError, AuthUserDTO>> => {
  try {
    const userResponse = await ApiClient.GET<AuthUserResponse>('/auth/user')

    if (userResponse.status === 'SUCCESS') {
      return success(userResponse.data)
    }

    switch (userResponse.errors) {
      case 'UNAUTHORIZED':
        return failure('UNAUTHORIZED')
      case 'INTERNAL_SERVER_ERROR':
      case 'UNEXPECTED_ERROR':
      default:
        return unexpectedError('User fetch error:', userResponse.errors)
    }
  } catch (error) {
    return unexpectedError('User fetch error:', error)
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
    return unexpectedError('Sign out error:', error)
  }
}

const socialSignIn = async (provider: SocialProvider): Promise<Result<AuthUserError, AuthUserDTO>> => {
  try {
    const signInResponse = await betterAuthClient.signIn.social({ provider })

    if (signInResponse.error) {
      return unexpectedError('Social sign-in error:', signInResponse.error)
    }

    return await findUser()
  } catch (error) {
    return unexpectedError('Social sign-in error:', error)
  }
}

export const AuthClient = {
  changeEmail,
  changePassword,
  emailSignIn,
  emailSignUp,
  deleteUser,
  findUser,
  signOut,
  socialSignIn
}
