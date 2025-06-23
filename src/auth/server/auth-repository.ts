import { AuthUser, AuthUserError, SignInInfo, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
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

const emailSignIn = async (signInInfo: SignInInfo): Promise<Result<SignUpError, AuthUser>> => {
  try  {
    const signUpResult = await auth.api.signInEmail({
      body: {
        email: signInInfo.email,
        password: signInInfo.password
      }
    })

    const userResult = await findAuthUserById(signUpResult.user.id)

    if (userResult.status === 'ERROR') {
      return userResult
    }

    return success(userResult.data)
  } catch (error) {
    console.error('Error in auth repository during sign up:', error)
    // Handle better-auth errors
    return failure()
  }
}

const emailSignUp = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  try  {
    const signUpResult = await auth.api.signUpEmail({
      body: {
        email: signUpInfo.email,
        name: signUpInfo.name,
        password: signUpInfo.password
      }
    })

    const userResult = await findAuthUserById(signUpResult.user.id)

    if (userResult.status === 'ERROR') {
      return userResult
    }

    return success(userResult.data)
  } catch (error) {
    console.error('Error in auth repository during sign up:', error)
    // Handle better-auth errors
    return failure()
  }
}

export const AuthRepository = {
  emailSignIn,
  emailSignUp,
  findAuthUserById
}
