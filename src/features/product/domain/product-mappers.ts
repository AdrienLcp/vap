import type { ProductDTO, ProductPublicDTO } from '@/features/product/domain/product-entities'

export const toProductPublicDTO = (product: ProductDTO): ProductPublicDTO => ({
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
    ? {
        id: product.category.id,
        imageUrl: product.category.imageUrl,
        name: product.category.name
      }
    : null
})
