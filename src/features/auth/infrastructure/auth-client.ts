'use client'

import { createAuthClient } from 'better-auth/react'

import type { AuthUserResponse, ChangeEmailResponse, ChangePasswordInfo, ChangePasswordResponse, DeleteUserResponse, EmailSignInResponse, SignInInfo, SignOutResponse, SignUpInfo, SignUpResponse, SocialProvider } from '@/features/auth/domain/auth-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'
import { HttpResponse, OK_STATUS } from '@/infrastructure/api/http-response'

export const betterAuthClient = createAuthClient()

const changeEmail = async (newEmail: string): Promise<ClientResponse<ChangeEmailResponse>> => {
  try {
    const changeEmailResponse = await betterAuthClient.changeEmail({ newEmail })

    if (changeEmailResponse.error) {
      switch (changeEmailResponse.error.code) {
        case 'VALIDATION_ERROR':
          return HttpResponse.badRequest('INVALID_EMAIL')
        default:
          console.error('Change email error:', changeEmailResponse.error)
          return unknownError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Change email error:', error)
    return unknownError()
  }
}

const changePassword = async (changePasswordInfo: ChangePasswordInfo): Promise<ClientResponse<ChangePasswordResponse>> => {
  try {
    const changeEmailResponse = await betterAuthClient.changePassword({
      currentPassword: changePasswordInfo.currentPassword,
      newPassword: changePasswordInfo.newPassword,
      revokeOtherSessions: true
    })

    if (changeEmailResponse.error) {
      switch (changeEmailResponse.error.code) {
        case 'INVALID_PASSWORD':
          return HttpResponse.badRequest('INVALID_PASSWORD')
        case 'PASSWORD_TOO_SHORT':
          return HttpResponse.badRequest('PASSWORD_TOO_SHORT')
        default:
          console.error('Change password error:', changeEmailResponse.error)
          return unknownError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Change password error:', error)
    return unknownError()
  }
}

const emailSignIn = async (signInInfo: SignInInfo): Promise<ClientResponse<EmailSignInResponse>> => {
  try {
    const emailSignInResponse = await betterAuthClient.signIn.email({
      email: signInInfo.email,
      password: signInInfo.password
    })

    if (emailSignInResponse.error) {
      switch (emailSignInResponse.error.code) {
        case 'INVALID_EMAIL_OR_PASSWORD':
          return HttpResponse.badRequest('INVALID_CREDENTIALS')
        default:
          console.error('Email sign-in error:', emailSignInResponse.error)
          return unknownError()
      }
    }

    const userResponse = await findUser()

    if (userResponse.status !== OK_STATUS) {
      console.error('Failed to fetch user after sign-in:', userResponse)
      return unknownError()
    }

    return HttpResponse.ok(userResponse.data)
  } catch (error) {
    console.error('Email sign-in error:', error)
    return unknownError()
  }
}

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<ClientResponse<SignUpResponse>> => {
  try {
    const emailSignUpResponse = await betterAuthClient.signUp.email({
      email: signUpInfo.email,
      name: signUpInfo.name,
      password: signUpInfo.password
    })

    if (emailSignUpResponse.error) {
      switch (emailSignUpResponse.error.code) {
        case 'PASSWORD_TOO_SHORT':
          return HttpResponse.badRequest('PASSWORD_TOO_SHORT')
        case 'USER_ALREADY_EXISTS':
          return HttpResponse.conflict('USER_ALREADY_EXISTS')
        case 'INVALID_EMAIL':
          return HttpResponse.badRequest('INVALID_EMAIL')
        default:
          console.error('Email sign-up error:', emailSignUpResponse.error)
          return unknownError()
      }
    }

    const userResponse = await findUser()

    if (userResponse.status !== OK_STATUS) {
      console.error('Failed to fetch user after sign-up:', userResponse)
      return unknownError()
    }

    return HttpResponse.created(userResponse.data)
  } catch (error) {
    console.error('Email sign-up error:', error)
    return unknownError()
  }
}

const deleteUser = async (password: string): Promise<ClientResponse<DeleteUserResponse>> => {
  try {
    const deleteUserResponse = await betterAuthClient.deleteUser({ password })

    if (deleteUserResponse.error) {
      switch (deleteUserResponse.error.code) {
        case 'INVALID_PASSWORD':
          return HttpResponse.badRequest('INVALID_PASSWORD')
        default:
          console.error('Delete user error:', deleteUserResponse.error)
          return unknownError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Delete user error:', error)
    return unknownError()
  }
}

const findUser = async (): Promise<ClientResponse<AuthUserResponse>> => {
  try {
    return await ApiClient.GET<AuthUserResponse>('/auth/user')
  } catch (error) {
    console.error('User fetch error:', error)
    return unknownError()
  }
}

const signOut = async (): Promise<ClientResponse<SignOutResponse>> => {
  try {
    const signOutResponse = await betterAuthClient.signOut()

    if (signOutResponse.error) {
      console.error('Sign out error:', signOutResponse.error)
      return HttpResponse.unauthorized()
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Sign out error:', error)
    return unknownError()
  }
}

const socialSignIn = async (provider: SocialProvider): Promise<ClientResponse<AuthUserResponse>> => {
  try {
    const signInResponse = await betterAuthClient.signIn.social({ provider })

    if (signInResponse.error) {
      console.error('Social sign-in error:', signInResponse.error)
      return unknownError()
    }

    return await findUser()
  } catch (error) {
    console.error('Social sign-in error:', error)
    return unknownError()
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
