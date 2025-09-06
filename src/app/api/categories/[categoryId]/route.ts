import type { NextRequest } from 'next/server'

import { CategoryController } from '@/features/category/presentation/controllers/category-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

type CategoryIdContext = RouteContext<'/api/categories/[categoryId]'>

export const DELETE = async (_request: NextRequest, context: CategoryIdContext) => {
  const { categoryId } = await context.params
  return nextResponse(CategoryController.deleteCategory(categoryId))
}

export const GET = async (_request: NextRequest, context: CategoryIdContext) => {
  const { categoryId } = await context.params
  return nextResponse(CategoryController.findCategory(categoryId))
}

export const PATCH = async (request: NextRequest, context: CategoryIdContext) => {
  const { categoryId } = await context.params
  return nextResponse(CategoryController.updateCategory(categoryId, request))
}
