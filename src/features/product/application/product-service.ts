import 'server-only'

import { AuthService } from '@/features/auth/application/auth-service'
import type { ProductCreationData, ProductDTO, ProductEditError, ProductError, ProductPublicDTO, ProductUpdateData } from '@/features/product/domain/product-entities'
import { toProductPublicDTO } from '@/features/product/domain/product-mappers'
import { ProductRepository } from '@/features/product/infrastructure/product-repository'
import { failure, type NotFound, type Result, success } from '@/helpers/result'

const createProduct = async (productCreationData: ProductCreationData): Promise<Result<ProductEditError, ProductDTO>>  => {
  const userResult = await AuthService.findUser()

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

const deleteProduct = async (productId: string): Promise<Result<ProductError>> => {
  const userResult = await AuthService.findUser()

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

const findProduct = async (productId: string): Promise<Result<ProductError | NotFound, ProductDTO>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  if (!userResult.data.permissions.canReadProduct) {
    return failure('FORBIDDEN')
  }

  return await ProductRepository.findProduct(productId)
}

const findProducts = async (): Promise<Result<ProductError, ProductDTO[]>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  if (!userResult.data.permissions.canReadProduct) {
    return failure('FORBIDDEN')
  }

  return await ProductRepository.findProducts()
}

const findPublicProduct = async (productId: string): Promise<Result<NotFound, ProductPublicDTO>> => {
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

const findPublicProducts = async (): Promise<Result<null, ProductPublicDTO[]>> => {
  const productsResult = await ProductRepository.findProducts()

  if (productsResult.status === 'ERROR') {
    return productsResult
  }

  const filteredProducts = productsResult.data.filter(product => product.status !== 'INACTIVE')

  const publicProducts: ProductPublicDTO[] = filteredProducts.map(toProductPublicDTO)

  return success(publicProducts)
}

const updateProduct = async (productId: string, productUpdateData: ProductUpdateData): Promise<Result<ProductEditError, ProductDTO>> => {
  const userResult = await AuthService.findUser()

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
  updateProduct
}
