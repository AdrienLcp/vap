import 'server-only'

import { AuthService } from '@/auth/auth-service'
import type { AuthUserResponse } from '@/auth/domain/auth-entities'
import { AuthUserDTOSchema } from '@/auth/domain/auth-schemas'
import { HttpResponse } from '@/infrastructure/api/http-response'

const findUser = async (): AuthUserResponse => {
  try {
    const userResult = await AuthService.findUser()

    if (userResult.status === 'ERROR') {
      switch (userResult.errors) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized('UNAUTHORIZED')
        default:
          return HttpResponse.internalServerError('Unknown error in AuthController.findUser:', userResult.errors)
      }
    }

    const authUserDTOValidation = AuthUserDTOSchema.safeParse(userResult.data)

    if (authUserDTOValidation.error) {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(authUserDTOValidation.data)
  } catch (error) {
    return HttpResponse.internalServerError('Unknown error in AuthController.findUser:', error)
  }
}

export const AuthController = {
  findUser
}
