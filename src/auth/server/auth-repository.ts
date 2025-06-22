import { AuthUser, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { failure, Result, success } from '@/helpers/result'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const signUpEmail = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  try  {
    const signUpResult = await auth.api.signUpEmail({
      body: {
        email: signUpInfo.email,
        name: signUpInfo.name,
        password: signUpInfo.password
      }
    })

    const user = await prisma.user.findUnique({
      where: {
        id: signUpResult.user.id
      },
      select: {
        email: true,
        name: true,
        role: true
      }
    })

    if (!user) {
      return failure()
    }

    return success(user)
  } catch (error) {
    console.error('Error in auth repository during sign up:', error)
    // Handle better-auth errors
    return failure()
  }
}

export const AuthRepository = {
  signUpEmail
}
