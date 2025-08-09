'use client'

import { failure, type Result, success, unknownError } from '@/helpers/result'
import { ApiClient } from '@/infrastructure/api/api-client'
import type { ProductCreationData, ProductCreationResponse, ProductDTO, ProductError, ProductListResponse, ProductPublicDTO, ProductPublicListResponse, ProductUpdateData, ProductUpdateResponse } from '@/product/domain/product-entities'

const createProduct = async (productData: ProductCreationData): Promise<Result<ProductError, ProductDTO>> => {
  try {
    const createdProductResult = await ApiClient.POST<ProductCreationResponse, ProductCreationData>('/products', productData)

    if (createdProductResult.status === 'ERROR') {
      switch (createdProductResult.errors) {
        case 'FORBIDDEN':
          return failure('FORBIDDEN')
        case 'UNAUTHORIZED':
          return failure('UNAUTHORIZED')
        default:
          return unknownError(createdProductResult.errors)
      }
    }

    return success(createdProductResult.data)
  } catch (error) {
    return unknownError(error)
  }
}

const deleteProduct = async (productId: string): Promise<Result<ProductError>> => {
  try {
    const deleteResult = await ApiClient.DELETE<ProductListResponse>(`/products/${productId}`)

    if (deleteResult.status === 'ERROR') {
      switch (deleteResult.errors) {
        case 'FORBIDDEN':
          return failure('FORBIDDEN')
        case 'UNAUTHORIZED':
          return failure('UNAUTHORIZED')
        default:
          return unknownError(deleteResult.errors)
      }
    }

    return success()
  } catch (error) {
    return unknownError(error)
  }
}

const findProducts = async (): Promise<Result<ProductError, ProductDTO[]>> => {
  try {
    const productsResult = await ApiClient.GET<ProductListResponse>('/products')

    if (productsResult.status === 'ERROR') {
      switch (productsResult.errors) {
        case 'FORBIDDEN':
          return failure('FORBIDDEN')
        case 'UNAUTHORIZED':
          return failure('UNAUTHORIZED')
        default:
          return unknownError(productsResult.errors)
      }
    }

    return success(productsResult.data)
  } catch (error) {
    return unknownError(error)
  }
}

const findPublicProducts = async (): Promise<Result<null, ProductPublicDTO[]>> => {
  try {
    const productsResult = await ApiClient.GET<ProductPublicListResponse>('/products/public')

    if (productsResult.status === 'ERROR') {
      return unknownError(productsResult.errors)
    }

    return success(productsResult.data)
  } catch (error) {
    return unknownError(error)
  }
}

const updateProduct = async (productId: string, productUpdateData: ProductUpdateData): Promise<Result<ProductError, ProductDTO>> => {
  try {
    const updatedProductResult = await ApiClient.PUT<ProductUpdateResponse, ProductUpdateData>(`/products/${productId}`, productUpdateData)

    if (updatedProductResult.status === 'ERROR') {
      switch (updatedProductResult.errors) {
        case 'FORBIDDEN':
          return failure('FORBIDDEN')
        case 'UNAUTHORIZED':
          return failure('UNAUTHORIZED')
        default:
          return unknownError(updatedProductResult.errors)
      }
    }

    return success(updatedProductResult.data)
  } catch (error) {
    return unknownError(error)
  }
}

export const ProductClient = {
  createProduct,
  deleteProduct,
  findProducts,
  findPublicProducts,
  updateProduct
}
