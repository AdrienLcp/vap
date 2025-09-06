import 'server-only'

import { AuthService } from '@/features/auth/application/auth-service'
import type { CategoryCreationData, CategoryCreationError, CategoryDTO, CategoryUpdateData } from '@/features/category/domain/category-entities'
import { CategoryRepository } from '@/features/category/infrastructure/category-repository'
import { failure, type NotFound, type Result } from '@/helpers/result'

const createCategory = async (categoryCreationData: CategoryCreationData): Promise<Result<CategoryCreationError, CategoryDTO>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return failure('UNAUTHORIZED')
  }

  if (!userResult.data.permissions.canCreateCategory) {
    return failure('FORBIDDEN')
  }

  return await CategoryRepository.createCategory(categoryCreationData)
}

const deleteCategory = async (categoryId: string) => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return failure('UNAUTHORIZED')
  }

  if (!userResult.data.permissions.canDeleteCategory) {
    return failure('FORBIDDEN')
  }

  return await CategoryRepository.deleteCategory(categoryId)
}

const findCategories = async () => {
  return await CategoryRepository.findCategories()
}

const findCategory = async (categoryId: string): Promise<Result<NotFound, CategoryDTO>> => {
  return await CategoryRepository.findCategory(categoryId)
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
  deleteCategory,
  findCategories,
  findCategory,
  updateCategory
}
