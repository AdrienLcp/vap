import type { ProductPublicDTO } from '@/features/product/domain/product-entities'
import { ProductImage } from '@/features/product/presentation/components/product-image'
import { PublicProductCardActions } from '@/features/product/presentation/components/public-product-card-actions'
import { t } from '@/infrastructure/i18n'
import { Card, CardBody, CardFooter, CardTitle } from '@/presentation/components/ui/card'
import { formatPrice } from '@/utils/format-utils'

import './public-product-card.sass'

type PublicProductCardProps = {
  product: ProductPublicDTO
}

export const PublicProductCard: React.FC<PublicProductCardProps> = ({ product }) => (
  <Card
    className='public-product-card'
    title={t('product.card.showProductSheet')}
  >
    <CardBody>
      <ProductImage className='product-image' src={product.imageUrl} />
    </CardBody>

    <CardFooter className='footer'>
      <CardTitle title={product.name}>{product.name}</CardTitle>

      <div className='details'>
        <span>{formatPrice(product.price)}</span>

        <PublicProductCardActions />
      </div>
    </CardFooter>
  </Card>
)
