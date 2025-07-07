import { HttpResponse } from '@/api/server'
import type { SignInResponse, SignUpResponse } from '@/auth/domain/auth-entities'
import { SignInInfoSchema, SignUpInfoSchema, SocialProviderSchema } from '@/auth/domain/auth-schema'
import { AuthService } from '@/auth/server/auth-service'
import { validate } from '@/helpers/validation'

const emailSignIn = async (request: Request): Promise<SignInResponse> => {
  try {
    const requestBody = await request.json()

    const signInInfoValidation = validate({ data: requestBody, schema: SignInInfoSchema })

    if (signInInfoValidation.status === 'ERROR') {
      return HttpResponse.badRequest(signInInfoValidation.errors.issues)
    }
    
    const signInResult = await AuthService.emailSignIn(signInInfoValidation.data)

    if (signInResult.status === 'ERROR') {
      switch (signInResult.errors) {
        case 'INVALID_CREDENTIALS':
          return HttpResponse.unauthorized('INVALID_CREDENTIALS')
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        default:
          return HttpResponse.internalServerError(signInResult.errors)
      }
    }

    return HttpResponse.ok(signInResult.data)
  } catch (error) {
    console.error('Error in email sign in controller:', error)
    return HttpResponse.internalServerError()
  }
}

const emailSignUp = async (request: Request): Promise<SignUpResponse> => {
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

const socialSignIn = async (request: Request): Promise<SignInResponse> => {
  try {
    const requestBody = await request.json()
    const socialProviderValidation = SocialProviderSchema.safeParse(requestBody)

    if (socialProviderValidation.error) {
      return HttpResponse.badRequest(socialProviderValidation.error.issues)
    }

    const signInResult = await AuthService.socialSignIn(socialProviderValidation.data)

    if (signInResult.status === 'ERROR') {
      switch (signInResult.errors) {
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        default:
          return HttpResponse.internalServerError(signInResult.errors)
      }
    }

    return HttpResponse.ok(signInResult.data)
  } catch (error) {
    console.error('Error in social sign in controller:', error)
    return HttpResponse.internalServerError()
  }
}

export const AuthController = {
  emailSignIn,
  emailSignUp,
  socialSignIn
}
