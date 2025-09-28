'use client'

import { useCallback, useState } from 'react'

import { getAdminProductRoute } from '@/domain/navigation'
import { PRODUCT_CONSTANTS } from '@/features/product/domain/product-constants'
import type { ProductDTO } from '@/features/product/domain/product-entities'
import { ProductCard } from '@/features/product/presentation/components/product-card'
import { t } from '@/infrastructure/i18n'
import { Grid, type GridItem } from '@/presentation/components/ui/grid'

type ProductListProps = {
  products: ProductDTO[]
}

const renderProductListEmptyState = () => <p>{t('product.list.empty')}</p>

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [productList, setProductList] = useState<ProductDTO[]>(products)

  const productGridItems: GridItem<ProductDTO>[] = productList.map(product => ({
    ...product,
    href: getAdminProductRoute(product.id),
    textValue: product.name
  }))

  const renderProductItem = useCallback((productItem: GridItem<ProductDTO>) => (
    <ProductCard product={productItem} setProductList={setProductList} />
  ), [])

  return (
    <Grid
      aria-label={t('product.list.ariaLabel')}
      itemSize={PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}
      items={productGridItems}
      renderEmptyState={renderProductListEmptyState}
      renderItem={renderProductItem}
    />
  )
}
