import 'server-only'

import { EmailSender } from '@/features/email/infrastructure/email-sender'
import { WelcomeEmail } from '@/features/email/presentation/templates/welcome-email'
import type { Result } from '@/helpers/result'
import { CLIENT_ENV } from '@/infrastructure/env/client'
import { t } from '@/infrastructure/i18n'

const sendWelcomeEmail = async (
  email: string,
  userName: string
): Promise<Result> => {
  return await EmailSender.sendEmail({
    props: {
      appUrl: CLIENT_ENV.NEXT_PUBLIC_APP_URL,
      userName
    },
    subject: t('email.templates.welcome.subject'),
    template: WelcomeEmail,
    to: email
  })
}

export const WelcomeEmailService = {
  sendWelcomeEmail
}
