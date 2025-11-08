import 'server-only'

import { ProductService } from '@/features/product/application/product-service'
import {
  PRODUCT_API_BASE_URL,
  PRODUCT_SEARCH_PARAMS
} from '@/features/product/domain/product-constants'
import type {
  ProductCreationResponse,
  ProductDeletionResponse,
  ProductFilters,
  ProductListResponse,
  ProductPublicListResponse,
  ProductPublicResponse,
  ProductResponse,
  ProductUpdateResponse
} from '@/features/product/domain/product-entities'
import {
  ProductCreationSchema,
  ProductDTOSchema,
  ProductFiltersSchema,
  ProductIdSchema,
  ProductPublicDTOSchema,
  ProductUpdateSchema
} from '@/features/product/domain/product-schemas'
import { HttpResponse } from '@/infrastructure/api/http-response'
import { buildLocationUrl } from '@/infrastructure/env/client'

const extractSearchParams = (request?: Request): ProductFilters | null => {
  if (!request?.url) {
    return null
  }

  const { searchParams } = new URL(request.url)

  const maxPriceParam = parseInt(searchParams.get(PRODUCT_SEARCH_PARAMS.MAX_PRICE) ?? '', 10)
  const minPriceParam = parseInt(searchParams.get(PRODUCT_SEARCH_PARAMS.MIN_PRICE) ?? '', 10)
  const categoryIdsRaw = searchParams.get(PRODUCT_SEARCH_PARAMS.CATEGORY_IDS)

  return {
    categoryIds: categoryIdsRaw
      ? categoryIdsRaw.split(PRODUCT_SEARCH_PARAMS.CATEGORY_IDS_SEPARATOR).filter(Boolean)
      : undefined,
    maxPrice: Number.isNaN(maxPriceParam) ? undefined : maxPriceParam,
    minPrice: Number.isNaN(minPriceParam) ? undefined : minPriceParam,
    search: searchParams.get(PRODUCT_SEARCH_PARAMS.SEARCH) ?? undefined
  }
}

