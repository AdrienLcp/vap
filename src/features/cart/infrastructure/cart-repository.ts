import 'server-only'

import { and, eq } from 'drizzle-orm'

import type { NotFound } from '@/domain/entities'
import type {
  CartItemCreationData,
  CartItemDTO
} from '@/features/cart/domain/cart-entities'
import { cartItems } from '@/features/cart/infrastructure/cart-schema'
import { products } from '@/features/product/infrastructure/product-schema'
import { failure, type Result, success } from '@/helpers/result'
import { db } from '@/infrastructure/database'

const cartItemSelectedFields = {
  product: {
    discountedPrice: products.discountedPrice,
    id: products.id,
    imageUrl: products.imageUrl,
    name: products.name,
    price: products.price,
    status: products.status,
    stock: products.stock
  },
  quantity: cartItems.quantity
} as const

const findCartItem = async (
  userId: string,
  productId: string
): Promise<CartItemDTO | undefined> => {
  const [row] = await db
    .select(cartItemSelectedFields)
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(
      and(eq(cartItems.productId, productId), eq(cartItems.userId, userId))
    )
    .limit(1)

  return row
}

const addItemToUserCart = async (
  userId: string,
  cartItemCreationData: CartItemCreationData
): Promise<Result<CartItemDTO>> => {
  try {
    const [existingItem] = await db
      .select({ quantity: cartItems.quantity })
      .from(cartItems)
      .where(
        and(
          eq(cartItems.productId, cartItemCreationData.productId),
          eq(cartItems.userId, userId)
        )
      )
      .limit(1)

    if (existingItem) {
      await db
        .update(cartItems)
        .set({
          quantity: existingItem.quantity + cartItemCreationData.quantity
        })
        .where(
          and(
            eq(cartItems.productId, cartItemCreationData.productId),
            eq(cartItems.userId, userId)
          )
        )
    } else {
      await db.insert(cartItems).values({
        productId: cartItemCreationData.productId,
        quantity: cartItemCreationData.quantity,
        userId
      })
    }

    const cartItem = await findCartItem(userId, cartItemCreationData.productId)

    if (!cartItem) {
      return failure()
    }

    return success(cartItem)
  } catch (error) {
    console.error('Unknown error in CartRepository.addItemToUserCart:', error)
    return failure()
  }
}

const clearUserCart = async (userId: string): Promise<Result> => {
  try {
    await db.delete(cartItems).where(eq(cartItems.userId, userId))
    return success()
  } catch (error) {
    console.error('Unknown error in CartRepository.clearUserCart:', error)
    return failure()
  }
}

const findUserCartItems = async (
  userId: string
): Promise<Result<CartItemDTO[]>> => {
  try {
    const rows = await db
      .select(cartItemSelectedFields)
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId))

    return success(rows)
  } catch (error) {
    console.error('Unknown error in CartRepository.findCartByUserId:', error)
    return failure()
  }
}

const removeItemFromUserCart = async (
  userId: string,
  productId: string
): Promise<Result<null, NotFound>> => {
  try {
    const deleted = await db
      .delete(cartItems)
      .where(
        and(eq(cartItems.productId, productId), eq(cartItems.userId, userId))
      )
      .returning({ productId: cartItems.productId })

    if (deleted.length === 0) {
      return failure('NOT_FOUND')
    }

    return success()
  } catch (error) {
    console.error(
      'Unknown error in CartRepository.removeItemFromUserCart:',
      error
    )
    return failure()
  }
}

const updateUserCartItemQuantity = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<Result<CartItemDTO, NotFound>> => {
  try {
    const updated = await db
      .update(cartItems)
      .set({ quantity })
      .where(
        and(eq(cartItems.productId, productId), eq(cartItems.userId, userId))
      )
      .returning({ productId: cartItems.productId })

    if (updated.length === 0) {
      return failure('NOT_FOUND')
    }

    const cartItem = await findCartItem(userId, productId)

    if (!cartItem) {
      return failure('NOT_FOUND')
    }

    return success(cartItem)
  } catch (error) {
    console.error(
      'Unknown error in CartRepository.updateUserCartItemQuantity:',
      error
    )
    return failure()
  }
}

export const CartRepository = {
  addItemToUserCart,
  clearUserCart,
  findUserCartItems,
  removeItemFromUserCart,
  updateUserCartItemQuantity
}
