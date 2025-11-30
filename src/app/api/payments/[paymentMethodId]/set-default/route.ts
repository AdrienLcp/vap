import type { NextRequest } from 'next/server'
import type { PAYMENT_API_BASE_URL } from '@/features/payment/domain/payment-constants'
import { PaymentController } from '@/features/payment/presentation/controllers/payment-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

type AddressRouteContext =
  RouteContext<`/api/${typeof PAYMENT_API_BASE_URL}/[paymentMethodId]/set-default`>

export const PATCH = async (_request: NextRequest, context: AddressRouteContext) => {
  const { paymentMethodId } = await context.params
  return nextResponse(PaymentController.setUserDefaultPaymentMethod(paymentMethodId))
}
