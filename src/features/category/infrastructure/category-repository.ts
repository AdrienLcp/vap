import 'server-only'

import type { NotFound } from '@/domain/entities'
import type { CategoryConflictError, CategoryCreationData, CategoryUpdateData } from '@/features/category/domain/category-entities'
import { type ErrorResult, failure, type Result, success } from '@/helpers/result'
import { CategoryDatabase } from '@/infrastructure/database'
import { getDatabaseError } from '@/infrastructure/database/database-helpers'

export type CategoryRepositoryEntity = {
  id: string
  name: string
  description: string | null
  imageUrl: string | null
}

const categorySelect = {
  id: true,
  name: true,
  description: true,
  imageUrl: true
} satisfies Record<keyof CategoryRepositoryEntity, boolean>

const onCategoryDuplicateError = (duplicatedKeys: string[]): ErrorResult<CategoryConflictError> => {
  if (duplicatedKeys.includes('name')) {
    return failure('CATEGORY_NAME_ALREADY_EXISTS')
  }

  console.error('Duplicate key error in CategoryRepository:', duplicatedKeys)
  return failure()
}

const createCategory = async (categoryCreationData: CategoryCreationData): Promise<Result<CategoryConflictError, CategoryRepositoryEntity>> => {
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

const deleteCategory = async (categoryId: string): Promise<Result> => {
  try {
    await CategoryDatabase.delete({ where: { id: categoryId } })
    return success()
  } catch (error) {
    console.error('Unknown error in CategoryRepository.deleteCategory:', error)
    return failure()
  }
}

const findCategories = async (): Promise<Result<null, CategoryRepositoryEntity[]>> => {
  try {
    const categories = await CategoryDatabase.findMany({ select: categorySelect })
    return success(categories)
  } catch (error) {
    console.error('Unknown error in CategoryRepository.findCategories:', error)
    return failure()
  }
}

const findCategory = async (categoryId: string): Promise<Result<NotFound, CategoryRepositoryEntity>> => {
  try {
    const category = await CategoryDatabase.findUnique({
      where: { id: categoryId },
      select: categorySelect
    })

    if (!category) {
      return failure('NOT_FOUND')
    }

    return success(category)
  } catch (error) {
    console.error('Unknown error in CategoryRepository.findCategory:', error)
    return failure()
  }
}

const updateCategory = async (categoryId: string, categoryData: CategoryUpdateData): Promise<Result<CategoryConflictError, CategoryRepositoryEntity>> => {
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
  deleteCategory,
  findCategories,
  findCategory,
  updateCategory
}
