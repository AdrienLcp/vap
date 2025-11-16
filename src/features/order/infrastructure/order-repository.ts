import type {
  OrderCreationData,
  OrderDTO,
  OrderItemDTO
} from '@/features/order/domain/order-entities'
import { failure, type Result, success } from '@/helpers/result'
import {
  type EntitySelectedFields,
  OrderDatabase,
  OrderItemDatabase
} from '@/infrastructure/database'

const ORDER_USER_SELECTED_FIELDS = {
  email: true,
  id: true
} satisfies EntitySelectedFields<OrderDTO['user']>

const ORDER_SELECTED_FIELDS = {
  createdAt: true,
  id: true,
  paymentMethod: true,
  shippingAddress: true,
  status: true,
  totalPrice: true
} satisfies EntitySelectedFields<OrderDTO>

const ORDER_WITH_RELATIONS_SELECTED_FIELDS = {
  ...ORDER_SELECTED_FIELDS,
  user: {
    select: ORDER_USER_SELECTED_FIELDS
  }
}

type OrderItemProduct = OrderDTO['items'][number]['product']

const ORDER_ITEM_PRODUCT_CATEGORY_SELECTED_FIELDS = {
  id: true,
  imageUrl: true,
  name: true
} satisfies EntitySelectedFields<OrderItemProduct['category']>

const ORDER_ITEM_PRODUCT_SELECTED_FIELDS = {
  description: true,
  id: true,
  imageUrl: true,
  name: true
} satisfies EntitySelectedFields<OrderItemProduct>

const ORDER_ITEM_SELECTED_FIELDS = {
  id: true,
  quantity: true,
  unitPrice: true
} satisfies EntitySelectedFields<OrderItemDTO>

const ORDER_ITEM_WITH_RELATIONS_SELECTED_FIELDS = {
  ...ORDER_ITEM_SELECTED_FIELDS,
  product: {
    select: {
      ...ORDER_ITEM_PRODUCT_SELECTED_FIELDS,
      category: {
        select: ORDER_ITEM_PRODUCT_CATEGORY_SELECTED_FIELDS
      }
    }
  }
}

const createOrder = async (orderCreationData: OrderCreationData): Promise<Result<OrderDTO>> => {
  try {
    const createdOrder = await OrderDatabase.create({
      data: {
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

    const orderWithItems: OrderDTO = {
      createdAt: createdOrder.createdAt,
      id: createdOrder.id,
      items: createdOrderItems,
      paymentMethod: createdOrder.paymentMethod,
      shippingAddress: createdOrder.shippingAddress,
      status: createdOrder.status,
      totalPrice: createdOrder.totalPrice,
      user: createdOrder.user
    }

    return success(orderWithItems)
  } catch (error) {
    console.error('Unknown error in OrderRepository.createOrder:', error)
    return failure()
  }
}

export const OrderRepository = {
  createOrder
}
