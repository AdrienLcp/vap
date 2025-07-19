import type { User } from 'better-auth'
import { APIError } from 'better-auth/api'
import type { SocialProvider } from 'better-auth/social-providers'
import { headers as getHeaders } from 'next/headers'

import type { Unauthorized } from '@/api/api-domain'
import type { InvalidCredentials, SignInInfo, SignUpInfo, UserAlreadyExists } from '@/auth/domain/auth-entities'
import { failure, type Result, success } from '@/helpers/result'
import { auth } from '@/lib/auth'

type ExternalAuthInfo = {
  user: User
}

const emailSignIn = async (signInInfo: SignInInfo): Promise<Result<InvalidCredentials, ExternalAuthInfo>> => {
  try {
    const authInfo = await auth.api.signInEmail({
      body: {
        email: signInInfo.email,
        password: signInInfo.password
      }
    })

    return success(authInfo)
  } catch (error) {
    if (error instanceof APIError && error.body?.code) {
      switch (error.body.code) {
        case 'INVALID_EMAIL_OR_PASSWORD':
          return failure('INVALID_CREDENTIALS')
        default:
          console.error('Unknown better-auth error code in email sign in adapter:', error.body.code)
          return failure()
      }
    }

    console.error('Error in better auth adapter during email sign in:', error)
    return failure()
  }
}

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<UserAlreadyExists, ExternalAuthInfo>> => {
  try  {
    const authInfo = await auth.api.signUpEmail({
      body: {
        email: signUpInfo.email,
        name: signUpInfo.name,
        password: signUpInfo.password
      }
    })

    return success(authInfo)
  } catch (error) {
    if (error instanceof APIError && error.body?.code) {
      switch (error.body.code) {
        case 'USER_ALREADY_EXISTS':
          return failure('USER_ALREADY_EXISTS')
        default:
          console.error('Unknown better-auth error code in email sign up adapter:', error.body.code)
          return failure()
      }
    }

    console.error('Error in better auth adapter during email sign up:', error)
    return failure()
  }
}

const findUser = async (): Promise<Result<Unauthorized, User>> => {
  const headers = await getHeaders()

  const session = await auth.api.getSession({ headers })

  if (!session) {
    return failure('UNAUTHORIZED')
  }

  return success(session.user)
}

const signOut = async (): Promise<Result<Unauthorized>> => {
  try {
    const headers = await getHeaders()
    const signOutResult = await auth.api.signOut({ headers })

    if (signOutResult.success) {
      return success()
    }

    return failure()
  } catch (error) {
    if (error instanceof APIError && error.body?.code) {
      switch (error.body.code) {
        case 'FAILED_TO_GET_SESSION':
          return failure('UNAUTHORIZED')
        default:
          console.error('Unknown better-auth error code in email sign up adapter:', error.body.code)
          return failure()
      }
    }

    console.error('Error in better auth adapter during sign out:', error)
    return failure()
  }
}

const socialSignIn = async (socialProvider: SocialProvider): Promise<Result<undefined, ExternalAuthInfo>> => {
  try {
    const authInfo = await auth.api.signInSocial({
      body: {
        provider: socialProvider
      }
    })

    if (authInfo.url == null) {
      return success(authInfo)
    }

    console.error('Error in better auth adapter during social sign in (url == null):', authInfo)
    return failure()
  } catch (error) {
    if (error instanceof APIError && error.body?.code) {
      switch (error.body.code) {
        default:
          console.error('Unknown better-auth error code in social sign in adapter:', error.body.code)
          return failure()
      }
    }

    console.error('Error in better auth adapter during social sign in:', error)
    return failure()
  }
}

export const ExternalAuthAdapter = {
  findUser,
  emailSignIn,
  emailSignUp,
  signOut,
  socialSignIn
}
