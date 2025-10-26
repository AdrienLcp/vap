import type { ProductDTO, ProductPublicDTO } from '@/features/product/domain/product-entities'

export const toProductPublicDTO = (product: ProductDTO): ProductPublicDTO => ({
  category: product.category
    ? {
        id: product.category.id,
        imageUrl: product.category.imageUrl,
        name: product.category.name
      }
    : null,
  description: product.description,
  discountedPrice: product.discountedPrice,
  id: product.id,
  imageUrl: product.imageUrl,
  name: product.name,
  price: product.price,
  status: product.status,
  stock: product.stock
})
