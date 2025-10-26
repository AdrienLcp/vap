'use client'

import { getProductRoute } from '@/domain/navigation'
import { PRODUCT_CONSTANTS } from '@/features/product/domain/product-constants'
import type { ProductPublicDTO } from '@/features/product/domain/product-entities'
import { PublicProductCard } from '@/features/product/presentation/components/public-product-card'
import { t } from '@/infrastructure/i18n'
import { Grid, type GridItem } from '@/presentation/components/ui/grid'

type PublicProductListProps = {
  products: ProductPublicDTO[]
}

const renderProductListEmptyState = () => <p>{t('product.list.empty')}</p>

const renderProductItem = (productItem: GridItem<ProductPublicDTO>) => (
  <PublicProductCard product={productItem} />
)

export const PublicProductList: React.FC<PublicProductListProps> = ({ products }) => {
  const productItems: GridItem<ProductPublicDTO>[] = products.map((product) => ({
    ...product,
    href: getProductRoute(product.id),
    textValue: product.name
  }))

  return (
    <Grid
      aria-label={t('product.list.ariaLabel')}
      className='public-product-list'
      itemSize={PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}
      items={productItems}
      renderEmptyState={renderProductListEmptyState}
      renderItem={renderProductItem}
    />
  )
}
