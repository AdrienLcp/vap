'server-only'

import { HttpResponse } from '@/infrastructure/api/http-response'
import { AuthService } from '@/auth/auth-service'
import type { AuthUserResponse } from '@/auth/domain/auth-entities'
import { AuthUserDTOSchema } from '@/auth/domain/auth-schemas'

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

    const authUserDTOValidation = AuthUserDTOSchema.safeParse(userResult.data)

    if (authUserDTOValidation.error) {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(authUserDTOValidation.data)
  } catch (error) {
    console.error('Find user error in controller:', error)
    return HttpResponse.internalServerError()
  }
}

export const AuthController = {
  findUser
}
