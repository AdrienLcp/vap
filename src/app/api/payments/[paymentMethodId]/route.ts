import type { NextRequest } from 'next/server'

import { PaymentController } from '@/features/payment/presentation/controllers/payment-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

type AddressRouteContext = RouteContext<'/api/payments/[paymentMethodId]'>

export const DELETE = async (_request: NextRequest, context: AddressRouteContext) => {
  const { paymentMethodId } = await context.params
  return nextResponse(PaymentController.deleteUserPaymentMethod(paymentMethodId))
}

export const GET = async (_request: NextRequest, context: AddressRouteContext) => {
  const { paymentMethodId } = await context.params
  return nextResponse(PaymentController.findUserPaymentMethod(paymentMethodId))
}

export const PATCH = async (request: NextRequest, context: AddressRouteContext) => {
  const { paymentMethodId } = await context.params
  return nextResponse(PaymentController.updateUserPaymentMethod(paymentMethodId, request))
}
