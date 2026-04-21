import 'server-only'

import type {
  BadRequest,
  Forbidden,
  NotFound,
  Unauthorized
} from '@/domain/entities'
import { AddressRepository } from '@/features/address/infrastructure/address-repository'
import { AuthService } from '@/features/auth/application/auth-service'
import { getAuthUserPermissionsByRole } from '@/features/auth/domain/auth-permissions'
import { CartRepository } from '@/features/cart/infrastructure/cart-repository'
import type {
  OrderDTO,
  OrderId,
  OrderStatus
} from '@/features/order/domain/order-entities'
import { OrderRepository } from '@/features/order/infrastructure/order-repository'
import { failure, type Result, success } from '@/helpers/result'

type OrderError = BadRequest | NotFound | Unauthorized
type AdminOrderError = Forbidden | NotFound | Unauthorized

const createPendingOrderFromCart = async (
  shippingAddressId: string
): Promise<Result<OrderDTO, OrderError>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const userId = userResult.data.id

  const addressResult = await AddressRepository.findUserAddress(
    userId,
    shippingAddressId
  )

  if (addressResult.status === 'ERROR') {
    return addressResult
  }

  const cartResult = await CartRepository.findUserCartItems(userId)

  if (cartResult.status === 'ERROR') {
    return cartResult
  }

  if (cartResult.data.length === 0) {
    return failure('BAD_REQUEST')
  }

  const items = cartResult.data.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
    unitPrice: item.product.discountedPrice ?? item.product.price
  }))

  const totalPrice = items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  )

  const [firstItem, ...restItems] = items

  if (!firstItem) {
    return failure('BAD_REQUEST')
  }

  return await OrderRepository.createOrder({
    items: [firstItem, ...restItems],
    shippingAddressId,
    totalPrice,
    userId
  })
}

const findOrder = async (
  orderId: OrderId
): Promise<Result<OrderDTO, NotFound | Unauthorized>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const orderResult = await OrderRepository.findOrder(orderId)

  if (orderResult.status === 'ERROR') {
    return orderResult
  }

  if (orderResult.data.user.id !== userResult.data.id) {
    return failure('NOT_FOUND')
  }

  return success(orderResult.data)
}

const findUserOrderByCheckoutSessionId = async (
  stripeCheckoutSessionId: string
): Promise<Result<OrderDTO, NotFound | Unauthorized>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const orderResult = await OrderRepository.findOrderByStripeCheckoutSessionId(
    stripeCheckoutSessionId
  )

  if (orderResult.status === 'ERROR') {
    return orderResult
  }

  if (orderResult.data.user.id !== userResult.data.id) {
    return failure('NOT_FOUND')
  }

  return success(orderResult.data)
}

const findOrders = async (): Promise<Result<OrderDTO[], AdminOrderError>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const permissions = getAuthUserPermissionsByRole(userResult.data.role)

  if (!permissions.canAccessAdmin) {
    return failure('FORBIDDEN')
  }

  return await OrderRepository.findOrders()
}

const findOrderAdmin = async (
  orderId: OrderId
): Promise<Result<OrderDTO, AdminOrderError>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const permissions = getAuthUserPermissionsByRole(userResult.data.role)

  if (!permissions.canAccessAdmin) {
    return failure('FORBIDDEN')
  }

  return await OrderRepository.findOrder(orderId)
}

const updateOrderStatus = async (
  orderId: OrderId,
  status: OrderStatus
): Promise<Result<OrderDTO, AdminOrderError>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const permissions = getAuthUserPermissionsByRole(userResult.data.role)

  if (!permissions.canAccessAdmin) {
    return failure('FORBIDDEN')
  }

  return await OrderRepository.updateOrderStatus(orderId, status)
}

export const OrderService = {
  createPendingOrderFromCart,
  findOrder,
  findOrderAdmin,
  findOrders,
  findUserOrderByCheckoutSessionId,
  updateOrderStatus
}
