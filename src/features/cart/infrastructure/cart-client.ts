'use client'

import { CART_API_BASE_URL } from '@/features/cart/domain/cart-constants'
import type {
  CartClearResponse,
  CartItemCreationData,
  CartItemCreationResponse,
  CartItemDeletionResponse,
  CartItemListResponse,
  CartItemQuantityUpdateResponse,
  CartItemUpdateData
} from '@/features/cart/domain/cart-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'

const addItemToUserCart = async (
  cartItemCreationData: CartItemCreationData
): Promise<ClientResponse<CartItemCreationResponse>> => {
  try {
    return await ApiClient.POST<CartItemCreationResponse, CartItemCreationData>(
      CART_API_BASE_URL,
      cartItemCreationData
    )
  } catch (error) {
    console.error('Add item to user cart error:', error)
    return unknownError()
  }
}

const clearUserCart = async (): Promise<ClientResponse<CartClearResponse>> => {
  try {
    return await ApiClient.DELETE<CartClearResponse>(`/${CART_API_BASE_URL}`)
  } catch (error) {
    console.error('Clear user cart error:', error)
    return unknownError()
  }
}

const findUserCartItems = async (): Promise<ClientResponse<CartItemListResponse>> => {
  try {
    return await ApiClient.GET<CartItemListResponse>(`/${CART_API_BASE_URL}`)
  } catch (error) {
    console.error('Find user cart items error:', error)
    return unknownError()
  }
}

const removeItemFromUserCart = async (
  productId: string
): Promise<ClientResponse<CartItemDeletionResponse>> => {
  try {
    const encodedProductId = encodeURIComponent(productId)
    return await ApiClient.DELETE<CartItemDeletionResponse>(
      `/${CART_API_BASE_URL}/${encodedProductId}`
    )
  } catch (error) {
    console.error('Remove item from user cart error:', error)
    return unknownError()
  }
}

const updateUserCartItemQuantity = async (
  productId: string,
  quantity: number
): Promise<ClientResponse<CartItemQuantityUpdateResponse>> => {
  try {
    const encodedProductId = encodeURIComponent(productId)
    return await ApiClient.PATCH<CartItemQuantityUpdateResponse, CartItemUpdateData>(
      `/${CART_API_BASE_URL}/${encodedProductId}`,
      { quantity }
    )
  } catch (error) {
    console.error('Update user cart item quantity error:', error)
    return unknownError()
  }
}

export const CartClient = {
  addItemToUserCart,
  clearUserCart,
  findUserCartItems,
  removeItemFromUserCart,
  updateUserCartItemQuantity
}
