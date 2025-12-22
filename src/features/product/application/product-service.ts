import 'server-only'

import type { Forbidden, NotFound, Unauthorized } from '@/domain/entities'
import { AuthService } from '@/features/auth/application/auth-service'
import type {
  ProductCreationData,
  ProductDTO,
  ProductEditError,
  ProductError,
  ProductFilters,
  ProductPublicDTO,
  ProductUpdateData
} from '@/features/product/domain/product-entities'
import { toProductPublicDTO } from '@/features/product/domain/product-mappers'
import { ProductRepository } from '@/features/product/infrastructure/product-repository'
import { failure, type Result, success } from '@/helpers/result'

const createProduct = async (
  productCreationData: ProductCreationData
): Promise<Result<ProductDTO, ProductEditError>> => {
  const userResult = await AuthService.findUserDTO()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  if (!userResult.data.permissions.canCreateProduct) {
    return failure('FORBIDDEN')
  }

  const productCreationResult = await ProductRepository.createProduct(productCreationData)

  if (productCreationResult.status === 'ERROR') {
    return productCreationResult
  }

  return success(productCreationResult.data)
}

const deleteProduct = async (productId: string): Promise<Result<null, ProductError>> => {
  const userResult = await AuthService.findUserDTO()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  if (!userResult.data.permissions.canDeleteProduct) {
    return failure('FORBIDDEN')
  }

  const deleteResult = await ProductRepository.deleteProduct(productId)

  if (deleteResult.status === 'ERROR') {
    return deleteResult
  }

  return success()
}

const findProduct = async (
  productId: string
): Promise<Result<ProductDTO, ProductError | NotFound>> => {
  const userResult = await AuthService.findUserDTO()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  if (!userResult.data.permissions.canReadProduct) {
    return failure('FORBIDDEN')
  }

  return await ProductRepository.findProduct(productId)
}

const findProducts = async (): Promise<Result<ProductDTO[], ProductError>> => {
  const userResult = await AuthService.findUserDTO()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  if (!userResult.data.permissions.canReadProduct) {
    return failure('FORBIDDEN')
  }

  return await ProductRepository.findProducts()
}

const findPublicProduct = async (
  productId: string
): Promise<Result<ProductPublicDTO, NotFound>> => {
  const productResult = await ProductRepository.findProduct(productId)

  if (productResult.status === 'ERROR') {
    return productResult
  }

  const product = productResult.data

  if (product.status === 'INACTIVE') {
    return failure('NOT_FOUND')
  }

  const productPublicDTO: ProductPublicDTO = toProductPublicDTO(product)

  return success(productPublicDTO)
}

const findPublicProducts = async (
  filters?: ProductFilters
): Promise<Result<ProductPublicDTO[]>> => {
  const productsResult = await ProductRepository.findProducts(filters)

  if (productsResult.status === 'ERROR') {
    return productsResult
  }

  const filteredProducts = productsResult.data.filter((product) => product.status !== 'INACTIVE')

  const publicProducts: ProductPublicDTO[] = filteredProducts.map(toProductPublicDTO)

  return success(publicProducts)
}

const getCategoryProductCount = async (categoryId: string): Promise<Result<number>> => {
  return await ProductRepository.getCategoryProductCount(categoryId)
}

const removeProductsCategory = async (
  categoryId: string
): Promise<Result<null, Forbidden | Unauthorized>> => {
  const userResult = await AuthService.findUserDTO()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  if (!userResult.data.permissions.canUpdateProduct) {
    return failure('FORBIDDEN')
  }

  return await ProductRepository.removeProductsCategory(categoryId)
}

const updateProduct = async (
  productId: string,
  productUpdateData: ProductUpdateData
): Promise<Result<ProductDTO, ProductEditError>> => {
  const userResult = await AuthService.findUserDTO()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  if (!userResult.data.permissions.canUpdateProduct) {
    return failure('FORBIDDEN')
  }

  const productUpdateResult = await ProductRepository.updateProduct(productId, productUpdateData)

  if (productUpdateResult.status === 'ERROR') {
    return productUpdateResult
  }

  return success(productUpdateResult.data)
}

export const ProductService = {
  createProduct,
  deleteProduct,
  findProduct,
  findProducts,
  findPublicProduct,
  findPublicProducts,
  getCategoryProductCount,
  removeProductsCategory,
  updateProduct
}
