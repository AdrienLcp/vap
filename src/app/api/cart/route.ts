import type { NextRequest } from 'next/server'

import { CartController } from '@/features/cart/presentation/controllers/cart-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const DELETE = async () => {
  return nextResponse(CartController.clearUserCart())
}

export const GET = async () => {
  return nextResponse(CartController.findUserCartItems())
}

export const POST = async (request: NextRequest) => {
  return nextResponse(CartController.addItemToUserCart(request))
}
