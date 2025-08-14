import type { NextRequest } from 'next/server'

import { nextResponse } from '@/infrastructure/api/api-lib'
import { ProductController } from '@/product/presentation/product-controller'

type ProductIdParams = { params: Promise<{ productId: string }> }

export const DELETE = async (_request: NextRequest, { params }: ProductIdParams) => {
  const { productId } = await params
  return nextResponse(ProductController.deleteProduct(productId))
}

export const POST = async (request: NextRequest, { params }: ProductIdParams) => {
  const { productId } = await params
  return nextResponse(ProductController.updateProduct(productId, request))
}
