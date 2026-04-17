import 'server-only'

import { and, eq, gte, ilike, inArray, lte, or, type SQL } from 'drizzle-orm'

import type { NotFound } from '@/domain/entities'
import { categories } from '@/features/category/infrastructure/category-schema'
import type {
  ProductConflictError,
  ProductCreationData,
  ProductDTO,
  ProductFilters,
  ProductUpdateData
} from '@/features/product/domain/product-entities'
import { products } from '@/features/product/infrastructure/product-schema'
import {
  type ErrorResult,
  failure,
  type Result,
  success
} from '@/helpers/result'
import { db } from '@/infrastructure/database'
import { getDatabaseError } from '@/infrastructure/database/database-helpers'

const productSelectedFields = {
  category: {
    id: categories.id,
    imageUrl: categories.imageUrl,
    name: categories.name
  },
  description: products.description,
  discountedPrice: products.discountedPrice,
  id: products.id,
  imageUrl: products.imageUrl,
  name: products.name,
  price: products.price,
  salesCount: products.salesCount,
  sku: products.sku,
  status: products.status,
  stock: products.stock
} as const

const buildProductQuery = () =>
  db
    .select(productSelectedFields)
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))

type ProductJoinedRow = Awaited<ReturnType<typeof buildProductQuery>>[number]

const toProductDTO = (row: ProductJoinedRow): ProductDTO => ({
  category: row.category,
  description: row.description,
  discountedPrice: row.discountedPrice,
  id: row.id,
  imageUrl: row.imageUrl,
  name: row.name,
  price: row.price,
  salesCount: row.salesCount,
  sku: row.sku,
  status: row.status,
  stock: row.stock
})

const onProductDuplicateError = (
  duplicatedKeys: string[]
): ErrorResult<ProductConflictError> => {
  if (duplicatedKeys.includes('sku')) {
    return failure('PRODUCT_SKU_ALREADY_EXISTS')
  }

  console.error('Duplicate key error in ProductRepository:', duplicatedKeys)
  return failure()
}

const findProductById = async (
  productId: string
): Promise<ProductDTO | undefined> => {
  const [row] = await buildProductQuery()
    .where(eq(products.id, productId))
    .limit(1)

  return row ? toProductDTO(row) : undefined
}

const createProduct = async (
  productCreationData: ProductCreationData
): Promise<Result<ProductDTO, ProductConflictError>> => {
  try {
    const [inserted] = await db
      .insert(products)
      .values({
        categoryId: productCreationData.categoryId,
        description: productCreationData.description,
        discountedPrice: productCreationData.discountedPrice,
        imageUrl: productCreationData.imageUrl,
        name: productCreationData.name,
        price: productCreationData.price,
        sku: productCreationData.sku,
        status: productCreationData.status,
        stock: productCreationData.stock
      })
      .returning({ id: products.id })

    if (!inserted) {
      return failure()
    }

    const createdProduct = await findProductById(inserted.id)

    if (!createdProduct) {
      return failure()
    }

    return success(createdProduct)
  } catch (error) {
    const databaseError = getDatabaseError(error)

    switch (databaseError.code) {
      case 'DUPLICATE':
        return onProductDuplicateError(databaseError.duplicatedKeys)
      default:
        console.error(
          'Unknown error in ProductRepository.createProduct:',
          error
        )
        return failure()
    }
  }
}

const deleteProduct = async (productId: string): Promise<Result> => {
  try {
    await db.delete(products).where(eq(products.id, productId))
    return success()
  } catch (error) {
    console.error('Unknown error in ProductRepository.deleteProduct:', error)
    return failure()
  }
}

const findProduct = async (
  productId: string
): Promise<Result<ProductDTO, NotFound>> => {
  try {
    const product = await findProductById(productId)

    if (!product) {
      return failure('NOT_FOUND')
    }

    return success(product)
  } catch (error) {
    console.error('Unknown error in ProductRepository.findProduct:', error)
    return failure()
  }
}

const buildProductFilters = (filters?: ProductFilters): SQL | undefined => {
  if (!filters) return undefined

  const conditions: Array<SQL | undefined> = []

  if (filters.categoryIds && filters.categoryIds.length > 0) {
    conditions.push(inArray(products.categoryId, filters.categoryIds))
  }

  if (filters.search) {
    const pattern = `%${filters.search}%`
    conditions.push(
      or(
        ilike(categories.name, pattern),
        ilike(products.description, pattern),
        ilike(products.name, pattern),
        ilike(products.sku, pattern)
      )
    )
  }

  if (filters.minPrice !== undefined) {
    conditions.push(gte(products.price, filters.minPrice))
  }

  if (filters.maxPrice !== undefined) {
    conditions.push(lte(products.price, filters.maxPrice))
  }

  if (filters.status) {
    conditions.push(eq(products.status, filters.status))
  }

  return conditions.length > 0 ? and(...conditions) : undefined
}

const findProducts = async (
  filters?: ProductFilters
): Promise<Result<ProductDTO[]>> => {
  try {
    const whereClause = buildProductFilters(filters)

    const rows = whereClause
      ? await buildProductQuery().where(whereClause)
      : await buildProductQuery()

    return success(rows.map(toProductDTO))
  } catch (error) {
    console.error('Unknown error in ProductRepository.findProducts:', error)
    return failure()
  }
}

const getCategoryProductCount = async (
  categoryId: string
): Promise<Result<number>> => {
  try {
    const rows = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.categoryId, categoryId))

    return success(rows.length)
  } catch (error) {
    console.error(
      'Unknown error in ProductRepository.getCategoryProductCount:',
      error
    )
    return failure()
  }
}

const removeProductsCategory = async (categoryId: string): Promise<Result> => {
  try {
    await db
      .update(products)
      .set({ categoryId: null })
      .where(eq(products.categoryId, categoryId))

    return success()
  } catch (error) {
    console.error(
      'Unknown error in ProductRepository.removeProductsCategory:',
      error
    )
    return failure()
  }
}

const updateProduct = async (
  productId: string,
  productData: ProductUpdateData
): Promise<Result<ProductDTO, ProductConflictError>> => {
  try {
    const [updated] = await db
      .update(products)
      .set({
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
      })
      .where(eq(products.id, productId))
      .returning({ id: products.id })

    if (!updated) {
      return failure()
    }

    const updatedProduct = await findProductById(updated.id)

    if (!updatedProduct) {
      return failure()
    }

    return success(updatedProduct)
  } catch (error) {
    const databaseError = getDatabaseError(error)

    switch (databaseError.code) {
      case 'DUPLICATE':
        return onProductDuplicateError(databaseError.duplicatedKeys)
      default:
        console.error(
          'Unknown error in ProductRepository.updateProduct:',
          error
        )
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
