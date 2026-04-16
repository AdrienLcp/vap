import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { createScriptClient } from '@/infrastructure/database/database-script-client'

const run = async () => {
  const { client, db } = createScriptClient()

  try {
    await migrate(db, {
      migrationsFolder: './src/infrastructure/database/migrations'
    })
    console.info('Migrations applied successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exitCode = 1
  } finally {
    await client.end()
  }
}

run()
