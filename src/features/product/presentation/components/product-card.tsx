'use client'

import { getAdminProductRoute } from '@/domain/navigation'
import type { ProductDTO } from '@/features/product/domain/product-entities'
import { ProductImage } from '@/features/product/presentation/components/product-image'
import { ProductMenu } from '@/features/product/presentation/components/product-menu'
import { t } from '@/infrastructure/i18n'
import { Card, CardBody, CardFooter, CardTitle } from '@/presentation/components/ui/card'
import { Link } from '@/presentation/components/ui/pressables/link'
import { formatPrice } from '@/utils/format-utils'

import './product-card.sass'

type ProductCardProps = {
  product: ProductDTO
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <Link href={getAdminProductRoute(product.id)}>
    <Card className='product-card' title={t('product.card.showProductSheet')}>
      <CardBody>
        <ProductImage className='product-image' src={product.imageUrl} />
      </CardBody>

      <CardFooter className='footer'>
        <div className='content'>
          <CardTitle title={product.name}>{product.name}</CardTitle>

          <span>{formatPrice(product.price)}</span>
        </div>

        <ProductMenu productId={product.id} />
      </CardFooter>
    </Card>
  </Link>
)
