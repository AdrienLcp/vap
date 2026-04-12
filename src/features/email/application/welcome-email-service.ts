import 'server-only'

import { createElement } from 'react'

import { EmailSender } from '@/features/email/infrastructure/email-sender'
import { WelcomeEmail } from '@/features/email/presentation/templates/welcome-email'
import type { Result } from '@/helpers/result'
import { CLIENT_ENV } from '@/infrastructure/env/client'

const sendWelcomeEmail = async (
  email: string,
  userName: string
): Promise<Result> => {
  return await EmailSender.sendEmail({
    react: createElement(WelcomeEmail, {
      appUrl: CLIENT_ENV.NEXT_PUBLIC_APP_URL,
      userName
    }),
    subject: 'Bienvenue sur VAP !',
    to: email
  })
}

export const WelcomeEmailService = {
  sendWelcomeEmail
}
