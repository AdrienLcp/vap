import 'server-only'

import type { NotFound } from '@/domain/entities'
import { AuthService } from '@/features/auth/application/auth-service'
import type { AuthUserPermissionError } from '@/features/auth/domain/auth-entities'
import type { UserDTO, UserRole } from '@/features/user/domain/user-entities'
import { UserRepository } from '@/features/user/infrastructure/user-repository'
import { failure, type Result } from '@/helpers/result'

const findUser = async (userId: string): Promise<Result<UserDTO, AuthUserPermissionError | NotFound>> => {
  const authUserResponse = await AuthService.findUserDTO()

  if (authUserResponse.status === 'ERROR') {
    return authUserResponse
  }

  if (!authUserResponse.data.permissions.canReadUser) {
    return failure('FORBIDDEN')
  }

  return await UserRepository.findUser(userId)
}

const findUsers = async (email?: string | null): Promise<Result<UserDTO[], AuthUserPermissionError>> => {
  const authUserResponse = await AuthService.findUserDTO()

  if (authUserResponse.status === 'ERROR') {
    return authUserResponse
  }

  if (!authUserResponse.data.permissions.canReadUser) {
    return failure('FORBIDDEN')
  }

  return await UserRepository.findUsers(email)
}

const updateUserRole = async (userId: string, role: UserRole): Promise<Result<UserDTO, AuthUserPermissionError>> => {
  const authUserResponse = await AuthService.findUserDTO()

  if (authUserResponse.status === 'ERROR') {
    return authUserResponse
  }

  if (!authUserResponse.data.permissions.canUpdateUser) {
    return failure('FORBIDDEN')
  }

  return await UserRepository.updateUserRole(userId, role)
}

export const UserService = {
  findUser,
  findUsers,
  updateUserRole
}
