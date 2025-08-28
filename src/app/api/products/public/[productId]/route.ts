import type { NextRequest } from 'next/server'

import { nextResponse } from '@/infrastructure/api/api-lib'
import { ProductController } from '@/product/presentation/controllers/product-controller'

type PublicProductIdContext = RouteContext<'/api/products/public/[productId]'>

export const GET = async (_request: NextRequest, context: PublicProductIdContext) => {
  const { productId } = await context.params
  return nextResponse(ProductController.findPublicProduct(productId))
}
