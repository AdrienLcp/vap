import 'server-only'

import { z } from 'zod'

import { OrderService } from '@/features/order/application/order-service'
import type { OrderDTO } from '@/features/order/domain/order-entities'
import { OrderDTOSchema } from '@/features/order/domain/order-schemas'
import { CheckoutService } from '@/features/payment/application/checkout-service'
import type {
  InternalServerErrorResponse,
  NotFoundResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'
import { HttpResponse } from '@/infrastructure/api/http-response'

const CheckoutSessionCreationDTOSchema = z.object({
  shippingAddressId: z.uuid()
})

const createCheckoutSession = async (request: Request) => {
  try {
    const body = await request.json()
    const validation = CheckoutSessionCreationDTOSchema.safeParse(body)

    if (!validation.success) {
      return HttpResponse.badRequest(validation.error.issues)
    }

    const result = await CheckoutService.createCheckoutSession(
      validation.data.shippingAddressId
    )

    if (result.status === 'ERROR') {
      switch (result.error) {
        case 'BAD_REQUEST':
          return HttpResponse.badRequest([])
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in CheckoutController.createCheckoutSession:',
            result.error
          )
          return HttpResponse.internalServerError()
      }
    }

    return HttpResponse.ok(result.data)
  } catch (error) {
    console.error('Error in CheckoutController.createCheckoutSession:', error)
    return HttpResponse.internalServerError()
  }
}

type CheckoutOrderResponse = Response<
  | OkResponse<OrderDTO>
  | NotFoundResponse
  | UnauthorizedResponse
  | InternalServerErrorResponse
>

const findOrderByCheckoutSession = async (
  stripeCheckoutSessionId: string
): Promise<CheckoutOrderResponse> => {
  try {
    const result = await OrderService.findUserOrderByCheckoutSessionId(
      stripeCheckoutSessionId
    )

    if (result.status === 'ERROR') {
      switch (result.error) {
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          return HttpResponse.internalServerError()
      }
    }

    const validation = OrderDTOSchema.safeParse(result.data)

    if (!validation.success) {
      console.error(
        'Validation error in CheckoutController.findOrderByCheckoutSession:',
        validation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(validation.data)
  } catch (error) {
    console.error(
      'Unknown error in CheckoutController.findOrderByCheckoutSession:',
      error
    )
    return HttpResponse.internalServerError()
  }
}

export const CheckoutController = {
  createCheckoutSession,
  findOrderByCheckoutSession
}
