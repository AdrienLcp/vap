import { HttpResponse } from '@/api/server'
import type { EmailSignInResponse, EmailSignUpResponse, SocialSignInResponse } from '@/auth/domain/auth-entities'
import { AuthUserDTOSchema, SignInRequestSchema, SignUpRequestSchema, SocialProviderRequestSchema } from '@/auth/domain/auth-schema'
import { AuthService } from '@/auth/auth-service'
import { validate } from '@/helpers/validation'

const emailSignIn = async (request: Request): Promise<EmailSignInResponse> => {
  try {
    const requestBody = await request.json()
    const signInInfoValidation = validate({ data: requestBody, schema: SignInRequestSchema })

    if (signInInfoValidation.status === 'ERROR') {
      return HttpResponse.badRequest(signInInfoValidation.errors)
    }
    
    const signInResult = await AuthService.emailSignIn(signInInfoValidation.data)

    if (signInResult.status === 'ERROR') {
      switch (signInResult.errors) {
        case 'INVALID_CREDENTIALS':
          return HttpResponse.unauthorized('INVALID_CREDENTIALS')
        case 'NOT_FOUND':
          return HttpResponse.notFound('NOT_FOUND')
        default:
          return HttpResponse.internalServerError(signInResult.errors)
      }
    }
    
    const authenticatedUserValidation = validate({ data: signInResult.data, schema: AuthUserDTOSchema })

    if (authenticatedUserValidation.status === 'ERROR') {
      console.error('Validation error for authenticated user data in email sign in controller:', authenticatedUserValidation.errors)
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(signInResult.data)
  } catch (error) {
    console.error('Error in email sign in controller:', error)
    return HttpResponse.internalServerError()
  }
}

const emailSignUp = async (request: Request): Promise<EmailSignUpResponse> => {
  try {
    const requestBody = await request.json()
    const signUpInfoValidation = validate({ data: requestBody, schema: SignUpRequestSchema })

    if (signUpInfoValidation.status === 'ERROR') {
      return HttpResponse.badRequest(signUpInfoValidation.errors)
    }
    
    const signUpResult = await AuthService.emailSignUp(signUpInfoValidation.data)

    if (signUpResult.status === 'ERROR') {
      switch (signUpResult.errors) {
        case 'EMAIL_ALREADY_EXISTS':
          return HttpResponse.conflict('EMAIL_ALREADY_EXISTS')
        case 'NOT_FOUND':
          return HttpResponse.notFound('NOT_FOUND')
        default:
          return HttpResponse.internalServerError(signUpResult.errors)
      }
    }

    const authenticatedUserValidation = validate({ data: signUpResult.data, schema: AuthUserDTOSchema })

    if (authenticatedUserValidation.status === 'ERROR') {
      console.error('Validation error for authenticated user data in email sign up controller:', authenticatedUserValidation.errors)
      return HttpResponse.internalServerError()
    }

    return HttpResponse.created(authenticatedUserValidation.data)
  } catch (error) {
    console.error('Error in email sign up controller:', error)
    return HttpResponse.internalServerError()
  }
}

const socialSignIn = async (request: Request): Promise<SocialSignInResponse> => {
  try {
    const requestBody = await request.json()
    const socialProviderValidation = validate({ data: requestBody, schema: SocialProviderRequestSchema })

    if (socialProviderValidation.status === 'ERROR') {
      return HttpResponse.badRequest(socialProviderValidation.errors)
    }

    const signInResult = await AuthService.socialSignIn(socialProviderValidation.data.provider)

    if (signInResult.status === 'ERROR') {
      switch (signInResult.errors) {
        case 'NOT_FOUND':
          return HttpResponse.notFound('NOT_FOUND')
        default:
          return HttpResponse.internalServerError(signInResult.errors)
      }
    }
    
    const authenticatedUserValidation = validate({ data: signInResult.data, schema: AuthUserDTOSchema })

    if (authenticatedUserValidation.status === 'ERROR') {
      console.error('Validation error for authenticated user data in social sign in controller:', authenticatedUserValidation.errors)
      return HttpResponse.internalServerError()
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
