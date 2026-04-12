import 'server-only'

import { z } from 'zod'

import { CheckoutService } from '@/features/payment/application/checkout-service'
import { HttpResponse } from '@/infrastructure/api/http-response'

const CheckoutSessionCreationDTOSchema = z.object({
  shippingAddressId: z.cuid()
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

export const CheckoutController = {
  createCheckoutSession
}
