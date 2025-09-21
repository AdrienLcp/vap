import 'server-only'

import type { CartItem, CartItemCreationData, CartItemDTO, CartProduct } from '@/features/cart/domain/cart-entities'
import { failure, type Result, success } from '@/helpers/result'
import { CartDatabase, type EntitySelectedFields } from '@/infrastructure/database'

const CART_ITEM_SELECTED_FIELDS = {
  id: true,
  quantity: true
} satisfies EntitySelectedFields<CartItem>

const CART_PRODUCT_SELECTED_FIELDS = {
  discountedPrice: true,
  id: true,
  imageUrl: true,
  name: true,
  price: true,
  status: true,
  stock: true
} satisfies EntitySelectedFields<CartProduct>

const cartItemSelectedFields = {
  ...CART_ITEM_SELECTED_FIELDS,
  product: {
    select: CART_PRODUCT_SELECTED_FIELDS
  }
}

const addItemToUserCart = async (userId: string, cartItemCreationData: CartItemCreationData): Promise<Result<CartItemDTO>> => {
  try {
    const createdCartItem = await CartDatabase.create({
      data: {
        product: { connect: { id: cartItemCreationData.productId } },
        quantity: cartItemCreationData.quantity,
        user: { connect: { id: userId } }
      },
      select: cartItemSelectedFields
    })

    return success(createdCartItem)
  } catch (error) {
    console.error('Unknown error in CartRepository.addItemToUserCart:', error)
    return failure()
  }
}

const clearUserCart = async (userId: string): Promise<Result> => {
  try {
    await CartDatabase.deleteMany({ where: { userId } })
    return success()
  } catch (error) {
    console.error('Unknown error in CartRepository.clearUserCart:', error)
    return failure()
  }
}

const findUserCartItems = async (userId: string): Promise<Result<CartItemDTO[]>> => {
  try {
    const userCartItems = await CartDatabase.findMany({
      where: { userId },
      select: cartItemSelectedFields
    })

    return success(userCartItems)
  } catch (error) {
    console.error('Unknown error in CartRepository.findCartByUserId:', error)
    return failure()
  }
}

const removeItemFromUserCart = async (userId: string, cartItemId: string): Promise<Result<CartItemDTO>> => {
  try {
    const deletedCartItem = await CartDatabase.delete({
      where: { id: cartItemId, userId },
      select: cartItemSelectedFields
    })

    return success(deletedCartItem)
  } catch (error) {
    console.error('Unknown error in CartRepository.removeItemFromUserCart:', error)
    return failure()
  }
}

const updateUserCartItemQuantity = async (userId: string, cartItemId: string, quantity: number): Promise<Result<CartItemDTO>> => {
  try {
    const updatedCartItem = await CartDatabase.update({
      where: { id: cartItemId, userId },
      data: { quantity },
      select: cartItemSelectedFields
    })

    return success(updatedCartItem)
  } catch (error) {
    console.error('Unknown error in CartRepository.updateUserCartItemQuantity:', error)
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
