import 'dotenv/config'

import { defineConfig, env } from 'prisma/config'

const DATABASE_PATH = 'src/infrastructure/database'

export default defineConfig({
  datasource: {
    url: env('DATABASE_URL')
  },
  migrations: {
    path: `${DATABASE_PATH}/migrations`,
    seed: `tsx ${DATABASE_PATH}/database-seed.ts`
  },
  schema: `${DATABASE_PATH}/schema.prisma`
})
