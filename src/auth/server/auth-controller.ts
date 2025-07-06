import type { SignInResult, SignUpResult } from '@/auth/domain/auth-entities'
import { SignInInfoSchema, SignUpInfoSchema } from '@/auth/domain/auth-schema'
import { AuthService } from '@/auth/server/auth-service'
import { HttpResponse } from '@/helpers/controller-result'


const emailSignIn = async (request: Request): Promise<SignInResult> => {
  try {
    const requestBody = await request.json()
    const signInInfoValidation = SignInInfoSchema.safeParse(requestBody)

    if (signInInfoValidation.error) {
      return HttpResponse.badRequest(signInInfoValidation.error.issues)
    }
    
    const signInResult = await AuthService.emailSignIn(signInInfoValidation.data)

    if (signInResult.status === 'ERROR') {
      return HttpResponse.internalServerError(signInResult.errors)
    }

    return HttpResponse.ok(signInResult.data)
  } catch (error) {
    console.error('Error in email sign in controller:', error)
    return HttpResponse.internalServerError()
  }
}

const emailSignUp = async (request: Request): Promise<SignUpResult> => {
  try {
    const requestBody = await request.json()
    const signUpInfoValidation = SignUpInfoSchema.safeParse(requestBody)

    if (signUpInfoValidation.error) {
      return HttpResponse.badRequest(signUpInfoValidation.error.issues)
    }
    
    const signUpResult = await AuthService.emailSignUp(signUpInfoValidation.data)

    if (signUpResult.status === 'ERROR') {
      switch (signUpResult.errors) {
        case 'EMAIL_ALREADY_EXISTS':
          return HttpResponse.conflict('EMAIL_ALREADY_EXISTS')
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        default:
          return HttpResponse.internalServerError(signUpResult.errors)
      }
    }

    return HttpResponse.created(signUpResult.data)
  } catch (error) {
    console.error('Error in email sign up controller:', error)
    return HttpResponse.internalServerError()
  }
}

export const AuthController = {
  emailSignIn,
  emailSignUp
}
