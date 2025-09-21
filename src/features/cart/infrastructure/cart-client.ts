'use client'

import { CART_API_BASE_URL } from '@/features/cart/domain/cart-constants'
import type { CartClearResponse, CartItemCreationData, CartItemCreationResponse, CartItemDeletionResponse, CartItemListResponse } from '@/features/cart/domain/cart-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'

const addItemToUserCart = async (cartItemCreationData: CartItemCreationData): Promise<ClientResponse<CartItemCreationResponse>> => {
  try {
    return await ApiClient.POST<CartItemCreationResponse, CartItemCreationData>(CART_API_BASE_URL, cartItemCreationData)
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

const removeItemFromUserCart = async (cartItemId: string): Promise<ClientResponse<CartItemDeletionResponse>> => {
  try {
    const encodedCartItemId = encodeURIComponent(cartItemId)
    return await ApiClient.DELETE<CartItemDeletionResponse>(`/${CART_API_BASE_URL}/${encodedCartItemId}`)
  } catch (error) {
    console.error('Remove item from user cart error:', error)
    return unknownError()
  }
}

const updateUserCartItemQuantity = async (cartItemId: string, quantity: number): Promise<ClientResponse<CartItemCreationResponse>> => {
  try {
    const encodedCartItemId = encodeURIComponent(cartItemId)
    return await ApiClient.PATCH<CartItemCreationResponse, { quantity: number }>(`/${CART_API_BASE_URL}/${encodedCartItemId}`, { quantity })
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
