import type { NextRequest } from 'next/server'

import { CategoryController } from '@/category/presentation/controllers/category-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const GET = async () => {
  return nextResponse(CategoryController.findCategories())
}

export const POST = async (request: NextRequest) => {
  return nextResponse(CategoryController.createCategory(request))
}
