import 'server-only'

import type { CategoryCreationData, CategoryDTO, CategoryNameAlreadyExists, CategoryUpdateData } from '@/category/domain/category-entities'
import { type ErrorResult, failure, type Result, success } from '@/helpers/result'
import { CategoryDatabase, getDatabaseError } from '@/infrastructure/database'

const categorySelect = {
  id: true,
  name: true,
  description: true,
  imageUrl: true
}

const onCategoryDuplicateError = (duplicatedKeys: string[]): ErrorResult<CategoryNameAlreadyExists> => {
  if (duplicatedKeys.includes('name')) {
    return failure('CATEGORY_NAME_ALREADY_EXISTS')
  }

  console.error('Duplicate key error in CategoryRepository:', duplicatedKeys)
  return failure()
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
    const databaseError = getDatabaseError(error)

    switch (databaseError.code) {
      case 'DUPLICATE':
        return onCategoryDuplicateError(databaseError.duplicatedKeys)
      default:
        console.error('Unknown error in CategoryRepository.createCategory:', error)
        return failure()
    }
  }
}

const findCategories = async (): Promise<Result<null, CategoryDTO[]>> => {
  try {
    const categories = await CategoryDatabase.findMany({ select: categorySelect })

    return success(categories)
  } catch (error) {
    console.error('Unknown error in CategoryRepository.findCategories:', error)
    return failure()
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
    const databaseError = getDatabaseError(error)

    switch (databaseError.code) {
      case 'DUPLICATE':
        return onCategoryDuplicateError(databaseError.duplicatedKeys)
      default:
        console.error('Unknown error in CategoryRepository.createCategory:', error)
        return failure()
    }
  }
}

export const CategoryRepository = {
  createCategory,
  findCategories,
  updateCategory
}
