import type { NextRequest } from 'next/server'

import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

type PublicProductRouteContext = RouteContext<'/api/products/public/[productId]'>

export const GET = async (_request: NextRequest, context: PublicProductRouteContext) => {
  const { productId } = await context.params
  return nextResponse(ProductController.findPublicProduct(productId))
}
