import { ProductDatabase } from '@/infrastructure/database'

const createProduct = async () => {
  const createdProduct = await ProductDatabase.create({
    data: {
      name: '',
      price: 0,
      categoryId: ''
    }
  })
}

export const ProductRepository = {
  createProduct
}
