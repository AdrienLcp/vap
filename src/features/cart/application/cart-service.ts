import 'server-only'

import { AuthService } from '@/features/auth/application/auth-service'
import type { CartItemCreationData } from '@/features/cart/domain/cart-entities'
import { CartRepository } from '@/features/cart/infrastructure/cart-repository'

const addItemToUserCart = async (cartItemCreationData: CartItemCreationData) => {
  const authUserResult = await AuthService.findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  return await CartRepository.addItemToUserCart(authUserResult.data.id, cartItemCreationData)
}

const clearUserCart = async () => {
  const authUserResult = await AuthService.findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  return await CartRepository.clearUserCart(authUserResult.data.id)
}

const findUserCartItems = async () => {
  const authUserResult = await AuthService.findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  return await CartRepository.findUserCartItems(authUserResult.data.id)
}

const removeItemFromUserCart = async (productId: string) => {
  const authUserResult = await AuthService.findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  return await CartRepository.removeItemFromUserCart(authUserResult.data.id, productId)
}

const updateUserCartItemQuantity = async (productId: string, quantity: number) => {
  const authUserResult = await AuthService.findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  if (quantity === 0) {
    return await CartRepository.removeItemFromUserCart(authUserResult.data.id, productId)
  }

  return await CartRepository.updateUserCartItemQuantity(authUserResult.data.id, productId, quantity)
}

export const CartService = {
  addItemToUserCart,
  clearUserCart,
  findUserCartItems,
  removeItemFromUserCart,
  updateUserCartItemQuantity
}
