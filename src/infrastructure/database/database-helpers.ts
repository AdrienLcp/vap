import 'server-only'

import { type SQL, sql } from 'drizzle-orm'
import type { PgColumn } from 'drizzle-orm/pg-core'
import type postgres from 'postgres'

export const incrementColumn = (column: PgColumn, amount: number): SQL =>
  sql`${column} + ${amount}`

export const decrementColumn = (column: PgColumn, amount: number): SQL =>
  sql`${column} - ${amount}`

const POSTGRES_ERROR_CODES = {
  FOREIGN_KEY_VIOLATION: '23503',
  UNIQUE_VIOLATION: '23505'
} as const

type DatabaseError =
  | { code: 'DUPLICATE'; duplicatedKeys: string[] }
  | { code: 'FK_VIOLATION'; constraint: string; table: string }
  | { code: 'NOT_FOUND' }
  | { code: 'UNKNOWN' }

const isPostgresError = (error: unknown): error is postgres.PostgresError =>
  error instanceof Error && error.name === 'PostgresError'

const parseDuplicatedKeys = (error: postgres.PostgresError): string[] => {
  const constraint = error.constraint_name
  if (!constraint) return []

  const match = constraint.match(/^.+?_(.+?)_key$/)
  if (!match?.[1]) return []

  return match[1].split('_')
}

export const getDatabaseError = (error: unknown): DatabaseError => {
  if (!isPostgresError(error)) {
    return { code: 'UNKNOWN' }
  }

  switch (error.code) {
    case POSTGRES_ERROR_CODES.UNIQUE_VIOLATION:
      return {
        code: 'DUPLICATE',
        duplicatedKeys: parseDuplicatedKeys(error)
      }
    case POSTGRES_ERROR_CODES.FOREIGN_KEY_VIOLATION:
      return {
        code: 'FK_VIOLATION',
        constraint: error.constraint_name ?? '',
        table: error.table_name ?? ''
      }
    default:
      return { code: 'UNKNOWN' }
  }
}
