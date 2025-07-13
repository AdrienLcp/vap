import { HttpResponse } from '@/api/server'
import type { EmailSignInResponse, EmailSignUpResponse, SocialSignInResponse } from '@/auth/domain/auth-entities'
import { AuthUserDTOSchema, SignInRequestSchema, SignUpRequestSchema, SocialProviderRequestSchema } from '@/auth/domain/auth-schema'
import { AuthService } from '@/auth/auth-service'
import { validate } from '@/helpers/validation'

const emailSignIn = async (request: Request): Promise<EmailSignInResponse> => {
  try {
    const requestBody = await request.json()
    const signInInfoValidationResult = validate({ data: requestBody, schema: SignInRequestSchema })

    if (signInInfoValidationResult.status === 'ERROR') {
      return HttpResponse.badRequest(signInInfoValidationResult.errors)
    }
    
    const signInResult = await AuthService.emailSignIn(signInInfoValidationResult.data)

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
    
    const emailSignInResponseValidationResult = validate({ data: signInResult.data, schema: AuthUserDTOSchema })

    if (emailSignInResponseValidationResult.status === 'ERROR') {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(emailSignInResponseValidationResult.data)
  } catch (error) {
    console.error('Email sign in error in controller:', error)
    return HttpResponse.internalServerError()
  }
}

const emailSignUp = async (request: Request): Promise<EmailSignUpResponse> => {
  try {
    const requestBody = await request.json()
    const signUpInfoValidationResult = validate({ data: requestBody, schema: SignUpRequestSchema })

    if (signUpInfoValidationResult.status === 'ERROR') {
      return HttpResponse.badRequest(signUpInfoValidationResult.errors)
    }
    
    const signUpResult = await AuthService.emailSignUp(signUpInfoValidationResult.data)

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

    const emailSignUpResponseValidationResult = validate({ data: signUpResult.data, schema: AuthUserDTOSchema })

    if (emailSignUpResponseValidationResult.status === 'ERROR') {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.created(emailSignUpResponseValidationResult.data)
  } catch (error) {
    console.error('Email sign up error in controller:', error)
    return HttpResponse.internalServerError()
  }
}

const socialSignIn = async (request: Request): Promise<SocialSignInResponse> => {
  try {
    const requestBody = await request.json()
    const socialProviderValidationResult = validate({ data: requestBody, schema: SocialProviderRequestSchema })

    if (socialProviderValidationResult.status === 'ERROR') {
      return HttpResponse.badRequest(socialProviderValidationResult.errors)
    }

    const signInResult = await AuthService.socialSignIn(socialProviderValidationResult.data.provider)

    if (signInResult.status === 'ERROR') {
      switch (signInResult.errors) {
        case 'NOT_FOUND':
          return HttpResponse.notFound('NOT_FOUND')
        default:
          return HttpResponse.internalServerError(signInResult.errors)
      }
    }
    
    const authenticatedUserValidationResult = validate({ data: signInResult.data, schema: AuthUserDTOSchema })

    if (authenticatedUserValidationResult.status === 'ERROR') {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(authenticatedUserValidationResult.data)
  } catch (error) {
    console.error('Social sign in error in controller:', error)
    return HttpResponse.internalServerError()
  }
}

export const AuthController = {
  emailSignIn,
  emailSignUp,
  socialSignIn
}
