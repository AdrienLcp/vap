import 'server-only'

import { CategoryService } from '@/category/category-service'
import type { CategoryCreationResponse, CategoryListResponse, CategoryUpdateResponse } from '@/category/domain/category-entities'
import { CategoryCreationSchema, CategoryDTOSchema, CategoryIdSchema, CategoryUpdateSchema } from '@/category/domain/category-schemas'
import { HttpResponse } from '@/infrastructure/api/http-response'

const createCategory = async (categoryCreationRequest: Request): CategoryCreationResponse => {
  try {
    const categoryCreationData = await categoryCreationRequest.json()
    const categoryCreationValidation = CategoryCreationSchema.safeParse(categoryCreationData)

    if (categoryCreationValidation.error) {
      return HttpResponse.badRequest(categoryCreationValidation.error)
    }

    const createdCategoryResult = await CategoryService.createCategory(categoryCreationValidation.data)

    if (createdCategoryResult.status === 'ERROR') {
      switch (createdCategoryResult.errors) {
        case 'CATEGORY_NAME_ALREADY_EXISTS':
          return HttpResponse.conflict('CATEGORY_NAME_ALREADY_EXISTS')
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          return HttpResponse.internalServerError('Unknown error in CategoryController.createCategory:', createdCategoryResult.errors)
      }
    }

    const categoryDTOValidation = CategoryDTOSchema.safeParse(createdCategoryResult.data)

    if (categoryDTOValidation.error) {
      return HttpResponse.internalServerError('Validation error in CategoryController.createCategory:', categoryDTOValidation.error)
    }

    return HttpResponse.created(categoryDTOValidation.data)
  } catch (error) {
    return HttpResponse.internalServerError('Unknown error in CategoryController.createCategory:', error)
  }
}

const findCategories = async (): CategoryListResponse => {
  try {
    const categoriesResult = await CategoryService.findCategories()

    if (categoriesResult.status === 'ERROR') {
      return HttpResponse.internalServerError('Unknown error in CategoryController.findCategories:', categoriesResult.errors)
    }

    const categoriesDTOValidation = CategoryDTOSchema.array().safeParse(categoriesResult.data)

    if (categoriesDTOValidation.error) {
      return HttpResponse.internalServerError('Validation error in CategoryController.findCategories:', categoriesDTOValidation.error)
    }

    return HttpResponse.ok(categoriesResult.data)
  } catch (error) {
    return HttpResponse.internalServerError('Unknown error in CategoryController.findCategories:', error)
  }
}

const updateCategory = async (categoryId: unknown, categoryUpdateRequest: Request): CategoryUpdateResponse => {
  try {
    const categoryIdValidation = CategoryIdSchema.safeParse(categoryId)

    if (categoryIdValidation.error) {
      return HttpResponse.badRequest(categoryIdValidation.error)
    }

    const categoryUpdateData = await categoryUpdateRequest.json()
    const categoryUpdateValidation = CategoryUpdateSchema.safeParse(categoryUpdateData)

    if (categoryUpdateValidation.error) {
      return HttpResponse.badRequest(categoryUpdateValidation.error)
    }

    const updatedCategoryResult = await CategoryService.updateCategory(categoryIdValidation.data, categoryUpdateValidation.data)

    if (updatedCategoryResult.status === 'ERROR') {
      switch (updatedCategoryResult.errors) {
        case 'CATEGORY_NAME_ALREADY_EXISTS':
          return HttpResponse.conflict('CATEGORY_NAME_ALREADY_EXISTS')
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          return HttpResponse.internalServerError('Unknown error in CategoryController.updateCategory:', updatedCategoryResult.errors)
      }
    }

    const categoryDTOValidation = CategoryDTOSchema.safeParse(updatedCategoryResult.data)

    if (categoryDTOValidation.error) {
      return HttpResponse.internalServerError('Validation error in CategoryController.updateCategory:', categoryDTOValidation.error)
    }

    return HttpResponse.ok(categoryDTOValidation.data)
  } catch (error) {
    return HttpResponse.internalServerError('Unknown error in CategoryController.updateCategory:', error)
  }
}

export const CategoryController = {
  createCategory,
  findCategories,
  updateCategory
}