const createProduct = async (productCreationRequest: Request): Promise<ProductCreationResponse> => {
  try {
    const productCreationData = await productCreationRequest.json()
    const productCreationValidation = ProductCreationSchema.safeParse(productCreationData)

    if (!productCreationValidation.success) {
      return HttpResponse.badRequest(productCreationValidation.error.issues)
    }

    const createdProductResult = await ProductService.createProduct(productCreationValidation.data)

    if (createdProductResult.status === 'ERROR') {
      switch (createdProductResult.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        case 'PRODUCT_SKU_ALREADY_EXISTS':
          return HttpResponse.conflict('PRODUCT_SKU_ALREADY_EXISTS')
        default:
          console.error(
            'Unknown error in ProductController.createProduct:',
            createdProductResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const productDTOValidation = ProductDTOSchema.safeParse(createdProductResult.data)

    if (!productDTOValidation.success) {
      console.error(
        'Validation error in ProductController.createProduct:',
        productDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    const productDTO = productDTOValidation.data
    const createdProductLocationUrl = buildLocationUrl(PRODUCT_API_BASE_URL, productDTO.id)

    return HttpResponse.created(productDTO, { Location: createdProductLocationUrl })
  } catch (error) {
    console.error('Unknown error in ProductController.createProduct:', error)
    return HttpResponse.internalServerError()
  }
}

const deleteProduct = async (productId: string): Promise<ProductDeletionResponse> => {
  try {
    const productIdValidation = ProductIdSchema.safeParse(productId)

    if (!productIdValidation.success) {
      return HttpResponse.badRequest(productIdValidation.error.issues)
    }

    const deleteResult = await ProductService.deleteProduct(productIdValidation.data)

    if (deleteResult.status === 'ERROR') {
      switch (deleteResult.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in ProductController.deleteProduct:', deleteResult.error)
          return HttpResponse.internalServerError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Unknown error in ProductController.deleteProduct:', error)
    return HttpResponse.internalServerError()
  }
}

const findProduct = async (productId: string): Promise<ProductResponse> => {
  try {
    const productIdValidation = ProductIdSchema.safeParse(productId)

    if (!productIdValidation.success) {
      return HttpResponse.badRequest(productIdValidation.error.issues)
    }

    const productResult = await ProductService.findProduct(productIdValidation.data)

    if (productResult.status === 'ERROR') {
      switch (productResult.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        default:
          console.error('Unknown error in ProductController.findProduct:', productResult.error)
          return HttpResponse.internalServerError()
      }
    }

    const productDTOValidation = ProductDTOSchema.safeParse(productResult.data)

    if (!productDTOValidation.success) {
      console.error(
        'Validation error in ProductController.findProduct:',
        productDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(productDTOValidation.data)
  } catch (error) {
    console.error('Unknown error in ProductController.findProduct:', error)
    return HttpResponse.internalServerError()
  }
}

const findProducts = async (): Promise<ProductListResponse> => {
  try {
    const productsResult = await ProductService.findProducts()

    if (productsResult.status === 'ERROR') {
      switch (productsResult.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in ProductController.findPublicProducts:',
            productsResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const productsDTOValidation = ProductDTOSchema.array().safeParse(productsResult.data)

    if (!productsDTOValidation.success) {
      console.error(
        'Validation error in ProductController.findProducts:',
        productsDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(productsDTOValidation.data)
  } catch (error) {
    console.error('Unknown error in ProductController.findProducts:', error)
    return HttpResponse.internalServerError()
  }
}

const findPublicProduct = async (productId: string): Promise<ProductPublicResponse> => {
  try {
    const productIdValidation = ProductIdSchema.safeParse(productId)

    if (!productIdValidation.success) {
      return HttpResponse.badRequest(productIdValidation.error.issues)
    }

    const productResult = await ProductService.findPublicProduct(productIdValidation.data)

    if (productResult.status === 'ERROR') {
      switch (productResult.error) {
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        default:
          console.error(
            'Unknown error in ProductController.findPublicProduct:',
            productResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const productPublicDTOValidation = ProductPublicDTOSchema.safeParse(productResult.data)

    if (!productPublicDTOValidation.success) {
      console.error(
        'Validation error in ProductController.findPublicProduct:',
        productPublicDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(productPublicDTOValidation.data)
  } catch (error) {
    console.error('Unknown error in ProductController.findPublicProduct:', error)
    return HttpResponse.internalServerError()
  }
}

const findPublicProducts = async (request?: Request): Promise<ProductPublicListResponse> => {
  try {
    const productFilters = extractSearchParams(request)

    const productFiltersValidation = ProductFiltersSchema.safeParse(productFilters)

    const productsResult = await ProductService.findPublicProducts(productFiltersValidation.data)

    if (productsResult.status === 'ERROR') {
      console.error('Unknown error in ProductController.findPublicProducts:', productsResult.error)
      return HttpResponse.internalServerError()
    }

    const productsDTOValidation = ProductPublicDTOSchema.array().safeParse(productsResult.data)

    if (!productsDTOValidation.success) {
      console.error(
        'Validation error in ProductController.findPublicProducts:',
        productsDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(productsDTOValidation.data)
  } catch (error) {
    console.error('Unknown error in ProductController.findPublicProducts:', error)
    return HttpResponse.internalServerError()
  }
}

const updateProduct = async (
  productId: string,
  productUpdateRequest: Request
): Promise<ProductUpdateResponse> => {
  try {
    const productIdValidation = ProductIdSchema.safeParse(productId)

    if (!productIdValidation.success) {
      return HttpResponse.badRequest(productIdValidation.error.issues)
    }

    const productUpdateData = await productUpdateRequest.json()

    const productUpdateValidation = ProductUpdateSchema.safeParse(productUpdateData)

    if (!productUpdateValidation.success) {
      return HttpResponse.badRequest(productUpdateValidation.error.issues)
    }

    const productUpdateResult = await ProductService.updateProduct(
      productIdValidation.data,
      productUpdateValidation.data
    )

    if (productUpdateResult.status === 'ERROR') {
      switch (productUpdateResult.error) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        case 'PRODUCT_SKU_ALREADY_EXISTS':
          return HttpResponse.conflict('PRODUCT_SKU_ALREADY_EXISTS')
        default:
          console.error(
            'Unknown error in ProductController.updateProduct:',
            productUpdateResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const productDTOValidation = ProductDTOSchema.safeParse(productUpdateResult.data)

    if (!productDTOValidation.success) {
      console.error(
        'Validation error in ProductController.updateProduct:',
        productDTOValidation.error
      )
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(productDTOValidation.data)
  } catch (error) {
    console.error('Unknown error in ProductController.updateProduct:', error)
    return HttpResponse.internalServerError()
  }
}

export const ProductController = {
  createProduct,
  deleteProduct,
  findProduct,
  findProducts,
  findPublicProduct,
  findPublicProducts,
  updateProduct
}
