import type { NextRequest } from 'next/server'

import { nextResponse } from '@/infrastructure/api/api-lib'
import { ProductController } from '@/product/product-controller'

export const POST = async (request: NextRequest, params: Promise<{ productId: string }>) => {
  const { productId } = await params
  return nextResponse(ProductController.updateProduct(productId, request))
}
