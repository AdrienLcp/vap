import { AuthService } from '@/auth/auth-service'
import { failure, type Result, success } from '@/helpers/result'
import type { ProductCreationData, ProductDTO, ProductError, ProductPublicDTO, ProductUpdateData } from '@/product/domain/product-entities'
import { ProductRepository } from '@/product/product-repository'

const createProduct = async (productCreationData: ProductCreationData): Promise<Result<ProductError, ProductDTO>>  => {
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

const findPublicProducts = async (): Promise<Result<null, ProductPublicDTO[]>> => {
  const productsResult = await ProductRepository.findProducts()

  if (productsResult.status === 'ERROR') {
    return productsResult
  }

  const filteredProducts = productsResult.data.filter(product => product.status !== 'INACTIVE')

  const publicProducts: ProductPublicDTO[] = filteredProducts.map(product => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    description: product.description,
    price: product.price,
    discountedPrice: product.discountedPrice,
    status: product.status,
    stock: product.stock,
    imageUrl: product.imageUrl,
    category: product.category
      ? { name: product.category.name, imageUrl: product.category.imageUrl }
      : null
  }))

  return success(publicProducts)
}

const updateProduct = async (productId: string, productUpdateData: ProductUpdateData): Promise<Result<ProductError, ProductDTO>> => {
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
  findProducts,
  findPublicProducts,
  updateProduct
}
