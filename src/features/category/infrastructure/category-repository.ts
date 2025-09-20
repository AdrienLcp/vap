import 'server-only'

import type { NotFound } from '@/domain/entities'
import type { Category, CategoryConflictError, CategoryCreationData, CategoryUpdateData } from '@/features/category/domain/category-entities'
import { type ErrorResult, failure, type Result, success } from '@/helpers/result'
import { CategoryDatabase, type EntitySelectedFields } from '@/infrastructure/database'
import { getDatabaseError } from '@/infrastructure/database/database-helpers'

const categorySelectedFields = {
  id: true,
  name: true,
  description: true,
  imageUrl: true
} satisfies EntitySelectedFields<Category>

const onCategoryDuplicateError = (duplicatedKeys: string[]): ErrorResult<CategoryConflictError> => {
  if (duplicatedKeys.includes('name')) {
    return failure('CATEGORY_NAME_ALREADY_EXISTS')
  }

  console.error('Duplicate key error in CategoryRepository:', duplicatedKeys)
  return failure()
}

const createCategory = async (categoryCreationData: CategoryCreationData): Promise<Result<Category, CategoryConflictError>> => {
  try {
    const createdCategory = await CategoryDatabase.create({
      data: {
        name: categoryCreationData.name,
        description: categoryCreationData.description,
        imageUrl: categoryCreationData.imageUrl
      },
      select: categorySelectedFields
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

const findCategories = async (): Promise<Result<Category[]>> => {
  try {
    const categories = await CategoryDatabase.findMany({ select: categorySelectedFields })
    return success(categories)
  } catch (error) {
    console.error('Unknown error in CategoryRepository.findCategories:', error)
    return failure()
  }
}

const findCategory = async (categoryId: string): Promise<Result<Category, NotFound>> => {
  try {
    const category = await CategoryDatabase.findUnique({
      where: { id: categoryId },
      select: categorySelectedFields
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

const updateCategory = async (categoryId: string, categoryData: CategoryUpdateData): Promise<Result<Category, CategoryConflictError>> => {
  try {
    const updatedCategory = await CategoryDatabase.update({
      where: { id: categoryId },
      data: {
        name: categoryData.name,
        description: categoryData.description,
        imageUrl: categoryData.imageUrl
      },
      select: categorySelectedFields
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
