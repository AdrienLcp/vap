import type { AuthUser, AuthUserError, SignInError, SignInInfo, SignUpError, SignUpInfo, SocialProvider } from '@/auth/domain/auth-entities'
import { DatabaseAuthAdapter } from '@/auth/infrastructure/database-auth-adapter'
import { ExternalAuthAdapter } from '@/auth/infrastructure/external-auth-adapter'
import { failure, type Result, success } from '@/helpers/result'

const findUserById = async (userId: string): Promise<Result<AuthUserError, AuthUser>> => {
  const userResult = await DatabaseAuthAdapter.findUserById(userId)

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const user = userResult.data

  const authUser: AuthUser = {
    email: user.email,
    name: user.name,
    role: user.role
  }

  return success(authUser)
}

const emailSignIn = async (signInInfo: SignInInfo): Promise<Result<SignInError, AuthUser>> => {
  const authInfoResult = await ExternalAuthAdapter.emailSignIn(signInInfo)

  if (authInfoResult.status === 'ERROR') {
    switch (authInfoResult.errors) {
      case 'INVALID_EMAIL_OR_PASSWORD':
        return failure('INVALID_CREDENTIALS')
      default:
        return failure()
    }
  }

  return await findUserById(authInfoResult.data.user.id)
}

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  const authInfoResult = await ExternalAuthAdapter.emailSignUp(signUpInfo)

  if (authInfoResult.status === 'ERROR') {
    switch (authInfoResult.errors) {
      case 'USER_ALREADY_EXISTS':
        return failure('EMAIL_ALREADY_EXISTS')
      default:
        return failure()
    }
  }

  return await findUserById(authInfoResult.data.user.id)
}

const socialSignIn = async (socialProvider: SocialProvider): Promise<Result<AuthUserError, AuthUser>> => {
  const authInfoResult = await ExternalAuthAdapter.socialSignIn(socialProvider)

  if (authInfoResult.status === 'ERROR') {
    return failure()
  }

  return await findUserById(authInfoResult.data.user.id)
}

export const AuthRepository = {
  emailSignIn,
  emailSignUp,
  socialSignIn
}
