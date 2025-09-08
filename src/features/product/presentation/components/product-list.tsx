'use client'

import { getAdminProductRoute } from '@/domain/navigation'
import type { ProductDTO } from '@/features/product/domain/product-entities'
import { ProductCard } from '@/features/product/presentation/components/product-card'
import { Grid, type GridItem } from '@/presentation/components/ui/grid'

import './product-list.sass'

type ProductListProps = {
  products: ProductDTO[]
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const renderProductCard = (productItem: GridItem<ProductDTO>) => (
    <ProductCard product={productItem} />
  )

  const productGridItems: GridItem<ProductDTO>[] = products.map(product => ({
    ...product,
    href: getAdminProductRoute(product.id),
    textValue: product.name
  }))

  return (
    <Grid items={productGridItems} renderItem={renderProductCard} />
  )
}
