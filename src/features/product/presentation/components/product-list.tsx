'use client'

import { getAdminProductRoute } from '@/domain/navigation'
import { PRODUCT_CONSTANTS } from '@/features/product/domain/product-constants'
import type { ProductDTO } from '@/features/product/domain/product-entities'
import { ProductCard } from '@/features/product/presentation/components/product-card'
import { t } from '@/infrastructure/i18n'
import { Grid, type GridItem } from '@/presentation/components/ui/grid'

import './product-list.sass'

type ProductListProps = {
  products: ProductDTO[]
}

const renderProductItem = (productItem: GridItem<ProductDTO>) => (
  <ProductCard product={productItem} />
)

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const productGridItems: GridItem<ProductDTO>[] = products.map(product => ({
    ...product,
    href: getAdminProductRoute(product.id),
    textValue: product.name
  }))

  return (
    <Grid
      aria-label={t('product.list.ariaLabel')}
      cardSize={PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}
      items={productGridItems}
      renderEmptyState={() => <p>{t('product.list.empty')}</p>}
      renderItem={renderProductItem}
    />
  )
}
