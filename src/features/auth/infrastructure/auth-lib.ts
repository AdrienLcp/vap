import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { createElement } from 'react'

import { WelcomeEmailService } from '@/features/email/application/welcome-email-service'
import { EmailSender } from '@/features/email/infrastructure/email-sender'
import { ResetPasswordEmail } from '@/features/email/presentation/templates/reset-password-email'
import { VerificationEmail } from '@/features/email/presentation/templates/verification-email'
import { USER_CONSTANTS } from '@/features/user/domain/user-constants'
import { prisma } from '@/infrastructure/database'
import { SERVER_ENV } from '@/infrastructure/env/server'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await WelcomeEmailService.sendWelcomeEmail(user.email, user.name)
        }
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ url, user }) => {
      await EmailSender.sendEmail({
        react: createElement(ResetPasswordEmail, {
          url,
          userName: user.name
        }),
        subject: 'Réinitialisation de votre mot de passe',
        to: user.email
      })
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ url, user }) => {
      await EmailSender.sendEmail({
        react: createElement(VerificationEmail, {
          url,
          userName: user.name
        }),
        subject: 'Vérifiez votre adresse email',
        to: user.email
      })
    }
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
        input: false,
        type: USER_CONSTANTS.ROLES
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
