import { UserService } from '@/features/user/application/user-service'
import { USER_SEARCH_PARAMS } from '@/features/user/domain/user-constants'
import type { UserListResponse, UserUpdateResponse } from '@/features/user/domain/user-entities'
import { UserDTOSchema, UserIdSchema, UserUpdateSchema } from '@/features/user/domain/user-schemas'
import { HttpResponse } from '@/infrastructure/api/http-response'

const findUsers = async (request: Request): Promise<UserListResponse> => {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get(USER_SEARCH_PARAMS.EMAIL)

    const userResult = await UserService.findUsers(email)

    if (userResult.status === 'ERROR') {
      switch (userResult.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in UserController.findUsers:', userResult.error)
          return HttpResponse.internalServerError()
      }
    }

    const usersDTOValidation = UserDTOSchema.array().safeParse(userResult.data)

    if (usersDTOValidation.error) {
      console.error('Validation error in UserController.findUsers:', usersDTOValidation.error)
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(usersDTOValidation.data)
  } catch (error) {
    console.error('Error in UserController.findUsers:', error)
    return HttpResponse.internalServerError()
  }
}

const updateUserRole = async (userId: string, request: Request): Promise<UserUpdateResponse> => {
  try {
    const userIdValidation = UserIdSchema.safeParse(userId)

    if (userIdValidation.error) {
      return HttpResponse.internalServerError()
    }

    const userUpdateData = await request.json()
    const userUpdateDataValidation = UserUpdateSchema.safeParse(userUpdateData)

    if (userUpdateDataValidation.error) {
      return HttpResponse.internalServerError()
    }

    const userResult = await UserService.updateUserRole(userIdValidation.data, userUpdateDataValidation.data.role)

    if (userResult.status === 'ERROR') {
      switch (userResult.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in UserController.updateUserRole:', userResult.error)
          return HttpResponse.internalServerError()
      }
    }

    const userDTOValidation = UserDTOSchema.safeParse(userResult.data)

    if (userDTOValidation.error) {
      console.error('Validation error in UserController.updateUserRole:', userDTOValidation.error)
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(userDTOValidation.data)
  } catch (error) {
    console.error('Error in UserController.updateUserRole:', error)
    return HttpResponse.internalServerError()
  }
}

export const UserController = {
  findUsers,
  updateUserRole
}
