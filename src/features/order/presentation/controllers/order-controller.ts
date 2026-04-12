import 'server-only'

import { OrderService } from '@/features/order/application/order-service'
import type {
  OrderDTO,
  OrderStatus
} from '@/features/order/domain/order-entities'
import {
  OrderDTOSchema,
  OrderIdSchema,
  OrderStatusUpdateSchema
} from '@/features/order/domain/order-schemas'
import type {
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'
import { HttpResponse } from '@/infrastructure/api/http-response'

type OrderListResponse = Response<
  | OkResponse<OrderDTO[]>
  | ForbiddenResponse
  | UnauthorizedResponse
  | InternalServerErrorResponse
>

type OrderResponse = Response<
  | OkResponse<OrderDTO>
  | ForbiddenResponse
  | NotFoundResponse
  | UnauthorizedResponse
  | InternalServerErrorResponse
>

const findOrders = async (): Promise<OrderListResponse> => {
  try {
    const result = await OrderService.findOrders()

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

    const validation = OrderDTOSchema.array().safeParse(result.data)

    if (!validation.success) {
      console.error(
        'Validation error in OrderController.findOrders:',
        validation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(validation.data)
  } catch (error) {
    console.error('Unknown error in OrderController.findOrders:', error)
    return HttpResponse.internalServerError()
  }
}

const findOrder = async (orderId: string): Promise<OrderResponse> => {
  try {
    const idValidation = OrderIdSchema.safeParse(orderId)

    if (!idValidation.success) {
      return HttpResponse.notFound()
    }

    const result = await OrderService.findOrderAdmin(idValidation.data)

    if (result.status === 'ERROR') {
      switch (result.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
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
        'Validation error in OrderController.findOrder:',
        validation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(validation.data)
  } catch (error) {
    console.error('Unknown error in OrderController.findOrder:', error)
    return HttpResponse.internalServerError()
  }
}

const updateOrderStatus = async (
  orderId: string,
  body: unknown
): Promise<OrderResponse> => {
  try {
    const idValidation = OrderIdSchema.safeParse(orderId)

    if (!idValidation.success) {
      return HttpResponse.notFound()
    }

    const bodyValidation = OrderStatusUpdateSchema.safeParse(body)

    if (!bodyValidation.success) {
      return HttpResponse.notFound()
    }

    const result = await OrderService.updateOrderStatus(
      idValidation.data,
      bodyValidation.data.status as OrderStatus
    )

    if (result.status === 'ERROR') {
      switch (result.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
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
        'Validation error in OrderController.updateOrderStatus:',
        validation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(validation.data)
  } catch (error) {
    console.error('Unknown error in OrderController.updateOrderStatus:', error)
    return HttpResponse.internalServerError()
  }
}

export const OrderController = {
  findOrder,
  findOrders,
  updateOrderStatus
}
