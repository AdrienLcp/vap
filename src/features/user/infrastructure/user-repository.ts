import 'server-only'

import { and, eq, ilike, inArray, type SQL } from 'drizzle-orm'

import type { NotFound } from '@/domain/entities'
import { users } from '@/features/auth/infrastructure/auth-schema'
import type {
  UserDTO,
  UserFilters,
  UserRole
} from '@/features/user/domain/user-entities'
import { failure, type Result, success } from '@/helpers/result'
import { db } from '@/infrastructure/database'

const userSelectedFields = {
  email: users.email,
  id: users.id,
  name: users.name,
  role: users.role
} as const

const buildUserFilters = (filters: UserFilters): SQL | undefined => {
  const conditions: Array<SQL | undefined> = []

  if (filters.email) {
    conditions.push(ilike(users.email, `%${filters.email}%`))
  }

  if (filters.roles && filters.roles.length > 0) {
    conditions.push(inArray(users.role, filters.roles))
  }

  return conditions.length > 0 ? and(...conditions) : undefined
}

const findUser = async (userId: string): Promise<Result<UserDTO, NotFound>> => {
  try {
    const [user] = await db
      .select(userSelectedFields)
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

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
      const rows = await db.select(userSelectedFields).from(users)
      return success(rows)
    }

    const whereClause = buildUserFilters(filters)

    const rows = whereClause
      ? await db.select(userSelectedFields).from(users).where(whereClause)
      : await db.select(userSelectedFields).from(users)

    return success(rows)
  } catch (error) {
    console.error('Unknown error in UserRepository.findUsers:', error)
    return failure()
  }
}

const updateUserRole = async (
  userId: string,
  role: UserRole
): Promise<Result<UserDTO>> => {
  try {
    const [updatedUser] = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, userId))
      .returning(userSelectedFields)

    if (!updatedUser) {
      return failure()
    }

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
