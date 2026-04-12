import type { NextRequest } from 'next/server'

import { CheckoutController } from '@/features/payment/presentation/controllers/checkout-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const POST = async (request: NextRequest) => {
  return nextResponse(CheckoutController.createCheckoutSession(request))
}
