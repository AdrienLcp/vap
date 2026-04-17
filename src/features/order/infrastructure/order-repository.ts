import 'server-only'

import { desc, eq } from 'drizzle-orm'

import type { NotFound } from '@/domain/entities'
import { users } from '@/features/auth/infrastructure/auth-schema'
import type {
  OrderCreationData,
  OrderDTO,
  OrderId,
  OrderStatus
} from '@/features/order/domain/order-entities'
import {
  orderItems,
  orders
} from '@/features/order/infrastructure/order-schema'
import { products } from '@/features/product/infrastructure/product-schema'
import { failure, type Result, success } from '@/helpers/result'
import { db } from '@/infrastructure/database'

const orderSelectedFields = {
  createdAt: orders.createdAt,
  id: orders.id,
  shippingAddressId: orders.shippingAddressId,
  status: orders.status,
  stripeCheckoutSessionId: orders.stripeCheckoutSessionId,
  stripePaymentIntentId: orders.stripePaymentIntentId,
  totalPrice: orders.totalPrice,
  user: {
    email: users.email,
    id: users.id
  }
} as const

const orderItemSelectedFields = {
  id: orderItems.id,
  price: orderItems.price,
  product: {
    description: products.description,
    id: products.id,
    imageUrl: products.imageUrl,
    name: products.name
  },
  quantity: orderItems.quantity
} as const

const buildOrderQuery = () =>
  db
    .select(orderSelectedFields)
    .from(orders)
    .innerJoin(users, eq(orders.userId, users.id))

const buildOrderItemsQuery = () =>
  db
    .select(orderItemSelectedFields)
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))

type OrderRow = Awaited<ReturnType<typeof buildOrderQuery>>[number]
type OrderItemRow = Awaited<ReturnType<typeof buildOrderItemsQuery>>[number]

const toOrderDTO = (order: OrderRow, items: OrderItemRow[]): OrderDTO => ({
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

const findOrderItems = async (orderId: OrderId): Promise<OrderItemRow[]> =>
  buildOrderItemsQuery().where(eq(orderItems.orderId, orderId))

const createOrder = async (
  orderCreationData: OrderCreationData
): Promise<Result<OrderDTO>> => {
  try {
    const [inserted] = await db
      .insert(orders)
      .values({
        shippingAddressId: orderCreationData.shippingAddressId,
        status: 'PENDING',
        totalPrice: orderCreationData.totalPrice,
        userId: orderCreationData.userId
      })
      .returning({ id: orders.id })

    if (!inserted) {
      return failure()
    }

    await db.insert(orderItems).values(
      orderCreationData.items.map((item) => ({
        orderId: inserted.id,
        price: item.unitPrice,
        productId: item.productId,
        quantity: item.quantity
      }))
    )

    const [createdOrder] = await buildOrderQuery()
      .where(eq(orders.id, inserted.id))
      .limit(1)

    if (!createdOrder) {
      return failure()
    }

    const items = await findOrderItems(inserted.id)

    return success(toOrderDTO(createdOrder, items))
  } catch (error) {
    console.error('Unknown error in OrderRepository.createOrder:', error)
    return failure()
  }
}

const findOrders = async (): Promise<Result<OrderDTO[]>> => {
  try {
    const rows = await buildOrderQuery().orderBy(desc(orders.createdAt))

    const ordersWithItems: OrderDTO[] = []

    for (const order of rows) {
      const items = await findOrderItems(order.id)
      ordersWithItems.push(toOrderDTO(order, items))
    }

    return success(ordersWithItems)
  } catch (error) {
    console.error('Unknown error in OrderRepository.findOrders:', error)
    return failure()
  }
}

const findOrder = async (
  orderId: OrderId
): Promise<Result<OrderDTO, NotFound>> => {
  try {
    const [order] = await buildOrderQuery()
      .where(eq(orders.id, orderId))
      .limit(1)

    if (!order) {
      return failure('NOT_FOUND')
    }

    const items = await findOrderItems(orderId)

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
    const [order] = await buildOrderQuery()
      .where(eq(orders.stripeCheckoutSessionId, stripeCheckoutSessionId))
      .limit(1)

    if (!order) {
      return failure('NOT_FOUND')
    }

    const items = await findOrderItems(order.id)

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
    const updated = await db
      .update(orders)
      .set({ stripeCheckoutSessionId })
      .where(eq(orders.id, orderId))
      .returning({ id: orders.id })

    if (updated.length === 0) {
      return failure('NOT_FOUND')
    }

    return success()
  } catch (error) {
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
    const updated = await db
      .update(orders)
      .set({ status: 'PAID', stripePaymentIntentId })
      .where(eq(orders.id, orderId))
      .returning({ id: orders.id })

    if (updated.length === 0) {
      return failure('NOT_FOUND')
    }

    return success()
  } catch (error) {
    console.error('Unknown error in OrderRepository.markOrderPaid:', error)
    return failure()
  }
}

const markOrderCancelled = async (
  orderId: OrderId
): Promise<Result<null, NotFound>> => {
  try {
    const updated = await db
      .update(orders)
      .set({ status: 'CANCELLED' })
      .where(eq(orders.id, orderId))
      .returning({ id: orders.id })

    if (updated.length === 0) {
      return failure('NOT_FOUND')
    }

    return success()
  } catch (error) {
    console.error('Unknown error in OrderRepository.markOrderCancelled:', error)
    return failure()
  }
}

const updateOrderStatus = async (
  orderId: OrderId,
  status: OrderStatus
): Promise<Result<OrderDTO, NotFound>> => {
  try {
    const updated = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, orderId))
      .returning({ id: orders.id })

    if (updated.length === 0) {
      return failure('NOT_FOUND')
    }

    return await findOrder(orderId)
  } catch (error) {
    console.error('Unknown error in OrderRepository.updateOrderStatus:', error)
    return failure()
  }
}

export const OrderRepository = {
  createOrder,
  findOrder,
  findOrderByStripeCheckoutSessionId,
  findOrders,
  markOrderCancelled,
  markOrderPaid,
  updateOrderStatus,
  updateOrderStripeCheckoutSessionId
}
