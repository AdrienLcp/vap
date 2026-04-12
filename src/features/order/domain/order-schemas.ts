import { z } from 'zod'

import { PriceSchema } from '@/domain/schemas'
import { ORDER_CONSTANTS } from '@/features/order/domain/order-constants'
import {
  ProductIdSchema,
  ProductPublicDTOSchema
} from '@/features/product/domain/product-schemas'
import {
  UserDTOSchema,
  UserIdSchema
} from '@/features/user/domain/user-schemas'

export const OrderIdSchema = z.cuid()

export const OrderItemIdSchema = z.string()

export const OrderStatusSchema = z.enum(ORDER_CONSTANTS.STATUS)

export const OrderItemQuantitySchema = z.int().positive()

export const OrderItemCreationDataSchema = z.object({
  productId: ProductIdSchema,
  quantity: OrderItemQuantitySchema,
  unitPrice: PriceSchema
})

export const OrderCreationDataSchema = z.object({
  items: OrderItemCreationDataSchema.array().nonempty(),
  shippingAddressId: z.string(),
  totalPrice: PriceSchema,
  userId: UserIdSchema
})

export const OrderItemCreationDataDTOSchema = OrderItemCreationDataSchema.pick({
  productId: true,
  quantity: true
})

export const OrderCreationDataDTOSchema = z.object({
  items: OrderItemCreationDataDTOSchema.array().nonempty()
})

export const OrderUserDTOSchema = UserDTOSchema.pick({
  email: true,
  id: true
})

export const OrderItemProductDTOSchema = ProductPublicDTOSchema.pick({
  description: true,
  id: true,
  imageUrl: true,
  name: true
})

export const OrderItemDTOSchema = z.object({
  id: OrderItemIdSchema,
  product: OrderItemProductDTOSchema,
  quantity: OrderItemQuantitySchema,
  unitPrice: PriceSchema
})

export const OrderStatusUpdateSchema = z.object({
  status: OrderStatusSchema
})

export const OrderDTOSchema = z.object({
  createdAt: z.date(),
  id: OrderIdSchema,
  items: OrderItemDTOSchema.array(),
  shippingAddressId: z.string(),
  status: OrderStatusSchema,
  stripeCheckoutSessionId: z.string().nullable(),
  stripePaymentIntentId: z.string().nullable(),
  totalPrice: PriceSchema,
  user: OrderUserDTOSchema
})
