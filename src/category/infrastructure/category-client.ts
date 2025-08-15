'use client'

import type { CategoryCreationData, CategoryCreationResponse, CategoryDeletionResponse, CategoryListResponse, CategoryUpdateData, CategoryUpdateResponse } from '@/category/domain/category-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'

const CATEGORY_API_BASE_URL = '/categories'

const createCategory = async (categoryCreationData: CategoryCreationData): Promise<ClientResponse<CategoryCreationResponse>> => {
  try {
    return await ApiClient.POST<CategoryCreationResponse, CategoryCreationData>(CATEGORY_API_BASE_URL, categoryCreationData)
  } catch (error) {
    console.error('Create category error:', error)
    return unknownError()
  }
}

const deleteCategory = async (categoryId: string): Promise<ClientResponse<CategoryDeletionResponse>> => {
  try {
    const encodedCategoryId = encodeURIComponent(categoryId)
    return await ApiClient.DELETE<CategoryDeletionResponse>(`${CATEGORY_API_BASE_URL}/${encodedCategoryId}`)
  } catch (error) {
    console.error('Delete category error:', error)
    return unknownError()
  }
}

const findCategories = async (): Promise<ClientResponse<CategoryListResponse>> => {
  try {
    return await ApiClient.GET<CategoryListResponse>(CATEGORY_API_BASE_URL)
  } catch (error) {
    console.error('Find categories error:', error)
    return unknownError()
  }
}

const updateCategory = async (categoryId: string, categoryUpdateData: CategoryUpdateData): Promise<ClientResponse<CategoryUpdateResponse>> => {
  try {
    const encodedCategoryId = encodeURIComponent(categoryId)
    return await ApiClient.PATCH<CategoryUpdateResponse, CategoryUpdateData>(`${CATEGORY_API_BASE_URL}/${encodedCategoryId}`, categoryUpdateData)
  } catch (error) {
    console.error('Update category error:', error)
    return unknownError()
  }
}

export const CategoryClient = {
  createCategory,
  deleteCategory,
  findCategories,
  updateCategory
}
