import type { NextRequest } from 'next/server'

import { CategoryController } from '@/category/presentation/category-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const DELETE = async (_request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) => {
  const { categoryId } = await params
  return nextResponse(CategoryController.deleteCategory(categoryId))
}

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) => {
  const { categoryId } = await params
  return nextResponse(CategoryController.updateCategory(categoryId, request))
}
