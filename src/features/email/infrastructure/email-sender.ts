import 'server-only'

import type React from 'react'

import { EMAIL_CONSTANTS } from '@/features/email/domain/email-constants'
import { resend } from '@/features/email/infrastructure/email-lib'
import { failure, type Result, success } from '@/helpers/result'

type SendEmailParams = {
  react: React.ReactElement
  subject: string
  to: string | string[]
}

const sendEmail = async ({
  react,
  subject,
  to
}: SendEmailParams): Promise<Result> => {
  try {
    const { error } = await resend.emails.send({
      from: EMAIL_CONSTANTS.FROM,
      react,
      subject,
      to
    })

    if (error) {
      console.error('Failed to send email:', error)
      return failure()
    }

    return success()
  } catch (error) {
    console.error('Unknown error in EmailSender.sendEmail:', error)
    return failure()
  }
}

export const EmailSender = {
  sendEmail
}
