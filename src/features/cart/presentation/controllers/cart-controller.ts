import type { CartItemCreationData, CartItemCreationResponse, CartItemListResponse, CartItemQuantityUpdateResponse, CartItemUpdateData } from '@/features/cart/domain/cart-entities'
import { HttpResponse } from '@/infrastructure/api/http-response'

const addItemToUserCart = async (cartItemCreationData: CartItemCreationData): Promise<CartItemCreationResponse> => {
  try {
    console.log(cartItemCreationData)
    return HttpResponse.internalServerError()
  } catch (error) {
    console.error('Unknown error in CartRepository.addItemToUserCart:', error)
    return HttpResponse.internalServerError()
  }
}

const findUserCartItems = async (): Promise<CartItemListResponse> => {
  try {
    return HttpResponse.internalServerError()
  } catch (error) {
    console.error('Unknown error in CartRepository.findCartByUserId:', error)
    return HttpResponse.internalServerError()
  }
}

const removeItemFromUserCart = async (cartItemId: string) => {
  try {
    console.log(cartItemId)
    return HttpResponse.internalServerError()
  } catch (error) {
    console.error('Unknown error in CartRepository.removeItemFromUserCart:', error)
    return HttpResponse.internalServerError()
  }
}

const updateUserCartItemQuantity = async (cartItemId: string, cartItemUpdateData: CartItemUpdateData): Promise<CartItemQuantityUpdateResponse> => {
  try {
    console.log(cartItemId, cartItemUpdateData)
    return HttpResponse.internalServerError()
  } catch (error) {
    console.error('Unknown error in CartRepository.updateCartItemQuantity:', error)
    return HttpResponse.internalServerError()
  }
}

export const CartController = {
  addItemToUserCart,
  findUserCartItems,
  removeItemFromUserCart,
  updateUserCartItemQuantity
}
