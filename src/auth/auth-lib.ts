import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import { prisma } from '@/infrastructure/database'
import { env } from '@/infrastructure/env'
import { USER_CONSTANTS } from '@/user/user-constants'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET
    }
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: USER_CONSTANTS.DEFAULT_ROLE,
        type: [...USER_CONSTANTS.ROLES]
      }
    },
    changeEmail: {
      enabled: true
    },
    deleteUser: {
      enabled: true
    }
  }
})
