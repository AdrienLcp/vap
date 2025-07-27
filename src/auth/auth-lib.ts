import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import { prisma } from '@/infrastructure/database'
import { USER_CONSTANTS } from '@/user/user-constants'

const { AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_CLIENT_SECRET } = process.env

if (!AUTH_GOOGLE_CLIENT_ID || !AUTH_GOOGLE_CLIENT_SECRET) {
  throw new Error('"AUTH_GOOGLE_CLIENT_ID" and "AUTH_GOOGLE_CLIENT_SECRET" must be set in environment variables')
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
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
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: USER_CONSTANTS.DEFAULT_ROLE,
        type: [...USER_CONSTANTS.ROLES]
      }
    }
  }
})
