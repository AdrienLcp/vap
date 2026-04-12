import 'server-only'

import { BroadcastEmailService } from '@/features/email/application/broadcast-email-service'
import { BroadcastEmailSchema } from '@/features/email/domain/email-schemas'
import type {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'
import { HttpResponse } from '@/infrastructure/api/http-response'

type BroadcastResponse = Response<
  | OkResponse<{ sentCount: number }>
  | BadRequestResponse<unknown>
  | ForbiddenResponse
  | UnauthorizedResponse
  | InternalServerErrorResponse
>

const sendBroadcastEmail = async (
  body: unknown
): Promise<BroadcastResponse> => {
  try {
    const validation = BroadcastEmailSchema.safeParse(body)

    if (!validation.success) {
      return HttpResponse.badRequest(validation.error.issues)
    }

    const result = await BroadcastEmailService.sendBroadcastEmail(
      validation.data
    )

    if (result.status === 'ERROR') {
      switch (result.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          return HttpResponse.internalServerError()
      }
    }

    return HttpResponse.ok(result.data)
  } catch (error) {
    console.error('Unknown error in EmailController.sendBroadcastEmail:', error)
    return HttpResponse.internalServerError()
  }
}

export const EmailController = {
  sendBroadcastEmail
}
