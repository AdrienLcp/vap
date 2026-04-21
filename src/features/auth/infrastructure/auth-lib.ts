import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { eq } from 'drizzle-orm'

import { addresses } from '@/features/address/infrastructure/address-schema'
import {
  accounts,
  sessions,
  users,
  verifications
} from '@/features/auth/infrastructure/auth-schema'
import { cartItems } from '@/features/cart/infrastructure/cart-schema'
import { WelcomeEmailService } from '@/features/email/application/welcome-email-service'
import { EmailSender } from '@/features/email/infrastructure/email-sender'
import { AccountDeletionEmail } from '@/features/email/presentation/templates/account-deletion-email'
import { ResetPasswordEmail } from '@/features/email/presentation/templates/reset-password-email'
import { VerificationEmail } from '@/features/email/presentation/templates/verification-email'
import { USER_CONSTANTS } from '@/features/user/domain/user-constants'
import { db } from '@/infrastructure/database'
import { SERVER_ENV } from '@/infrastructure/env/server'
import { t } from '@/infrastructure/i18n'

const throwOnEmailFailure = (
  result: Awaited<ReturnType<typeof EmailSender.sendEmail>>,
  context: string
) => {
  if (result.status === 'ERROR') {
    throw new Error(`Failed to send ${context} email`)
  }
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      account: accounts,
      session: sessions,
      user: users,
      verification: verifications
    }
  }),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const result = await WelcomeEmailService.sendWelcomeEmail(
            user.email,
            user.name
          )
          if (result.status === 'ERROR') {
            console.error('Failed to send welcome email to', user.email)
          }
        }
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ url, user }) => {
      const result = await EmailSender.sendEmail({
        props: {
          url,
          userName: user.name
        },
        subject: t('email.templates.resetPassword.subject'),
        template: ResetPasswordEmail,
        to: user.email
      })
      throwOnEmailFailure(result, 'reset password')
    }
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ url, user }) => {
      const result = await EmailSender.sendEmail({
        props: {
          url,
          userName: user.name
        },
        subject: t('email.templates.verification.subject'),
        template: VerificationEmail,
        to: user.email
      })
      throwOnEmailFailure(result, 'email verification')
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
      },
      stripeCustomerId: {
        input: false,
        required: false,
        type: 'string'
      }
    },
    changeEmail: {
      enabled: true
    },
    deleteUser: {
      beforeDelete: async (user) => {
        await db.delete(cartItems).where(eq(cartItems.userId, user.id))
        await db.delete(addresses).where(eq(addresses.userId, user.id))
      },
      enabled: true,
      sendDeleteAccountVerification: async ({ url, user }) => {
        const result = await EmailSender.sendEmail({
          props: {
            url,
            userName: user.name
          },
          subject: t('email.templates.accountDeletion.subject'),
          template: AccountDeletionEmail,
          to: user.email
        })
        throwOnEmailFailure(result, 'account deletion')
      }
    }
  }
})
