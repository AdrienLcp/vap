import type { ProductDTO, ProductPublicDTO } from '@/product/domain/product-entities'

export const toProductPublicDTO = (product: ProductDTO): ProductPublicDTO => {
  return {
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
  }
}
