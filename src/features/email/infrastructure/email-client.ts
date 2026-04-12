'use client'

import type { BroadcastEmailData } from '@/features/email/domain/email-schemas'
import {
  ApiClient,
  type ClientResponse,
  unknownError
} from '@/infrastructure/api/api-client'
import type { OkResponse } from '@/infrastructure/api/http-response'

type BroadcastResult = { sentCount: number }

const sendBroadcastEmail = async (
  data: BroadcastEmailData
): Promise<ClientResponse<OkResponse<BroadcastResult>>> => {
  try {
    return await ApiClient.POST<
      OkResponse<BroadcastResult>,
      BroadcastEmailData
    >('emails/send', data)
  } catch {
    return unknownError()
  }
}

export const EmailClient = {
  sendBroadcastEmail
}
