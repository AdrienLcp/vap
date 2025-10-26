import 'server-only'

import type { User } from '@prisma/client'

import type { NotFound } from '@/domain/entities'
import type { UserDTO, UserRole } from '@/features/user/domain/user-entities'
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

const findUsers = async (email?: string | null): Promise<Result<UserDTO[]>> => {
  try {
    if (!email) {
      const users = await UserDatabase.findMany({ select: USER_SELECTED_FIELDS })
      return success(users)
    }

    const users = await UserDatabase.findMany({
      select: USER_SELECTED_FIELDS,
      where: {
        email: {
          contains: email.trim(),
          mode: 'insensitive'
        }
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
