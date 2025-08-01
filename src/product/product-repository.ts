import 'server-only'

import { type Result, success, unknownError } from '@/helpers/result'
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
    return unknownError('Unknown error in ProductRepository.createProduct:', error)
  }
}

const findProducts = async (): Promise<Result<null, ProductDTO[]>> => {
  try {
    const products = await ProductDatabase.findMany({ select: productSelect })

    return success(products)
  } catch (error) {
    return unknownError('Unknown error in ProductRepository.findProducts:', error)
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
    return unknownError('Unknown error in ProductRepository.updateProduct:', error)
  }
}

export const ProductRepository = {
  createProduct,
  findProducts,
  updateProduct
}
