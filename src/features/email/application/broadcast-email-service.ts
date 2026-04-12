import 'server-only'

import { createElement } from 'react'

import type { Forbidden, Unauthorized } from '@/domain/entities'
import { AuthService } from '@/features/auth/application/auth-service'
import { getAuthUserPermissionsByRole } from '@/features/auth/domain/auth-permissions'
import type { BroadcastEmailData } from '@/features/email/domain/email-schemas'
import { EmailSender } from '@/features/email/infrastructure/email-sender'
import { BroadcastEmail } from '@/features/email/presentation/templates/broadcast-email'
import type { UserRole } from '@/features/user/domain/user-entities'
import { UserRepository } from '@/features/user/infrastructure/user-repository'
import { failure, type Result, success } from '@/helpers/result'

type BroadcastResult = { sentCount: number }
type BroadcastError = Forbidden | Unauthorized

const sendBroadcastEmail = async (
  data: BroadcastEmailData
): Promise<Result<BroadcastResult, BroadcastError>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const permissions = getAuthUserPermissionsByRole(userResult.data.role)

  if (!permissions.canAccessAdmin) {
    return failure('FORBIDDEN')
  }

  const roles: UserRole[] | undefined =
    data.recipientRole === 'ALL' ? undefined : [data.recipientRole as UserRole]

  const usersResult = await UserRepository.findUsers(
    roles ? { roles } : undefined
  )

  if (usersResult.status === 'ERROR') {
    return failure()
  }

  const emails = usersResult.data.map((user) => user.email)

  let sentCount = 0

  for (const email of emails) {
    const result = await EmailSender.sendEmail({
      react: createElement(BroadcastEmail, {
        body: data.body,
        subject: data.subject
      }),
      subject: data.subject,
      to: email
    })

    if (result.status === 'SUCCESS') {
      sentCount++
    }
  }

  return success({ sentCount })
}

export const BroadcastEmailService = {
  sendBroadcastEmail
}
