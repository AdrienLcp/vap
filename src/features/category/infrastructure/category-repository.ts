import 'server-only'

import { eq } from 'drizzle-orm'

import type { NotFound } from '@/domain/entities'
import type {
  Category,
  CategoryConflictError,
  CategoryCreationData,
  CategoryUpdateData
} from '@/features/category/domain/category-entities'
import { categories } from '@/features/category/infrastructure/category-schema'
import {
  type ErrorResult,
  failure,
  type Result,
  success
} from '@/helpers/result'
import { db } from '@/infrastructure/database'
import { getDatabaseError } from '@/infrastructure/database/database-helpers'

const categorySelectedFields = {
  description: categories.description,
  id: categories.id,
  imageUrl: categories.imageUrl,
  name: categories.name
} as const

const onCategoryDuplicateError = (
  duplicatedKeys: string[]
): ErrorResult<CategoryConflictError> => {
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
    const [createdCategory] = await db
      .insert(categories)
      .values({
        description: categoryCreationData.description,
        imageUrl: categoryCreationData.imageUrl,
        name: categoryCreationData.name
      })
      .returning(categorySelectedFields)

    if (!createdCategory) {
      return failure()
    }

    return success(createdCategory)
  } catch (error) {
    const databaseError = getDatabaseError(error)

    switch (databaseError.code) {
      case 'DUPLICATE':
        return onCategoryDuplicateError(databaseError.duplicatedKeys)
      default:
        console.error(
          'Unknown error in CategoryRepository.createCategory:',
          error
        )
        return failure()
    }
  }
}

const deleteCategory = async (categoryId: string): Promise<Result> => {
  try {
    await db.delete(categories).where(eq(categories.id, categoryId))
    return success()
  } catch (error) {
    console.error('Unknown error in CategoryRepository.deleteCategory:', error)
    return failure()
  }
}

const findCategories = async (): Promise<Result<Category[]>> => {
  try {
    const rows = await db.select(categorySelectedFields).from(categories)
    return success(rows)
  } catch (error) {
    console.error('Unknown error in CategoryRepository.findCategories:', error)
    return failure()
  }
}

const findCategory = async (
  categoryId: string
): Promise<Result<Category, NotFound>> => {
  try {
    const [category] = await db
      .select(categorySelectedFields)
      .from(categories)
      .where(eq(categories.id, categoryId))
      .limit(1)

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
    const [updatedCategory] = await db
      .update(categories)
      .set({
        description: categoryData.description,
        imageUrl: categoryData.imageUrl,
        name: categoryData.name
      })
      .where(eq(categories.id, categoryId))
      .returning(categorySelectedFields)

    if (!updatedCategory) {
      return failure()
    }

    return success(updatedCategory)
  } catch (error) {
    const databaseError = getDatabaseError(error)

    switch (databaseError.code) {
      case 'DUPLICATE':
        return onCategoryDuplicateError(databaseError.duplicatedKeys)
      default:
        console.error(
          'Unknown error in CategoryRepository.createCategory:',
          error
        )
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
