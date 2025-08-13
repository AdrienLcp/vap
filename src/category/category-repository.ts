import 'server-only'

import type { CategoryCreationData, CategoryDTO, CategoryNameAlreadyExists, CategoryUpdateData } from '@/category/domain/category-entities'
import { type Result, success, unexpectedError } from '@/helpers/result'
import { CategoryDatabase } from '@/infrastructure/database'

const categorySelect = {
  id: true,
  name: true,
  description: true,
  imageUrl: true
}

const createCategory = async (categoryCreationData: CategoryCreationData): Promise<Result<CategoryNameAlreadyExists, CategoryDTO>> => {
  try {
    const createdCategory = await CategoryDatabase.create({
      data: {
        name: categoryCreationData.name,
        description: categoryCreationData.description,
        imageUrl: categoryCreationData.imageUrl
      },
      select: categorySelect
    })

    return success(createdCategory)
  } catch (error) {
    return unexpectedError('Unknown error in CategoryRepository.createCategory:', error)
  }
}

const findCategories = async (): Promise<Result<null, CategoryDTO[]>> => {
  try {
    const categories = await CategoryDatabase.findMany({ select: categorySelect })

    return success(categories)
  } catch (error) {
    return unexpectedError('Unknown error in CategoryRepository.findCategories:', error)
  }
}

const updateCategory = async (categoryId: string, categoryData: CategoryUpdateData): Promise<Result<CategoryNameAlreadyExists, CategoryDTO>> => {
  try {
    const updatedCategory = await CategoryDatabase.update({
      where: { id: categoryId },
      data: {
        name: categoryData.name,
        description: categoryData.description,
        imageUrl: categoryData.imageUrl
      },
      select: categorySelect
    })

    return success(updatedCategory)
  } catch (error) {
    return unexpectedError('Unknown error in CategoryRepository.updateCategory:', error)
  }
}

export const CategoryRepository = {
  createCategory,
  findCategories,
  updateCategory
}
