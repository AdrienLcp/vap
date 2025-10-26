import 'server-only'

import { CategoryService } from '@/features/category/application/category-service'
import {
  CATEGORY_API_BASE_URL,
  CATEGORY_ERRORS
} from '@/features/category/domain/category-constants'
import type {
  CategoryCreationResponse,
  CategoryDeletionResponse,
  CategoryListResponse,
  CategoryResponse,
  CategoryUpdateResponse
} from '@/features/category/domain/category-entities'
import {
  CategoryCreationSchema,
  CategoryDTOSchema,
  CategoryIdSchema,
  CategoryUpdateSchema
} from '@/features/category/domain/category-schemas'
import { HttpResponse } from '@/infrastructure/api/http-response'
import { buildLocationUrl } from '@/infrastructure/env/client'

const createCategory = async (
  categoryCreationRequest: Request
): Promise<CategoryCreationResponse> => {
  try {
    const categoryCreationData = await categoryCreationRequest.json()
    const categoryCreationValidation = CategoryCreationSchema.safeParse(categoryCreationData)

    if (!categoryCreationValidation.success) {
      return HttpResponse.badRequest(categoryCreationValidation.error.issues)
    }

    const categoryCreationResult = await CategoryService.createCategory(
      categoryCreationValidation.data
    )

    if (categoryCreationResult.status === 'ERROR') {
      switch (categoryCreationResult.error) {
        case CATEGORY_ERRORS.NAME_ALREADY_EXISTS:
          return HttpResponse.conflict(CATEGORY_ERRORS.NAME_ALREADY_EXISTS)
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in CategoryController.createCategory:',
            categoryCreationResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const categoryDTOValidation = CategoryDTOSchema.safeParse(categoryCreationResult.data)

    if (!categoryDTOValidation.success) {
      console.error(
        'Validation error in CategoryController.createCategory:',
        categoryDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    const categoryDTO = categoryDTOValidation.data
    const createdCategoryLocationUrl = buildLocationUrl(CATEGORY_API_BASE_URL, categoryDTO.id)

    return HttpResponse.created(categoryDTO, { Location: createdCategoryLocationUrl })
  } catch (error) {
    console.error('Unknown error in CategoryController.createCategory:', error)
    return HttpResponse.internalServerError()
  }
}

const deleteCategory = async (categoryId: unknown): Promise<CategoryDeletionResponse> => {
  try {
    const categoryIdValidation = CategoryIdSchema.safeParse(categoryId)

    if (!categoryIdValidation.success) {
      return HttpResponse.badRequest(categoryIdValidation.error.issues)
    }

    const categoryDeletionResult = await CategoryService.deleteCategory(categoryIdValidation.data)

    if (categoryDeletionResult.status === 'ERROR') {
      switch (categoryDeletionResult.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in CategoryController.deleteCategory:',
            categoryDeletionResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Unknown error in CategoryController.deleteCategory:', error)
    return HttpResponse.internalServerError()
  }
}

const findCategories = async (): Promise<CategoryListResponse> => {
  try {
    const categoriesResult = await CategoryService.findCategories()

    if (categoriesResult.status === 'ERROR') {
      console.error('Unknown error in CategoryController.findCategories:', categoriesResult.error)
      return HttpResponse.internalServerError()
    }

    const categoriesDTOValidation = CategoryDTOSchema.array().safeParse(categoriesResult.data)

    if (!categoriesDTOValidation.success) {
      console.error(
        'Validation error in CategoryController.findCategories:',
        categoriesDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(categoriesResult.data)
  } catch (error) {
    console.error('Unknown error in CategoryController.findCategories:', error)
    return HttpResponse.internalServerError()
  }
}

const findCategory = async (categoryId: unknown): Promise<CategoryResponse> => {
  try {
    const categoryIdValidation = CategoryIdSchema.safeParse(categoryId)

    if (!categoryIdValidation.success) {
      return HttpResponse.badRequest(categoryIdValidation.error.issues)
    }

    const categoryResult = await CategoryService.findCategory(categoryIdValidation.data)

    if (categoryResult.status === 'ERROR') {
      if (categoryResult.error === 'NOT_FOUND') {
        return HttpResponse.notFound()
      }
      console.error('Unknown error in CategoryController.findCategory:', categoryResult.error)
      return HttpResponse.internalServerError()
    }

    const categoryDTOValidation = CategoryDTOSchema.safeParse(categoryResult.data)

    if (!categoryDTOValidation.success) {
      console.error(
        'Validation error in CategoryController.findCategory:',
        categoryDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(categoryDTOValidation.data)
  } catch (error) {
    console.error('Unknown error in CategoryController.findCategory:', error)
    return HttpResponse.internalServerError()
  }
}

const updateCategory = async (
  categoryId: unknown,
  categoryUpdateRequest: Request
): Promise<CategoryUpdateResponse> => {
  try {
    const categoryIdValidation = CategoryIdSchema.safeParse(categoryId)

    if (!categoryIdValidation.success) {
      return HttpResponse.badRequest(categoryIdValidation.error.issues)
    }

    const categoryUpdateData = await categoryUpdateRequest.json()
    const categoryUpdateValidation = CategoryUpdateSchema.safeParse(categoryUpdateData)

    if (!categoryUpdateValidation.success) {
      return HttpResponse.badRequest(categoryUpdateValidation.error.issues)
    }

    const categoryUpdateResult = await CategoryService.updateCategory(
      categoryIdValidation.data,
      categoryUpdateValidation.data
    )

    if (categoryUpdateResult.status === 'ERROR') {
      switch (categoryUpdateResult.error) {
        case CATEGORY_ERRORS.NAME_ALREADY_EXISTS:
          return HttpResponse.conflict(CATEGORY_ERRORS.NAME_ALREADY_EXISTS)
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in CategoryController.updateCategory:',
            categoryUpdateResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const categoryDTOValidation = CategoryDTOSchema.safeParse(categoryUpdateResult.data)

    if (!categoryDTOValidation.success) {
      console.error(
        'Validation error in CategoryController.updateCategory:',
        categoryDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(categoryDTOValidation.data)
  } catch (error) {
    console.error('Unknown error in CategoryController.updateCategory:', error)
    return HttpResponse.internalServerError()
  }
}

export const CategoryController = {
  createCategory,
  deleteCategory,
  findCategories,
  findCategory,
  updateCategory
}
