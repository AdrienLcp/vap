import type { NextRequest } from 'next/server'

import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

type ProductIdContext = RouteContext<'/api/products/[productId]'>

export const GET = async (_request: NextRequest, context: ProductIdContext) => {
  const { productId } = await context.params
  return nextResponse(ProductController.findProduct(productId))
}

export const DELETE = async (_request: NextRequest, context: ProductIdContext) => {
  const { productId } = await context.params
  return nextResponse(ProductController.deleteProduct(productId))
}

export const PATCH = async (request: NextRequest, context: ProductIdContext) => {
  const { productId } = await context.params
  return nextResponse(ProductController.updateProduct(productId, request))
}
