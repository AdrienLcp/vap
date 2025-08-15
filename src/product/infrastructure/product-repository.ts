import 'server-only'

import { failure, type NotFound, type Result, success } from '@/helpers/result'
import { ProductDatabase } from '@/infrastructure/database'
import type { ProductCreationData, ProductDTO, ProductUpdateData } from '@/product/domain/product-entities'

const productSelect = {
  id: true,
  name: true,
  price: true,
  description: true,
  imageUrl: true,
  status: true,
  sku: true,
  discountedPrice: true,
  stock: true,
  salesCount: true,
  category: {
    select: {
      name: true,
      imageUrl: true
    }
  }
}

const createProduct = async (productCreationData: ProductCreationData): Promise<Result<null, ProductDTO>> => {
  try {
    const createdProduct = await ProductDatabase.create({
      data: {
        name: productCreationData.name,
        price: productCreationData.price,
        sku: productCreationData.sku,
        description: productCreationData.description,
        imageUrl: productCreationData.imageUrl,
        status: productCreationData.status,
        discountedPrice: productCreationData.discountedPrice,
        stock: productCreationData.stock,
        categoryId: productCreationData.categoryId
      },
      select: productSelect
    })

    return success(createdProduct)
  } catch (error) {
    console.error('Unknown error in ProductRepository.createProduct:', error)
    return failure()
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

const findProduct = async (productId: string): Promise<Result<NotFound, ProductDTO>> => {
  try {
    const product = await ProductDatabase.findUnique({
      where: { id: productId },
      select: productSelect
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

const findProducts = async (): Promise<Result<null, ProductDTO[]>> => {
  try {
    const products = await ProductDatabase.findMany({ select: productSelect })

    return success(products)
  } catch (error) {
    console.error('Unknown error in ProductRepository.findProducts:', error)
    return failure()
  }
}

const updateProduct = async (productId: string, productData: ProductUpdateData): Promise<Result<null, ProductDTO>> => {
  try {
    const updatedProduct = await ProductDatabase.update({
      where: { id: productId },
      data: {
        name: productData.name,
        price: productData.price,
        sku: productData.sku,
        description: productData.description,
        imageUrl: productData.imageUrl,
        status: productData.status,
        discountedPrice: productData.discountedPrice,
        stock: productData.stock,
        categoryId: productData.categoryId,
        salesCount: productData.salesCount
      },
      select: productSelect
    })

    return success(updatedProduct)
  } catch (error) {
    console.error('Unknown error in ProductRepository.updateProduct:', error)
    return failure()
  }
}

export const ProductRepository = {
  createProduct,
  deleteProduct,
  findProduct,
  findProducts,
  updateProduct
}
