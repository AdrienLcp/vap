'use client'

import {
  PRODUCT_API_BASE_URL,
  PRODUCT_SEARCH_PARAMS
} from '@/features/product/domain/product-constants'
import type {
  ProductCreationData,
  ProductCreationResponse,
  ProductDeletionResponse,
  ProductFilters,
  ProductListResponse,
  ProductPublicListResponse,
  ProductPublicResponse,
  ProductResponse,
  ProductUpdateData,
  ProductUpdateResponse
} from '@/features/product/domain/product-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'

const buildProductFiltersQueryString = (productFilters?: ProductFilters): string => {
  if (!productFilters) {
    return ''
  }

  const productFiltersQueryParams = new URLSearchParams()

  if (productFilters.categoryIds) {
    productFiltersQueryParams.set(
      PRODUCT_SEARCH_PARAMS.CATEGORY_IDS,
      productFilters.categoryIds.join(',')
    )
  }

  if (productFilters.maxPrice != null) {
    productFiltersQueryParams.set(
      PRODUCT_SEARCH_PARAMS.MAX_PRICE,
      productFilters.maxPrice.toString()
    )
  }

  if (productFilters.minPrice != null) {
    productFiltersQueryParams.set(
      PRODUCT_SEARCH_PARAMS.MIN_PRICE,
      productFilters.minPrice.toString()
    )
  }

  if (productFilters.search) {
    productFiltersQueryParams.set(PRODUCT_SEARCH_PARAMS.SEARCH, productFilters.search)
  }
  0

  if (productFilters.status) {
    productFiltersQueryParams.set(PRODUCT_SEARCH_PARAMS.STATUS, productFilters.status)
  }

  return `?${productFiltersQueryParams.toString()}`
}

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

const findPublicProducts = async (
  productFilters?: ProductFilters
): Promise<ClientResponse<ProductPublicListResponse>> => {
  try {
    const productFilterQueryString = buildProductFiltersQueryString(productFilters)

    return await ApiClient.GET<ProductPublicListResponse>(
      `/${PRODUCT_API_BASE_URL}/public${productFilterQueryString}`
    )
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
