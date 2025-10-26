import 'server-only'

import type { NotFound } from '@/domain/entities'
import type {
  Category,
  CategoryConflictError,
  CategoryCreationData,
  CategoryUpdateData
} from '@/features/category/domain/category-entities'
import { type ErrorResult, failure, type Result, success } from '@/helpers/result'
import { CategoryDatabase, type EntitySelectedFields } from '@/infrastructure/database'
import { getDatabaseError } from '@/infrastructure/database/database-helpers'

const categorySelectedFields = {
  description: true,
  id: true,
  imageUrl: true,
  name: true
} satisfies EntitySelectedFields<Category>

const onCategoryDuplicateError = (duplicatedKeys: string[]): ErrorResult<CategoryConflictError> => {
  if (duplicatedKeys.includes('name')) {
    return failure('CATEGORY_NAME_ALREADY_EXISTS')
  }

  console.error('Duplicate key error in CategoryRepository:', duplicatedKeys)
  return failure()
}

const createCategory = async (
  categoryCreationData: CategoryCreationData
): Promise<Result<Category, CategoryConflictError>> => {
  try {
    const createdCategory = await CategoryDatabase.create({
      data: {
        description: categoryCreationData.description,
        imageUrl: categoryCreationData.imageUrl,
        name: categoryCreationData.name
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
      select: categorySelectedFields,
      where: { id: categoryId }
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

const updateCategory = async (
  categoryId: string,
  categoryData: CategoryUpdateData
): Promise<Result<Category, CategoryConflictError>> => {
  try {
    const updatedCategory = await CategoryDatabase.update({
      data: {
        description: categoryData.description,
        imageUrl: categoryData.imageUrl,
        name: categoryData.name
      },
      select: categorySelectedFields,
      where: { id: categoryId }
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
