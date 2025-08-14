import 'server-only'

import { Prisma, PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export const isKnownDatabaseError = (error: unknown): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError
}

export const DATABASE_CONSTANTS = {
  DUPLICATE_ERROR: 'P2002'
} as const

export type DatabaseError =
  | { code: 'DUPLICATE'; duplicatedKeys: string[] }
  | { code: 'UNKNOWN' }

export const getDatabaseError = (error: unknown): DatabaseError => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return { code: 'UNKNOWN' }
  }

  if (error.code === DATABASE_CONSTANTS.DUPLICATE_ERROR && Array.isArray(error.meta?.target)) {
    return { code: 'DUPLICATE', duplicatedKeys: error.meta.target }
  }

  return { code: 'UNKNOWN' }
}

export const CategoryDatabase = prisma.category
export const ProductDatabase = prisma.product
export const UserDatabase = prisma.user
