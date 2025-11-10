import 'server-only'

import { UserService } from '@/features/user/application/user-service'
import { USER_SEARCH_PARAMS } from '@/features/user/domain/user-constants'
import type {
  UserFilters,
  UserListResponse,
  UserResponse,
  UserRole,
  UserUpdateResponse
} from '@/features/user/domain/user-entities'
import {
  UserDTOSchema,
  UserFiltersSchema,
  UserIdSchema,
  UserUpdateSchema
} from '@/features/user/domain/user-schemas'
import { HttpResponse } from '@/infrastructure/api/http-response'

const extractSearchParams = (request?: Request): UserFilters | null => {
  if (!request?.url) {
    return null
  }

  const { searchParams } = new URL(request.url)

  const userRolesRaw = searchParams.get(USER_SEARCH_PARAMS.ROLES)
  const userRoles: UserRole[] = []

  if (userRolesRaw) {
    for (const role of userRolesRaw.split(USER_SEARCH_PARAMS.ROLES_SEPARATOR)) {
      if (role) {
        userRoles.push(role as UserRole)
      }
    }
  }

  return {
    email: searchParams.get(USER_SEARCH_PARAMS.EMAIL) ?? undefined,
    roles: userRoles.length > 0 ? userRoles : undefined
  }
}

const findUser = async (userId: string): Promise<UserResponse> => {
  try {
    const userIdValidation = UserIdSchema.safeParse(userId)

    if (!userIdValidation.success) {
      return HttpResponse.badRequest(userIdValidation.error.issues)
    }

    const userResult = await UserService.findUser(userIdValidation.data)

    if (userResult.status === 'ERROR') {
      switch (userResult.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in UserController.findUser:', userResult.error)
          return HttpResponse.internalServerError()
      }
    }

    const userDTOValidation = UserDTOSchema.safeParse(userResult.data)

    if (!userDTOValidation.success) {
      console.error('Validation error in UserController.findUser:', userDTOValidation.error)
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(userDTOValidation.data)
  } catch (error) {
    console.error('Error in UserController.findUser:', error)
    return HttpResponse.internalServerError()
  }
}

const findUsers = async (request?: Request): Promise<UserListResponse> => {
  try {
    const userFilters = extractSearchParams(request)

    const userFiltersValidation = UserFiltersSchema.safeParse(userFilters)

    const userResult = await UserService.findUsers(userFiltersValidation.data)

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

    if (!usersDTOValidation.success) {
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

    if (!userIdValidation.success) {
      return HttpResponse.badRequest(userIdValidation.error.issues)
    }

    const userUpdateData = await request.json()
    const userUpdateDataValidation = UserUpdateSchema.safeParse(userUpdateData)

    if (!userUpdateDataValidation.success) {
      return HttpResponse.internalServerError()
    }

    const userResult = await UserService.updateUserRole(
      userIdValidation.data,
      userUpdateDataValidation.data.role
    )

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

    if (!userDTOValidation.success) {
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
  findUser,
  findUsers,
  updateUserRole
}
