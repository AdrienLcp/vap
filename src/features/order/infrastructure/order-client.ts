'use client'

import type {
  OrderDTO,
  OrderStatus
} from '@/features/order/domain/order-entities'
import {
  ApiClient,
  type ClientResponse,
  unknownError
} from '@/infrastructure/api/api-client'
import type { OkResponse } from '@/infrastructure/api/http-response'

type OrderStatusUpdateBody = { status: OrderStatus }

const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
): Promise<ClientResponse<OkResponse<OrderDTO>>> => {
  try {
    return await ApiClient.PATCH<OkResponse<OrderDTO>, OrderStatusUpdateBody>(
      `orders/${encodeURIComponent(orderId)}/status`,
      { status }
    )
  } catch {
    return unknownError()
  }
}

export const OrderClient = {
  updateOrderStatus
}
