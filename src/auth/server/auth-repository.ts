import type { AuthUser, AuthUserError, SignInError, SignInInfo, SignUpError, SignUpInfo, SocialProvider } from '@/auth/domain/auth-entities'
import { BetterAuthAdapter } from '@/auth/infrastructure/better-auth-adapter'
import { PrismaAuthAdapter } from '@/auth/infrastructure/prisma-auth-adapter'
import { failure, type Result, success } from '@/helpers/result'

const findUserById = async (userId: string): Promise<Result<AuthUserError, AuthUser>> => {
  const userResult = await PrismaAuthAdapter.findUserById(userId)

  if (userResult.status === 'ERROR') {
    return failure('NOT_FOUND')
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
  const authInfoResult = await BetterAuthAdapter.emailSignIn(signInInfo)

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
  const authInfoResult = await BetterAuthAdapter.emailSignUp(signUpInfo)

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
  const authInfoResult = await BetterAuthAdapter.socialSignIn(socialProvider)

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
