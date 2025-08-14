import 'server-only'

import { HttpResponse } from '@/infrastructure/api/http-response'
import { ProductService } from '@/product/application/product-service'
import type { ProductCreationResponse, ProductDeleteResponse, ProductListResponse, ProductPublicListResponse, ProductUpdateResponse } from '@/product/domain/product-entities'
import { ProductCreationSchema, ProductDTOSchema, ProductIdSchema, ProductUpdateSchema } from '@/product/domain/product-schemas'

const createProduct = async (productCreationRequest: Request): Promise<ProductCreationResponse> => {
  try {
    const productCreationData = await productCreationRequest.json()

    const productCreationValidation = ProductCreationSchema.safeParse(productCreationData)

    if (productCreationValidation.error) {
      return HttpResponse.badRequest(productCreationValidation.error.issues)
    }

    const createdProductResult = await ProductService.createProduct(productCreationValidation.data)

    if (createdProductResult.status === 'ERROR') {
      switch (createdProductResult.errors) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in ProductController.createProduct:', createdProductResult.errors)
          return HttpResponse.internalServerError()
      }
    }

    const productDTOValidation = ProductDTOSchema.safeParse(createdProductResult.data)

    if (productDTOValidation.error) {
      console.error('Validation error in ProductController.createProduct:', productDTOValidation.error)
      return HttpResponse.internalServerError()
    }

    return HttpResponse.created(productDTOValidation.data)
  } catch (error) {
    console.error('Unknown error in ProductController.createProduct:', error)
    return HttpResponse.internalServerError()
  }
}

const deleteProduct = async (productId: string): Promise<ProductDeleteResponse> => {
  try {
    const productIdValidation = ProductIdSchema.safeParse(productId)

    if (productIdValidation.error) {
      return HttpResponse.badRequest(productIdValidation.error.issues)
    }

    const deleteResult = await ProductService.deleteProduct(productIdValidation.data)

    if (deleteResult.status === 'ERROR') {
      switch (deleteResult.errors) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in ProductController.deleteProduct:', deleteResult.errors)
          return HttpResponse.internalServerError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Unknown error in ProductController.deleteProduct:', error)
    return HttpResponse.internalServerError()
  }
}

const findProducts = async (): Promise<ProductListResponse> => {
  try {
    const productsResult = await ProductService.findProducts()

    if (productsResult.status === 'ERROR') {
      switch (productsResult.errors) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in ProductController.findPublicProducts:', productsResult.errors)
          return HttpResponse.internalServerError()
      }
    }

    const productsDTOValidation = ProductDTOSchema.array().safeParse(productsResult.data)

    if (productsDTOValidation.error) {
      console.error('Validation error in ProductController.findProducts:', productsDTOValidation.error)
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(productsDTOValidation.data)
  } catch (error) {
    console.error('Unknown error in ProductController.findProducts:', error)
    return HttpResponse.internalServerError()
  }
}

const findPublicProducts = async (): Promise<ProductPublicListResponse> => {
  try {
    const productsResult = await ProductService.findPublicProducts()

    if (productsResult.status === 'ERROR') {
      console.error('Unknown error in ProductController.findPublicProducts:', productsResult.errors)
      return HttpResponse.internalServerError()
    }

    const productsDTOValidation = ProductDTOSchema.array().safeParse(productsResult.data)

    if (productsDTOValidation.error) {
      console.error('Validation error in ProductController.findPublicProducts:', productsDTOValidation.error)
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(productsDTOValidation.data)
  } catch (error) {
    console.error('Unknown error in ProductController.findPublicProducts:', error)
    return HttpResponse.internalServerError()
  }
}

const updateProduct = async (productId: string, productUpdateRequest: Request): Promise<ProductUpdateResponse> => {
  try {
    const productIdValidation = ProductIdSchema.safeParse(productId)

    if (productIdValidation.error) {
      return HttpResponse.badRequest(productIdValidation.error.issues)
    }

    const productUpdateData = await productUpdateRequest.json()

    const productUpdateValidation = ProductUpdateSchema.safeParse(productUpdateData)

    if (productUpdateValidation.error) {
      return HttpResponse.badRequest(productUpdateValidation.error.issues)
    }

    const updatedProductResult = await ProductService.updateProduct(productIdValidation.data, productUpdateValidation.data)

    if (updatedProductResult.status === 'ERROR') {
      switch (updatedProductResult.errors) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in ProductController.updateProduct:', updatedProductResult.errors)
          return HttpResponse.internalServerError()
      }
    }

    const productDTOValidation = ProductDTOSchema.safeParse(updatedProductResult.data)

    if (productDTOValidation.error) {
      console.error('Validation error in ProductController.updateProduct:', productDTOValidation.error)
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
  findProducts,
  findPublicProducts,
  updateProduct
}
