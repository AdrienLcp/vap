import 'server-only'

import type { NotFound } from '@/domain/entities'
import type {
  OrderCreationData,
  OrderDTO,
  OrderId,
  OrderItemDTO,
  OrderStatus
} from '@/features/order/domain/order-entities'
import { failure, type Result, success } from '@/helpers/result'
import {
  type EntitySelectedFields,
  OrderDatabase,
  OrderItemDatabase
} from '@/infrastructure/database'
import { getDatabaseError } from '@/infrastructure/database/database-helpers'

type OrderWithUserSelection = {
  createdAt: Date
  id: string
  shippingAddressId: string
  status: OrderStatus
  stripeCheckoutSessionId: string | null
  stripePaymentIntentId: string | null
  totalPrice: number
  user: { email: string; id: string }
}

type OrderItemProduct = OrderDTO['items'][number]['product']

type OrderItemWithProductSelection = {
  id: string
  price: number
  product: OrderItemProduct
  quantity: number
}

const ORDER_USER_SELECTED_FIELDS = {
  email: true,
  id: true
} satisfies EntitySelectedFields<OrderDTO['user']>

const ORDER_WITH_RELATIONS_SELECTED_FIELDS = {
  createdAt: true,
  id: true,
  shippingAddressId: true,
  status: true,
  stripeCheckoutSessionId: true,
  stripePaymentIntentId: true,
  totalPrice: true,
  user: { select: ORDER_USER_SELECTED_FIELDS }
} as const

const ORDER_ITEM_PRODUCT_SELECTED_FIELDS = {
  description: true,
  id: true,
  imageUrl: true,
  name: true
} satisfies EntitySelectedFields<OrderItemProduct>

const ORDER_ITEM_SELECTED_FIELDS = {
  id: true,
  quantity: true
} satisfies Partial<Record<keyof OrderItemDTO, true>>

const ORDER_ITEM_WITH_RELATIONS_SELECTED_FIELDS = {
  ...ORDER_ITEM_SELECTED_FIELDS,
  price: true,
  product: {
    select: ORDER_ITEM_PRODUCT_SELECTED_FIELDS
  }
} as const

const toOrderDTO = (
  order: OrderWithUserSelection,
  items: OrderItemWithProductSelection[]
): OrderDTO => ({
  createdAt: order.createdAt,
  id: order.id,
  items: items.map((item) => ({
    id: item.id,
    product: item.product,
    quantity: item.quantity,
    unitPrice: item.price
  })),
  shippingAddressId: order.shippingAddressId,
  status: order.status,
  stripeCheckoutSessionId: order.stripeCheckoutSessionId,
  stripePaymentIntentId: order.stripePaymentIntentId,
  totalPrice: order.totalPrice,
  user: order.user
})

const createOrder = async (
  orderCreationData: OrderCreationData
): Promise<Result<OrderDTO>> => {
  try {
    const createdOrder = await OrderDatabase.create({
      data: {
        shippingAddressId: orderCreationData.shippingAddressId,
        status: 'PENDING',
        totalPrice: orderCreationData.totalPrice,
        userId: orderCreationData.userId
      },
      select: ORDER_WITH_RELATIONS_SELECTED_FIELDS
    })

    const createdOrderItems = await OrderItemDatabase.createManyAndReturn({
      data: orderCreationData.items.map((item) => ({
        orderId: createdOrder.id,
        price: item.unitPrice,
        productId: item.productId,
        quantity: item.quantity
      })),
      select: ORDER_ITEM_WITH_RELATIONS_SELECTED_FIELDS
    })

    return success(toOrderDTO(createdOrder, createdOrderItems))
  } catch (error) {
    console.error('Unknown error in OrderRepository.createOrder:', error)
    return failure()
  }
}

const findOrder = async (
  orderId: OrderId
): Promise<Result<OrderDTO, NotFound>> => {
  try {
    const order = await OrderDatabase.findUnique({
      select: ORDER_WITH_RELATIONS_SELECTED_FIELDS,
      where: { id: orderId }
    })

    if (!order) {
      return failure('NOT_FOUND')
    }

    const items = await OrderItemDatabase.findMany({
      select: ORDER_ITEM_WITH_RELATIONS_SELECTED_FIELDS,
      where: { orderId }
    })

    return success(toOrderDTO(order, items))
  } catch (error) {
    console.error('Unknown error in OrderRepository.findOrder:', error)
    return failure()
  }
}

const findOrderByStripeCheckoutSessionId = async (
  stripeCheckoutSessionId: string
): Promise<Result<OrderDTO, NotFound>> => {
  try {
    const order = await OrderDatabase.findUnique({
      select: ORDER_WITH_RELATIONS_SELECTED_FIELDS,
      where: { stripeCheckoutSessionId }
    })

    if (!order) {
      return failure('NOT_FOUND')
    }

    const items = await OrderItemDatabase.findMany({
      select: ORDER_ITEM_WITH_RELATIONS_SELECTED_FIELDS,
      where: { orderId: order.id }
    })

    return success(toOrderDTO(order, items))
  } catch (error) {
    console.error(
      'Unknown error in OrderRepository.findOrderByStripeCheckoutSessionId:',
      error
    )
    return failure()
  }
}

const updateOrderStripeCheckoutSessionId = async (
  orderId: OrderId,
  stripeCheckoutSessionId: string
): Promise<Result<null, NotFound>> => {
  try {
    await OrderDatabase.update({
      data: { stripeCheckoutSessionId },
      where: { id: orderId }
    })

    return success()
  } catch (error) {
    const dbError = getDatabaseError(error)

    if (dbError.code === 'NOT_FOUND') {
      return failure('NOT_FOUND')
    }

    console.error(
      'Unknown error in OrderRepository.updateOrderStripeCheckoutSessionId:',
      error
    )
    return failure()
  }
}

const markOrderPaid = async (
  orderId: OrderId,
  stripePaymentIntentId: string
): Promise<Result<null, NotFound>> => {
  try {
    await OrderDatabase.update({
      data: {
        status: 'PAID',
        stripePaymentIntentId
      },
      where: { id: orderId }
    })

    return success()
  } catch (error) {
    const dbError = getDatabaseError(error)

    if (dbError.code === 'NOT_FOUND') {
      return failure('NOT_FOUND')
    }

    console.error('Unknown error in OrderRepository.markOrderPaid:', error)
    return failure()
  }
}

const markOrderCancelled = async (
  orderId: OrderId
): Promise<Result<null, NotFound>> => {
  try {
    await OrderDatabase.update({
      data: { status: 'CANCELLED' },
      where: { id: orderId }
    })

    return success()
  } catch (error) {
    const dbError = getDatabaseError(error)

    if (dbError.code === 'NOT_FOUND') {
      return failure('NOT_FOUND')
    }

    console.error('Unknown error in OrderRepository.markOrderCancelled:', error)
    return failure()
  }
}

export const OrderRepository = {
  createOrder,
  findOrder,
  findOrderByStripeCheckoutSessionId,
  markOrderCancelled,
  markOrderPaid,
  updateOrderStripeCheckoutSessionId
}
