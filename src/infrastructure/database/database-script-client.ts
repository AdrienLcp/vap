import 'dotenv/config'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

type ScriptClient = {
  client: ReturnType<typeof postgres>
  db: ReturnType<typeof drizzle>
}

export const createScriptClient = (): ScriptClient => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  const client = postgres(connectionString, {
    max: 1,
    prepare: false
  })

  return { client, db: drizzle(client) }
}
