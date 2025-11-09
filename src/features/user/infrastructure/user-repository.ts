import 'server-only'

import type { User } from '@prisma/client'

import type { NotFound } from '@/domain/entities'
import type { UserDTO, UserFilters, UserRole } from '@/features/user/domain/user-entities'
import { failure, type Result, success } from '@/helpers/result'
import { type EntitySelectedFields, UserDatabase } from '@/infrastructure/database'

const USER_SELECTED_FIELDS = {
  email: true,
  id: true,
  name: true,
  role: true
} satisfies EntitySelectedFields<User>

const findUser = async (userId: string): Promise<Result<UserDTO, NotFound>> => {
  try {
    const user = await UserDatabase.findUnique({
      select: USER_SELECTED_FIELDS,
      where: { id: userId }
    })

    if (!user) {
      return failure('NOT_FOUND')
    }

    return success(user)
  } catch (error) {
    console.error('Unknown error in UserRepository.findUser:', error)
    return failure()
  }
}

const findUsers = async (filters?: UserFilters): Promise<Result<UserDTO[]>> => {
  try {
    if (!filters) {
      const users = await UserDatabase.findMany({ select: USER_SELECTED_FIELDS })
      return success(users)
    }

    const users = await UserDatabase.findMany({
      select: USER_SELECTED_FIELDS,
      where: {
        email: {
          contains: filters?.email ? filters.email : undefined,
          mode: 'insensitive'
        },
        role: filters?.roles ? { in: filters.roles } : undefined
      }
    })

    return success(users)
  } catch (error) {
    console.error('Unknown error in UserRepository.findUsers:', error)
    return failure()
  }
}

const updateUserRole = async (userId: string, role: UserRole): Promise<Result<UserDTO>> => {
  try {
    const updatedUser = await UserDatabase.update({
      data: { role },
      select: USER_SELECTED_FIELDS,
      where: { id: userId }
    })

    return success(updatedUser)
  } catch (error) {
    console.error('Unknown error in UserRepository.updateUserRole:', error)
    return failure()
  }
}

export const UserRepository = {
  findUser,
  findUsers,
  updateUserRole
}
