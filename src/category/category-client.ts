'use client'

import type { CategoryCreationData, CategoryCreationResponse, CategoryListResponse, CategoryUpdateData, CategoryUpdateResponse } from '@/category/domain/category-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'

const createCategory = async (categoryCreationData: CategoryCreationData): ClientResponse<CategoryCreationResponse> => {
  try {
    return await ApiClient.POST<CategoryCreationResponse, CategoryCreationData>('/categories', categoryCreationData)
  } catch (error) {
    console.error('Create category error:', error)
    return unknownError()
  }
}

const findCategories = async (): ClientResponse<CategoryListResponse> => {
  try {
    return await ApiClient.GET<CategoryListResponse>('/categories')
  } catch (error) {
    console.error('Find categories error:', error)
    return unknownError()
  }
}

const updateCategory = async (categoryId: string, categoryUpdateData: CategoryUpdateData): ClientResponse<CategoryUpdateResponse> => {
  try {
    return await ApiClient.PUT<CategoryUpdateResponse, CategoryUpdateData>(`/categories/${categoryId}`, categoryUpdateData)
  } catch (error) {
    console.error('Update category error:', error)
    return unknownError()
  }
}

export const CategoryClient = {
  createCategory,
  findCategories,
  updateCategory
}
