import type { NextRequest } from 'next/server'

import { EmailController } from '@/features/email/presentation/controllers/email-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const POST = async (request: NextRequest) => {
  const body = await request.json()

  return nextResponse(EmailController.sendBroadcastEmail(body))
}
