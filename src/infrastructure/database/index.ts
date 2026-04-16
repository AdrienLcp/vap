import 'server-only'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from '@/infrastructure/database/schema'
import { SERVER_ENV } from '@/infrastructure/env/server'

const globalForDb = global as unknown as {
  pgClient?: ReturnType<typeof postgres>
}

const pgClient =
  globalForDb.pgClient ?? postgres(SERVER_ENV.DATABASE_URL, { prepare: false })

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pgClient = pgClient
}

export const db = drizzle(pgClient, { schema })

export type Database = typeof db
