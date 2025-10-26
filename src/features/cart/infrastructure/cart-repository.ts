import 'server-only'

import type { NotFound } from '@/domain/entities'
import type {
  CartItem,
  CartItemCreationData,
  CartItemDTO,
  CartProduct
} from '@/features/cart/domain/cart-entities'
import { failure, type Result, success } from '@/helpers/result'
import { CartDatabase, type EntitySelectedFields } from '@/infrastructure/database'

const CART_ITEM_SELECTED_FIELDS = {
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

const addItemToUserCart = async (
  userId: string,
  cartItemCreationData: CartItemCreationData
): Promise<Result<CartItemDTO>> => {
  try {
    const existingItem = await CartDatabase.findUnique({
      select: { quantity: true },
      where: {
        productId_userId: {
          productId: cartItemCreationData.productId,
          userId
        }
      }
    })

    if (existingItem) {
      const updatedCartItem = await CartDatabase.update({
        data: { quantity: existingItem.quantity + cartItemCreationData.quantity },
        select: cartItemSelectedFields,
        where: {
          productId_userId: {
            productId: cartItemCreationData.productId,
            userId
          }
        }
      })

      return success(updatedCartItem)
    }

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
      select: cartItemSelectedFields,
      where: { userId }
    })

    return success(userCartItems)
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
    await CartDatabase.delete({
      where: {
        productId_userId: {
          productId,
          userId
        }
      }
    })

    return success()
  } catch (error) {
    console.error('Unknown error in CartRepository.removeItemFromUserCart:', error)
    return failure()
  }
}

const updateUserCartItemQuantity = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<Result<CartItemDTO, NotFound>> => {
  try {
    const updatedCartItem = await CartDatabase.update({
      data: { quantity },
      select: cartItemSelectedFields,
      where: {
        productId_userId: {
          productId,
          userId
        }
      }
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
