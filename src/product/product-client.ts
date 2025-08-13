'use client'

import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'
import type { ProductCreationData, ProductCreationResponse, ProductDeleteResponse, ProductListResponse, ProductPublicListResponse, ProductUpdateData, ProductUpdateResponse } from '@/product/domain/product-entities'

const createProduct = async (productData: ProductCreationData): ClientResponse<ProductCreationResponse> => {
  try {
    return await ApiClient.POST<ProductCreationResponse, ProductCreationData>('/products', productData)
  } catch (error) {
    console.error('Create product error:', error)
    return unknownError()
  }
}

const deleteProduct = async (productId: string): ClientResponse<ProductDeleteResponse> => {
  try {
    return await ApiClient.DELETE<ProductDeleteResponse>(`/products/${productId}`)
  } catch (error) {
    console.error('Delete product error:', error)
    return unknownError()
  }
}

const findProducts = async (): ClientResponse<ProductListResponse> => {
  try {
    return await ApiClient.GET<ProductListResponse>('/products')
  } catch (error) {
    console.error('Find products error:', error)
    return unknownError()
  }
}

const findPublicProducts = async (): ClientResponse<ProductPublicListResponse> => {
  try {
    return await ApiClient.GET<ProductPublicListResponse>('/products/public')
  } catch (error) {
    console.error('Find public products error:', error)
    return unknownError()
  }
}

const updateProduct = async (productId: string, productUpdateData: ProductUpdateData): ClientResponse<ProductUpdateResponse> => {
  try {
    return await ApiClient.PUT<ProductUpdateResponse, ProductUpdateData>(`/products/${productId}`, productUpdateData)
  } catch (error) {
    console.error('Update product error:', error)
    return unknownError()
  }
}

export const ProductClient = {
  createProduct,
  deleteProduct,
  findProducts,
  findPublicProducts,
  updateProduct
}
