import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import { USER_CONSTANTS } from '@/features/user/domain/user-constants'
import { prisma } from '@/infrastructure/database'
import { SERVER_ENV } from '@/infrastructure/env/server'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: SERVER_ENV.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: SERVER_ENV.AUTH_GOOGLE_CLIENT_SECRET
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
