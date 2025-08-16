import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

import { prisma } from '@/infrastructure/database'
import { serverEnvVariables } from '@/infrastructure/env/server'
import { USER_CONSTANTS } from '@/user/domain/user-constants'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: serverEnvVariables.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: serverEnvVariables.AUTH_GOOGLE_CLIENT_SECRET
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
