import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import { database } from '@/infrastructure/database'

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true
  }
  // socialProviders: {
  //   // Tony Google account
  // }
})
