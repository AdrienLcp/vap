import type { NextRequest } from 'next/server'

import { CartController } from '@/features/cart/presentation/controllers/cart-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

type CartItemRouteContext = RouteContext<'/api/cart/[productId]'>

export const DELETE = async (_request: NextRequest, context: CartItemRouteContext) => {
  const { productId } = await context.params
  return nextResponse(CartController.removeItemFromUserCart(productId))
}

export const PATCH = async (request: NextRequest, context: CartItemRouteContext) => {
  const { productId } = await context.params
  return nextResponse(CartController.updateUserCartItemQuantity(productId, request))
}
