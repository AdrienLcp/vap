import type { NextRequest } from 'next/server'

import { OrderController } from '@/features/order/presentation/controllers/order-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) => {
  const { orderId } = await params
  const body = await request.json()

  return nextResponse(OrderController.updateOrderStatus(orderId, body))
}
