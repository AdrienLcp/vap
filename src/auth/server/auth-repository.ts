import { User } from 'better-auth'

import { AuthUser, AuthUserError, SignInError, SignInInfo, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { failure, Result, success } from '@/helpers/result'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const findAuthUserById = async (userId: string): Promise<Result<AuthUserError, AuthUser>> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        email: true,
        name: true,
        role: true
      }
    })

    if (!user) {
      return failure('NOT_FOUND')
    }

    return success(user)
  } catch (error) {
    console.error('Error in auth repository fetching database user by ID:', error)
    return failure()
  }
}

const emailSignIn = async (signInInfo: SignInInfo): Promise<Result<SignInError, AuthUser>> => {
  try  {
    const signUpResponse = await auth.api.signInEmail({
      body: {
        email: signInInfo.email,
        password: signInInfo.password
      },
      asResponse: true
    })

    if (!signUpResponse.ok) {
      return failure()
    }

    const user: User = await signUpResponse.json()

    const userResult = await findAuthUserById(user.id)

    if (userResult.status === 'ERROR') {
      return userResult
    }

    return success(userResult.data)
  } catch (error) {
    console.error('Error in auth repository during sign in:', error)
    return failure()
  }
}

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  try  {
    const signUpResponse = await auth.api.signUpEmail({
      body: {
        email: signUpInfo.email,
        name: signUpInfo.name,
        password: signUpInfo.password
      },
      asResponse: true
    })

    if (!signUpResponse.ok) {
      return failure()
    }

    const user: User = await signUpResponse.json()

    const userResult = await findAuthUserById(user.id)

    if (userResult.status === 'ERROR') {
      return userResult
    }

    return success(userResult.data)
  } catch (error) {
    console.error('Error in auth repository during sign up:', error)
    return failure()
  }
}

export const AuthRepository = {
  emailSignIn,
  emailSignUp,
  findAuthUserById
}
