import { createAuthClient } from 'better-auth/react'

import { ApiClient } from '@/api/client'
import type { AuthUserDTO, AuthUserResponse, SignInInfo, SignUpError, SignUpInfo, SocialProvider } from '@/auth/domain/auth-entities'
import { failure, type Result, success } from '@/helpers/result'

export const betterAuthClient = createAuthClient()

const { signIn, signOut: betterAuthSignOut, signUp } = betterAuthClient

const findUser = async () => {
  try {
    const userResponse = await ApiClient.GET<AuthUserResponse>('/auth/user')

    if (userResponse.status === 'SUCCESS') {
      return success(userResponse.data)
    }

    return failure(userResponse.errors)
  } catch (error) {
    console.error('Sign out error:', error)
    return failure()
  }
}

const emailSignIn = async (signInInfo: SignInInfo) => {
  try {
    const emailSignInResponse = await signIn.email({
      email: signInInfo.email,
      password: signInInfo.password
    })

    if (emailSignInResponse.error) {
      console.error('Email sign-in error:', emailSignInResponse.error)
      // handle errors
      return failure()
    }

    return await findUser()
  } catch (error) {
    console.error('Email sign-in error:', error)
    return failure()
  }
}

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUserDTO>> => {
  try {
    const emailSignUpResponse = await signUp.email({
      email: signUpInfo.email,
      name: signUpInfo.name,
      password: signUpInfo.password
    })

    if (emailSignUpResponse.error) {
      console.log('Email sign-up error:', emailSignUpResponse.error)
      // handle errors
      return failure()
    }

    return await findUser()
  } catch (error) {
    console.error('Email sign-up error:', error)
    return failure()
  }
}

const signOut = async () => {
  try {
    const signOutResponse = await betterAuthSignOut()

    if (signOutResponse.data?.success) {
      return success()
    }

    console.log('Sign out error:', signOutResponse.error)
    // handle errors
    return failure()
  } catch (error) {
    console.error('Sign out error:', error)
    return failure()
  }
}

const socialSignIn = async (provider: SocialProvider) => {
  try {
    const signInResponse = await signIn.social({ provider })

    if (signInResponse.error) {
      console.error('Social sign-in error:', signInResponse.error)
      // handle errors
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
