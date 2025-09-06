import type { NextRequest } from 'next/server'

import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const GET = async () => {
  return nextResponse(ProductController.findProducts())
}

export const POST = async (request: NextRequest) => {
  return nextResponse(ProductController.createProduct(request))
}
