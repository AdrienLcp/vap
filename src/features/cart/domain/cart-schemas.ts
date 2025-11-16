import { z } from 'zod'

import { CART_CONSTANTS, CART_ERRORS } from '@/features/cart/domain/cart-constants'
import { ProductIdSchema, ProductPublicDTOSchema } from '@/features/product/domain/product-schemas'

export const CartItemQuantitySchema = z
  .int()
  .max(CART_CONSTANTS.MAX_ITEM_QUANTITY, CART_ERRORS.QUANTITY_TOO_HIGH)
  .min(CART_CONSTANTS.MIN_ITEM_QUANTITY, CART_ERRORS.QUANTITY_TOO_LOW)

export const CartItemSchema = z.object({
  quantity: CartItemQuantitySchema
})

export const CartItemProduct = ProductPublicDTOSchema.pick({
  discountedPrice: true,
  id: true,
  imageUrl: true,
  name: true,
  price: true,
  status: true,
  stock: true
})

export const CartItemDTOSchema = CartItemSchema.extend({
  product: CartItemProduct
})

export const CartItemCreationDataSchema = z.object({
  productId: ProductIdSchema,
  quantity: CartItemQuantitySchema
})

const CartItemQuantityUpdateSchema = z
  .int()
  .max(CART_CONSTANTS.MAX_ITEM_QUANTITY, CART_ERRORS.QUANTITY_TOO_HIGH)

export const CartItemUpdateDataSchema = z.object({
  quantity: CartItemQuantityUpdateSchema
})
