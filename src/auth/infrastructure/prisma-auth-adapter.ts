import type { AuthUser } from '@/auth/domain/auth-entities'
import { failure, type Result, success } from '@/helpers/result'
import { prisma } from '@/lib/prisma'

type PrismaUserError = 'NOT_FOUND'

const findUserById = async (userId: string): Promise<Result<PrismaUserError, AuthUser>> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      return failure('NOT_FOUND')
    }

    return success(user)
  } catch (error) {
    console.error('Error in PrismaAuthAdapter fetching user by ID:', error)
    return failure()
  }
}

export const PrismaAuthAdapter = {
  findUserById
}
