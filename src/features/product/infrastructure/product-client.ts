'use client'

import { PRODUCT_API_BASE_URL } from '@/features/product/domain/product-constants'
import type {
  ProductCreationData,
  ProductCreationResponse,
  ProductDeletionResponse,
  ProductListResponse,
  ProductPublicListResponse,
  ProductPublicResponse,
  ProductResponse,
  ProductUpdateData,
  ProductUpdateResponse
} from '@/features/product/domain/product-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'

const createProduct = async (
  productCreationData: ProductCreationData
): Promise<ClientResponse<ProductCreationResponse>> => {
  try {
    return await ApiClient.POST<ProductCreationResponse, ProductCreationData>(
      PRODUCT_API_BASE_URL,
      productCreationData
    )
  } catch (error) {
    console.error('Create product error:', error)
    return unknownError()
  }
}

const deleteProduct = async (
  productId: string
): Promise<ClientResponse<ProductDeletionResponse>> => {
  try {
    const productDeletionApiUrl = `/${PRODUCT_API_BASE_URL}/${encodeURIComponent(productId)}`
    return await ApiClient.DELETE<ProductDeletionResponse>(productDeletionApiUrl)
  } catch (error) {
    console.error('Delete product error:', error)
    return unknownError()
  }
}

const findProduct = async (productId: string): Promise<ClientResponse<ProductResponse>> => {
  try {
    const encodedProductId = encodeURIComponent(productId)
    return await ApiClient.GET<ProductResponse>(`/${PRODUCT_API_BASE_URL}/${encodedProductId}`)
  } catch (error) {
    console.error('Find product error:', error)
    return unknownError()
  }
}

const findProducts = async (): Promise<ClientResponse<ProductListResponse>> => {
  try {
    return await ApiClient.GET<ProductListResponse>(`/${PRODUCT_API_BASE_URL}`)
  } catch (error) {
    console.error('Find products error:', error)
    return unknownError()
  }
}

const findPublicProduct = async (
  productId: string
): Promise<ClientResponse<ProductPublicResponse>> => {
  try {
    const encodedProductId = encodeURIComponent(productId)
    const publicProductApiUrl = `/${PRODUCT_API_BASE_URL}/public/${encodedProductId}`
    return await ApiClient.GET<ProductPublicResponse>(publicProductApiUrl)
  } catch (error) {
    console.error('Find public product error:', error)
    return unknownError()
  }
}

const findPublicProducts = async (): Promise<ClientResponse<ProductPublicListResponse>> => {
  try {
    return await ApiClient.GET<ProductPublicListResponse>(`/${PRODUCT_API_BASE_URL}/public`)
  } catch (error) {
    console.error('Find public products error:', error)
    return unknownError()
  }
}

const updateProduct = async (
  productId: string,
  productUpdateData: ProductUpdateData
): Promise<ClientResponse<ProductUpdateResponse>> => {
  try {
    const encodedProductId = encodeURIComponent(productId)
    return await ApiClient.PATCH<ProductUpdateResponse, ProductUpdateData>(
      `/${PRODUCT_API_BASE_URL}/${encodedProductId}`,
      productUpdateData
    )
  } catch (error) {
    console.error('Update product error:', error)
    return unknownError()
  }
}

export const ProductClient = {
  createProduct,
  deleteProduct,
  findProduct,
  findProducts,
  findPublicProduct,
  findPublicProducts,
  updateProduct
}
