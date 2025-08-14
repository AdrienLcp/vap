import 'server-only'

import { AuthService } from '@/auth/application/auth-service'
import type { CategoryCreationData, CategoryCreationError, CategoryDTO, CategoryUpdateData } from '@/category/domain/category-entities'
import { CategoryRepository } from '@/category/infrastructure/category-repository'
import { failure, type Result } from '@/helpers/result'

const createCategory = async (categoryCreationData: CategoryCreationData): Promise<Result<CategoryCreationError, CategoryDTO>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return failure('UNAUTHORIZED')
  }

  if (!userResult.data.permissions.canUpdateCategory) {
    return failure('FORBIDDEN')
  }

  return await CategoryRepository.createCategory(categoryCreationData)
}

const findCategories = async () => {
  return await CategoryRepository.findCategories()
}

const updateCategory = async (categoryId: string, categoryUpdateData: CategoryUpdateData) => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return failure('UNAUTHORIZED')
  }

  if (!userResult.data.permissions.canUpdateCategory) {
    return failure('FORBIDDEN')
  }

  return await CategoryRepository.updateCategory(categoryId, categoryUpdateData)
}

export const CategoryService = {
  createCategory,
  findCategories,
  updateCategory
}
