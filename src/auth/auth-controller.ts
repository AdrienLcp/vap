import { HttpResponse } from '@/api/server'
import type { AuthUserResponse } from '@/auth/domain/auth-entities'
import { AuthUserDTOSchema } from '@/auth/domain/auth-schemas'
import { AuthService } from '@/auth/auth-service'
import { validate } from '@/helpers/validation'

const findUser = async (): AuthUserResponse => {
  try {
    const userResult = await AuthService.findUser()

    if (userResult.status === 'ERROR') {
      switch (userResult.errors) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized('UNAUTHORIZED')
        default:
          return HttpResponse.internalServerError(userResult.errors)
      }
    }

    const userValidationResult = validate({ data: userResult.data, schema: AuthUserDTOSchema })

    if (userValidationResult.status === 'ERROR') {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(userValidationResult.data)
  } catch (error) {
    console.error('Find user error in controller:', error)
    return HttpResponse.internalServerError()
  }
}

export const AuthController = {
  findUser
}
