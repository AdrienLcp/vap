import 'server-only'

import { Prisma } from '@prisma/client'

export const contains = (searchTerm: string) =>
  ({
    contains: searchTerm,
    mode: 'insensitive'
  }) as const

export const DATABASE_CONSTANTS = {
  DUPLICATE_ERROR: 'P2002',
  NOT_FOUND_ERROR: 'P2025'
} as const

export type DatabaseError =
  | { code: 'DUPLICATE'; duplicatedKeys: string[] }
  | { code: 'NOT_FOUND' }
  | { code: 'UNKNOWN' }

export const getDatabaseError = (error: unknown): DatabaseError => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return { code: 'UNKNOWN' }
  }

  switch (error.code) {
    case DATABASE_CONSTANTS.DUPLICATE_ERROR:
      return {
        code: 'DUPLICATE',
        duplicatedKeys: Array.isArray(error.meta?.target) ? error.meta.target : []
      }
    case DATABASE_CONSTANTS.NOT_FOUND_ERROR:
      return { code: 'NOT_FOUND' }
    default:
      return { code: 'UNKNOWN' }
  }
}
