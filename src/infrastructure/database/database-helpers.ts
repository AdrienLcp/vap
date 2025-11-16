import 'server-only'

import { Prisma } from '@prisma/client'

export const contains = (searchTerm: string) =>
  ({
    contains: searchTerm,
    mode: 'insensitive'
  }) as const

export const DATABASE_CONSTANTS = {
  DUPLICATE_ERROR: 'P2002'
} as const

export type DatabaseError = { code: 'DUPLICATE'; duplicatedKeys: string[] } | { code: 'UNKNOWN' }

export const getDatabaseError = (error: unknown): DatabaseError => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return { code: 'UNKNOWN' }
  }

  if (error.code === DATABASE_CONSTANTS.DUPLICATE_ERROR && Array.isArray(error.meta?.target)) {
    return { code: 'DUPLICATE', duplicatedKeys: error.meta.target }
  }

  return { code: 'UNKNOWN' }
}

export const isKnownDatabaseError = (
  error: unknown
): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError
}
