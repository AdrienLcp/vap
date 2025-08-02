import type { NextRequest } from 'next/server'

import { CategoryController } from '@/category/category-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const POST = async (request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) => {
  const { categoryId } = await params

  return nextResponse(CategoryController.updateCategory(categoryId, request))
}
