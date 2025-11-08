import 'server-only'

import type { NotFound } from '@/domain/entities'
import type {
  Product,
  ProductCategoryDTO,
  ProductConflictError,
  ProductCreationData,
  ProductDTO,
  ProductFilters,
  ProductUpdateData
} from '@/features/product/domain/product-entities'
import { type ErrorResult, failure, type Result, success } from '@/helpers/result'
import { type EntitySelectedFields, ProductDatabase } from '@/infrastructure/database'
import { getDatabaseError } from '@/infrastructure/database/database-helpers'

const PRODUCT_SELECTED_FIELDS = {
  description: true,
  discountedPrice: true,
  id: true,
  imageUrl: true,
  name: true,
  price: true,
  salesCount: true,
  sku: true,
  status: true,
  stock: true
} satisfies EntitySelectedFields<Product>

const PRODUCT_CATEGORY_SELECTED_FIELDS = {
  id: true,
  imageUrl: true,
  name: true
} satisfies EntitySelectedFields<ProductCategoryDTO>

const productSelectedFields = {
  ...PRODUCT_SELECTED_FIELDS,
  category: {
    select: {
      ...PRODUCT_CATEGORY_SELECTED_FIELDS
    }
  }
}

const onProductDuplicateError = (duplicatedKeys: string[]): ErrorResult<ProductConflictError> => {
  if (duplicatedKeys.includes('sku')) {
    return failure('PRODUCT_SKU_ALREADY_EXISTS')
  }

  console.error('Duplicate key error in CategoryRepository:', duplicatedKeys)
  return failure()
}

const createProduct = async (
  productCreationData: ProductCreationData
): Promise<Result<ProductDTO, ProductConflictError>> => {
  try {
    const createdProduct = await ProductDatabase.create({
      data: {
        categoryId: productCreationData.categoryId,
        description: productCreationData.description,
        discountedPrice: productCreationData.discountedPrice,
        imageUrl: productCreationData.imageUrl,
        name: productCreationData.name,
        price: productCreationData.price,
        sku: productCreationData.sku,
        status: productCreationData.status,
        stock: productCreationData.stock
      },
      select: productSelectedFields
    })

    return success(createdProduct)
  } catch (error) {
    const databaseError = getDatabaseError(error)

    switch (databaseError.code) {
      case 'DUPLICATE':
        return onProductDuplicateError(databaseError.duplicatedKeys)
      default:
        console.error('Unknown error in ProductRepository.createProduct:', error)
        return failure()
    }
  }
}

const deleteProduct = async (productId: string): Promise<Result> => {
  try {
    await ProductDatabase.delete({ where: { id: productId } })
    return success()
  } catch (error) {
    console.error('Unknown error in ProductRepository.deleteProduct:', error)
    return failure()
  }
}

const findProduct = async (productId: string): Promise<Result<ProductDTO, NotFound>> => {
  try {
    const product = await ProductDatabase.findUnique({
      select: productSelectedFields,
      where: { id: productId }
    })

    if (!product) {
      return failure('NOT_FOUND')
    }

    return success(product)
  } catch (error) {
    console.error('Unknown error in ProductRepository.findProduct:', error)
    return failure()
  }
}

const findProducts = async (filters?: ProductFilters): Promise<Result<ProductDTO[]>> => {
  try {
    const products = await ProductDatabase.findMany({
      select: productSelectedFields,
      where: {
        categoryId: filters?.categoryIds ? { in: filters.categoryIds } : undefined,
        name: filters?.search ? { contains: filters.search, mode: 'insensitive' } : undefined,
        price: {
          gte: filters?.minPrice,
          lte: filters?.maxPrice
        },
        status: filters?.status
      }
    })

    return success(products)
  } catch (error) {
    console.error('Unknown error in ProductRepository.findProducts:', error)
    return failure()
  }
}

const getCategoryProductCount = async (categoryId: string): Promise<Result<number>> => {
  try {
    const categoryProductCount = await ProductDatabase.count({ where: { categoryId } })
    return success(categoryProductCount)
  } catch (error) {
    console.error('Unknown error in ProductRepository.getCategoryProductCount:', error)
    return failure()
  }
}

const removeProductsCategory = async (categoryId: string): Promise<Result> => {
  try {
    await ProductDatabase.updateMany({
      data: { categoryId: null },
      where: { categoryId }
    })

    return success()
  } catch (error) {
    console.error('Unknown error in ProductRepository.removeProductsCategory:', error)
    return failure()
  }
}

const updateProduct = async (
  productId: string,
  productData: ProductUpdateData
): Promise<Result<ProductDTO, ProductConflictError>> => {
  try {
    const updatedProduct = await ProductDatabase.update({
      data: {
        categoryId: productData.categoryId,
        description: productData.description,
        discountedPrice: productData.discountedPrice,
        imageUrl: productData.imageUrl,
        name: productData.name,
        price: productData.price,
        salesCount: productData.salesCount,
        sku: productData.sku,
        status: productData.status,
        stock: productData.stock
      },
      select: productSelectedFields,
      where: { id: productId }
    })

    return success(updatedProduct)
  } catch (error) {
    const databaseError = getDatabaseError(error)

    switch (databaseError.code) {
      case 'DUPLICATE':
        return onProductDuplicateError(databaseError.duplicatedKeys)
      default:
        console.error('Unknown error in ProductRepository.updateProduct:', error)
        return failure()
    }
  }
}

export const ProductRepository = {
  createProduct,
  deleteProduct,
  findProduct,
  findProducts,
  getCategoryProductCount,
  removeProductsCategory,
  updateProduct
}
