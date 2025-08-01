import { HttpResponse } from '@/infrastructure/api/http-response'
import type { ProductCreationResponse, ProductListResponse, ProductPublicListResponse, ProductUpdateResponse } from '@/product/domain/product-entities'
import { ProductCreationSchema, ProductDTOSchema, ProductIdSchema, ProductUpdateSchema } from '@/product/domain/product-schemas'
import { ProductService } from '@/product/product-service'

const createProduct = async (productCreationRequest: Request): ProductCreationResponse => {
  try {
    const productCreationData = await productCreationRequest.json()

    const productCreationValidation = ProductCreationSchema.safeParse(productCreationData)

    if (productCreationValidation.error) {
      return HttpResponse.badRequest(productCreationValidation.error)
    }

    const createdProductResult = await ProductService.createProduct(productCreationValidation.data)

    if (createdProductResult.status === 'ERROR') {
      switch (createdProductResult.errors) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          return HttpResponse.internalServerError('Unknown error in ProductController.createProduct:', createdProductResult.errors)
      }
    }

    const productDTOValidation = ProductDTOSchema.safeParse(createdProductResult.data)

    if (productDTOValidation.error) {
      return HttpResponse.internalServerError('Validation error in ProductController.createProduct:', productDTOValidation.error)
    }

    return HttpResponse.created(productDTOValidation.data)
  } catch (error) {
    return HttpResponse.internalServerError('Unknown error in ProductController.createProduct:', error)
  }
}

const findProducts = async (): ProductListResponse => {
  try {
    const productsResult = await ProductService.findProducts()

    if (productsResult.status === 'ERROR') {
      switch (productsResult.errors) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          return HttpResponse.internalServerError('Unknown error in ProductController.findPublicProducts:', productsResult.errors)
      }
    }

    const productsDTOValidation = ProductDTOSchema.array().safeParse(productsResult.data)

    if (productsDTOValidation.error) {
      return HttpResponse.internalServerError('Validation error in ProductController.findProducts:', productsDTOValidation.error)
    }

    return HttpResponse.ok(productsDTOValidation.data)
  } catch (error) {
    return HttpResponse.internalServerError('Unknown error in ProductController.findProducts:', error)
  }
}

const findPublicProducts = async (): ProductPublicListResponse => {
  try {
    const productsResult = await ProductService.findPublicProducts()

    if (productsResult.status === 'ERROR') {
      return HttpResponse.internalServerError('Unknown error in ProductController.findPublicProducts:', productsResult.errors)
    }

    const productsDTOValidation = ProductDTOSchema.array().safeParse(productsResult.data)

    if (productsDTOValidation.error) {
      return HttpResponse.internalServerError('Validation error in ProductController.findPublicProducts:', productsDTOValidation.error)
    }

    return HttpResponse.ok(productsDTOValidation.data)
  } catch (error) {
    return HttpResponse.internalServerError('Unknown error in ProductController.findPublicProducts:', error)
  }
}

const updateProduct = async (productId: string, productUpdateRequest: Request): ProductUpdateResponse => {
  try {
    const productIdValidation = ProductIdSchema.safeParse(productId)

    if (productIdValidation.error) {
      return HttpResponse.badRequest(productIdValidation.error)
    }

    const productUpdateData = await productUpdateRequest.json()

    const productUpdateValidation = ProductUpdateSchema.safeParse(productUpdateData)

    if (productUpdateValidation.error) {
      return HttpResponse.badRequest(productUpdateValidation.error)
    }

    const updatedProductResult = await ProductService.updateProduct(productIdValidation.data, productUpdateValidation.data)

    if (updatedProductResult.status === 'ERROR') {
      switch (updatedProductResult.errors) {
        case 'FORBIDDEN':
          return HttpResponse.forbidden()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          return HttpResponse.internalServerError('Unknown error in ProductController.updateProduct:', updatedProductResult.errors)
      }
    }

    const productDTOValidation = ProductDTOSchema.safeParse(updatedProductResult.data)

    if (productDTOValidation.error) {
      return HttpResponse.internalServerError('Validation error in ProductController.updateProduct:', productDTOValidation.error)
    }

    return HttpResponse.ok(productDTOValidation.data)
  } catch (error) {
    return HttpResponse.internalServerError('Unknown error in ProductController.updateProduct:', error)
  }
}

export const ProductController = {
  createProduct,
  findProducts,
  findPublicProducts,
  updateProduct
}
