import { AuthUser, SignUpError, SignUpInfo } from '@/auth/domain/auth-entities'
import { failure, Result, success } from '@/helpers/result'
import { auth } from '@/lib/auth'

const signUpEmail = async (signUpInfo: SignUpInfo): Promise<Result<SignUpError, AuthUser>> => {
  const { email, password, name } = signUpInfo

  try  {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password
      }
    })
    
    const user: AuthUser = {
      email: result.user.email,
      name: result.user.name
    }

    return success(user)
  } catch (error) {
    // Handle better-auth errors
    return failure()
  }
}

export const AuthRepository = {
  signUpEmail
}
