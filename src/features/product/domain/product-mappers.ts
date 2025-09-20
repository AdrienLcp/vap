import type { ProductDTO, ProductPublicDTO } from '@/features/product/domain/product-entities'

export const toProductPublicDTO = (product: ProductDTO): ProductPublicDTO => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  discountedPrice: product.discountedPrice,
  status: product.status,
  stock: product.stock,
  imageUrl: product.imageUrl,
  category: product.category
    ? {
        id: product.category.id,
        imageUrl: product.category.imageUrl,
        name: product.category.name
      }
    : null
})
