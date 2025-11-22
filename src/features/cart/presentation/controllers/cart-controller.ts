import 'server-only'

import { CartService } from '@/features/cart/application/cart-service'
import { CART_API_BASE_URL } from '@/features/cart/domain/cart-constants'
import type {
  CartClearResponse,
  CartItemCreationResponse,
  CartItemDeletionResponse,
  CartItemListResponse,
  CartItemQuantityUpdateResponse
} from '@/features/cart/domain/cart-entities'
import {
  CartItemCreationDataSchema,
  CartItemDTOSchema,
  CartItemUpdateDataSchema
} from '@/features/cart/domain/cart-schemas'
import { ProductIdSchema } from '@/features/product/domain/product-schemas'
import { HttpResponse } from '@/infrastructure/api/http-response'
import { buildLocationUrl } from '@/utils/url-utils'

const addItemToUserCart = async (
  cartItemCreationRequest: Request
): Promise<CartItemCreationResponse> => {
  try {
    const cartItemCreationData = await cartItemCreationRequest.json()
    const cartItemCreationValidation = CartItemCreationDataSchema.safeParse(cartItemCreationData)

    if (!cartItemCreationValidation.success) {
      return HttpResponse.badRequest(cartItemCreationValidation.error.issues)
    }

    const cartItemCreationResult = await CartService.addItemToUserCart(
      cartItemCreationValidation.data
    )

    if (cartItemCreationResult.status === 'ERROR') {
      switch (cartItemCreationResult.error) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in CartController.addItemToUserCart:',
            cartItemCreationResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const cartItemDTOValidation = CartItemDTOSchema.safeParse(cartItemCreationResult.data)

    if (!cartItemDTOValidation.success) {
      console.error(
        'Validation error in CartController.addItemToUserCart:',
        cartItemDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    const createdCartItem = cartItemDTOValidation.data
    const createdCartItemLocationUrl = buildLocationUrl(
      CART_API_BASE_URL,
      createdCartItem.product.id
    )

    return HttpResponse.created(createdCartItem, { Location: createdCartItemLocationUrl })
  } catch (error) {
    console.error('Unknown error in CartRepository.addItemToUserCart:', error)
    return HttpResponse.internalServerError()
  }
}

const clearUserCart = async (): Promise<CartClearResponse> => {
  try {
    const clearCartResult = await CartService.clearUserCart()

    if (clearCartResult.status === 'ERROR') {
      switch (clearCartResult.error) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in CartController.clearUserCart:', clearCartResult.error)
          return HttpResponse.internalServerError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Unknown error in CartRepository.clearUserCart:', error)
    return HttpResponse.internalServerError()
  }
}

const findUserCartItems = async (): Promise<CartItemListResponse> => {
  try {
    const cartResult = await CartService.findUserCartItems()

    if (cartResult.status === 'ERROR') {
      switch (cartResult.error) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in CartController.findUserCartItems:', cartResult.error)
          return HttpResponse.internalServerError()
      }
    }

    const cartValidation = CartItemDTOSchema.array().safeParse(cartResult.data)

    if (!cartValidation.success) {
      console.error('Validation error in CartController.findUserCartItems:', cartValidation.error)
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(cartValidation.data)
  } catch (error) {
    console.error('Unknown error in CartRepository.findCartByUserId:', error)
    return HttpResponse.internalServerError()
  }
}

const removeItemFromUserCart = async (productId: string): Promise<CartItemDeletionResponse> => {
  try {
    const productIdValidation = ProductIdSchema.safeParse(productId)

    if (!productIdValidation.success) {
      return HttpResponse.badRequest(productIdValidation.error.issues)
    }

    const cartItemDeletionResult = await CartService.removeItemFromUserCart(
      productIdValidation.data
    )

    if (cartItemDeletionResult.status === 'ERROR') {
      switch (cartItemDeletionResult.error) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in CartController.removeItemFromUserCart:',
            cartItemDeletionResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Unknown error in CartRepository.removeItemFromUserCart:', error)
    return HttpResponse.internalServerError()
  }
}

const updateUserCartItemQuantity = async (
  productId: string,
  request: Request
): Promise<CartItemQuantityUpdateResponse> => {
  try {
    const productIdValidation = ProductIdSchema.safeParse(productId)

    if (!productIdValidation.success) {
      return HttpResponse.badRequest(productIdValidation.error.issues)
    }

    const cartItemUpdateData = await request.json()
    const cartItemUpdateDataValidation = CartItemUpdateDataSchema.safeParse(cartItemUpdateData)

    if (!cartItemUpdateDataValidation.success) {
      return HttpResponse.badRequest(cartItemUpdateDataValidation.error.issues)
    }

    const cartItemUpdateResult = await CartService.updateUserCartItemQuantity(
      productIdValidation.data,
      cartItemUpdateDataValidation.data.quantity
    )

    if (cartItemUpdateResult.status === 'ERROR') {
      switch (cartItemUpdateResult.error) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in CartController.updateUserCartItemQuantity:',
            cartItemUpdateResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Unknown error in CartRepository.updateCartItemQuantity:', error)
    return HttpResponse.internalServerError()
  }
}

export const CartController = {
  addItemToUserCart,
  clearUserCart,
  findUserCartItems,
  removeItemFromUserCart,
  updateUserCartItemQuantity
}
