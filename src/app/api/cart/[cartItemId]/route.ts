import type { NextRequest } from 'next/server'

import { CartController } from '@/features/cart/presentation/controllers/cart-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

type CartItemRouteContext = RouteContext<'/api/cart/[cartItemId]'>

export const DELETE = async (_request: NextRequest, context: CartItemRouteContext) => {
  const { cartItemId } = await context.params
  return nextResponse(CartController.removeItemFromUserCart(cartItemId))
}

export const PATCH = async (request: NextRequest, context: CartItemRouteContext) => {
  const { cartItemId } = await context.params
  return nextResponse(CartController.updateUserCartItemQuantity(cartItemId, request))
}
