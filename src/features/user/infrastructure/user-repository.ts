import type { User } from '@prisma/client'

import type { UserDTO, UserRole } from '@/features/user/domain/user-entities'
import { failure, type Result, success } from '@/helpers/result'
import { type EntitySelectedFields, UserDatabase } from '@/infrastructure/database'

const USER_SELECTED_FIELDS = {
  id: true,
  name: true,
  email: true,
  role: true
} satisfies EntitySelectedFields<User>

const findUsers = async (email?: string | null): Promise<Result<UserDTO[]>> => {
  try {
    if (!email) {
      const users = await UserDatabase.findMany({ select: USER_SELECTED_FIELDS })
      return success(users)
    }

    const users = await UserDatabase.findMany({
      where: {
        email: {
          contains: email.trim(),
          mode: 'insensitive'
        }
      },
      select: USER_SELECTED_FIELDS
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
      where: { id: userId },
      data: { role },
      select: USER_SELECTED_FIELDS
    })

    return success(updatedUser)
  } catch (error) {
    console.error('Unknown error in UserRepository.updateUserRole:', error)
    return failure()
  }
}

export const UserRepository = {
  findUsers,
  updateUserRole
}
