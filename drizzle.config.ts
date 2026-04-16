import 'dotenv/config'

import { defineConfig } from 'drizzle-kit'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

export default defineConfig({
  dbCredentials: {
    url: connectionString
  },
  dialect: 'postgresql',
  out: './src/infrastructure/database/migrations',
  schema: './src/infrastructure/database/schema.ts',
  strict: true,
  verbose: true
})
