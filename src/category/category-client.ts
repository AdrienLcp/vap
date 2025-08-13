'use client'

import { ZodError } from 'zod'

import type { CategoryCreationData, CategoryCreationError, CategoryCreationResponse, CategoryDTO, CategoryListResponse, CategoryUpdateData, CategoryUpdateError, CategoryUpdateResponse } from '@/category/domain/category-entities'
import { failure, type Result, success, unexpectedError, type ValidationResult } from '@/helpers/result'
import { ApiClient } from '@/infrastructure/api/api-client'

type CreateCategoryResult = ValidationResult<CategoryCreationError, CategoryCreationData, CategoryDTO>

const createCategory = async (categoryCreationData: CategoryCreationData): Promise<CreateCategoryResult> => {
  try {
    const createCategoryResponse = await ApiClient.POST<CategoryCreationResponse, CategoryCreationData>('/categories', categoryCreationData)

    if (createCategoryResponse.status === 'ERROR') {
      console.log('ici > ', createCategoryResponse.errors)

      // Je ne reçois pas ce que je veux ici, donc je ne suis pas "instanceof"
      // Il faut vraiment créer un objet "response" plus précis avec un "type: 'validation'" ou truc du genre
      if (createCategoryResponse.errors instanceof ZodError) {
        return failure(createCategoryResponse.errors)
      }

      switch (createCategoryResponse.errors) {
        case 'CATEGORY_NAME_ALREADY_EXISTS':
          return failure('CATEGORY_NAME_ALREADY_EXISTS')
        case 'FORBIDDEN':
          return failure('FORBIDDEN')
        case 'UNAUTHORIZED':
          return failure('UNAUTHORIZED')
        default:
          return unexpectedError('Create category error:', createCategoryResponse.errors)
      }
    }

    return success(createCategoryResponse.data)
  } catch (error) {
    return unexpectedError('Create category error:', error)
  }
}

const findCategories = async (): Promise<Result<null, CategoryDTO[]>> => {
  try {
    const categoryListResponse = await ApiClient.GET<CategoryListResponse>('/categories')

    if (categoryListResponse.status === 'ERROR') {
      return unexpectedError('Find categories error:', categoryListResponse.errors)
    }

    return success(categoryListResponse.data)
  } catch (error) {
    return unexpectedError('Find categories error:', error)
  }
}

type UpdateCategoryResult = ValidationResult<CategoryUpdateError, CategoryUpdateData | string, CategoryDTO>

const updateCategory = async (categoryId: string, categoryUpdateData: CategoryUpdateData): Promise<UpdateCategoryResult> => {
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
          return unexpectedError('Update category error:', updateCategoryResponse.errors)
      }

      return failure(updateCategoryResponse.errors)
    }

    return success(updateCategoryResponse.data)
  } catch (error) {
    return unexpectedError('Update category error:', error)
  }
}

export const CategoryClient = {
  createCategory,
  findCategories,
  updateCategory
}
