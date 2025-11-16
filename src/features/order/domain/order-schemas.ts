import { z } from 'zod'

import { PriceSchema } from '@/domain/schemas'
import { ORDER_CONSTANTS } from '@/features/order/domain/order-constants'
import {
  ProductCategoryDTOSchema,
  ProductIdSchema,
  ProductPublicDTOSchema
} from '@/features/product/domain/product-schemas'
import { UserDTOSchema, UserIdSchema } from '@/features/user/domain/user-schemas'

export const OrderIdSchema = z.string()

export const OrderItemIdSchema = z.string()

export const OrderStatusSchema = z.enum(ORDER_CONSTANTS.STATUS)

export const PaymentMethodSchema = z.string()

export const ShippingAddress = z.string()

export const OrderItemQuantitySchema = z.int().positive()

export const OrderItemCreationDataSchema = z.object({
  productId: ProductIdSchema,
  quantity: z.int().positive(),
  unitPrice: PriceSchema
})

export const OrderCreationDataSchema = z.object({
  items: OrderItemCreationDataSchema.array().nonempty(),
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

export const OrderItemProductCategoryDTOSchema = ProductCategoryDTOSchema.nullable()

export const OrderItemProductDTOSchema = ProductPublicDTOSchema.pick({
  category: true,
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

export const OrderDTOSchema = z.object({
  createdAt: z.date(),
  id: OrderIdSchema,
  items: OrderItemDTOSchema.array(),
  paymentMethod: PaymentMethodSchema,
  shippingAddress: ShippingAddress,
  status: OrderStatusSchema,
  totalPrice: PriceSchema,
  user: OrderUserDTOSchema
})
