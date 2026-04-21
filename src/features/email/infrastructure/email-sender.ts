import 'server-only'

import type React from 'react'
import { createElement } from 'react'

import { EMAIL_CONSTANTS } from '@/features/email/domain/email-constants'
import { resend } from '@/features/email/infrastructure/email-lib'
import { failure, type Result, success } from '@/helpers/result'

type SendEmailParams<P extends object> = {
  template: React.ComponentType<P>
  props: P
  subject: string
  to: string | string[]
}

const sendEmail = async <P extends object>({
  template,
  props,
  subject,
  to
}: SendEmailParams<P>): Promise<Result> => {
  try {
    const { error } = await resend.emails.send({
      from: EMAIL_CONSTANTS.FROM,
      react: createElement(template, props),
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
