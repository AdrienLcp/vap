import type { NextRequest } from 'next/server'

import { PaymentController } from '@/features/payment/presentation/controllers/payment-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const GET = async () => {
  return nextResponse(PaymentController.findUserPaymentMethods())
}

export const POST = async (request: NextRequest) => {
  return nextResponse(PaymentController.createUserPaymentMethod(request))
}
