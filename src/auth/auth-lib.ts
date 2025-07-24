import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import { AUTH_CONSTANTS } from '@/auth/domain/auth-constants'
import { prisma } from '@/infrastructure/database'

const { AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_CLIENT_SECRET } = process.env

if (!AUTH_GOOGLE_CLIENT_ID || !AUTH_GOOGLE_CLIENT_SECRET) {
  throw new Error('AUTH_GOOGLE_CLIENT_ID and AUTH_GOOGLE_CLIENT_SECRET must be set in environment variables')
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
        defaultValue: AUTH_CONSTANTS.DEFAULT_USER_ROLE,
        type: [...AUTH_CONSTANTS.USER_ROLES]
      }
    }
  }
})
