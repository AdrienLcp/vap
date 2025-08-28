import type { NextRequest } from 'next/server'

import { nextResponse } from '@/infrastructure/api/api-lib'
import { ProductController } from '@/product/presentation/controllers/product-controller'

export const GET = async () => {
  return nextResponse(ProductController.findProducts())
}

export const POST = async (request: NextRequest) => {
  return nextResponse(ProductController.createProduct(request))
}
