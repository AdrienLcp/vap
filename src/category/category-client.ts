import type { CategoryCreationData, CategoryCreationError, CategoryCreationResponse, CategoryDTO, CategoryListResponse, CategoryUpdateData, CategoryUpdateError, CategoryUpdateResponse } from '@/category/domain/category-entities'
import { failure, type Result, success, unknownError, type ValidationResult } from '@/helpers/result'
import { ApiClient } from '@/infrastructure/api/api-client'

const createCategory = async (categoryCreationData: CategoryCreationData): Promise<Result<CategoryCreationError, CategoryDTO>> => {
  try {
    const createCategoryResponse = await ApiClient.POST<CategoryCreationResponse, CategoryCreationData>('/categories', categoryCreationData)

    if (createCategoryResponse.status === 'ERROR') {
      switch (createCategoryResponse.errors) {
        case 'CATEGORY_NAME_ALREADY_EXISTS':
          return failure('CATEGORY_NAME_ALREADY_EXISTS')
        case 'FORBIDDEN':
          return failure('FORBIDDEN')
        case 'UNAUTHORIZED':
          return failure('UNAUTHORIZED')
        default:
          return unknownError('Create category error:', createCategoryResponse.errors)
      }
    }

    return success(createCategoryResponse.data)
  } catch (error) {
    return unknownError('Create category error:', error)
  }
}

const findCategories = async (): Promise<Result<null, CategoryDTO[]>> => {
  try {
    const categoryListResponse = await ApiClient.GET<CategoryListResponse>('/categories')

    if (categoryListResponse.status === 'ERROR') {
      return unknownError('Find categories error:', categoryListResponse.errors)
    }

    return success(categoryListResponse.data)
  } catch (error) {
    return unknownError('Find categories error:', error)
  }
}

const updateCategory = async (categoryId: string, categoryUpdateData: CategoryUpdateData): Promise<ValidationResult<CategoryUpdateError, CategoryUpdateData, CategoryDTO>> => {
  try {
    const updateCategoryResponse = await ApiClient.PUT<CategoryUpdateResponse, CategoryUpdateData>(`/categories/${categoryId}`, categoryUpdateData)

    if (updateCategoryResponse.status === 'ERROR') {
      switch (updateCategoryResponse.errors) {
        case 'CATEGORY_NAME_ALREADY_EXISTS':
          return failure('CATEGORY_NAME_ALREADY_EXISTS')
        case 'FORBIDDEN':
          return failure('FORBIDDEN')
        case 'UNAUTHORIZED':
          return failure('UNAUTHORIZED')
        case 'INTERNAL_SERVER_ERROR':
        case 'UNEXPECTED_ERROR':
          return unknownError('Update category error:', updateCategoryResponse.errors)
      }

      return failure(updateCategoryResponse.errors)
    }

    return success(updateCategoryResponse.data)
  } catch (error) {
    return unknownError('Update category error:', error)
  }
}

export const CategoryClient = {
  createCategory,
  findCategories,
  updateCategory
}
