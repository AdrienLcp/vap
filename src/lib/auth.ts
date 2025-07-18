import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import { database } from '@/infrastructure/database'

const { AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_CLIENT_SECRET } = process.env

if (!AUTH_GOOGLE_CLIENT_ID || !AUTH_GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in environment variables')
}

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: AUTH_GOOGLE_CLIENT_ID,
      clientSecret: AUTH_GOOGLE_CLIENT_SECRET
    }
  }
})
