'use client'

import classNames from 'classnames'

import type { ProductDTO } from '@/features/product/domain/product-entities'
import { ProductImage } from '@/features/product/presentation/components/product-image'
import { ProductMenu } from '@/features/product/presentation/components/product-menu'
import { t } from '@/infrastructure/i18n'
import { Card, CardBody, CardFooter, CardTitle } from '@/presentation/components/ui/card'
import { formatPrice } from '@/utils/format-utils'

import './product-card.sass'

type ProductCardProps = {
  isDisabled?: boolean
  product: ProductDTO
  setProductList: React.Dispatch<React.SetStateAction<ProductDTO[]>>
}

export const ProductCard: React.FC<ProductCardProps> = ({ isDisabled, product, setProductList }) => (
  <Card
    className={classNames('product-card', isDisabled && 'is-disabled')}
    title={t('product.card.showProductSheet')}
  >
    <CardBody>
      <ProductImage className='product-image' src={product.imageUrl} />
    </CardBody>

    <CardFooter className='footer'>
      <div className='content'>
        <CardTitle title={product.name}>{product.name}</CardTitle>

        <span>{formatPrice(product.price)}</span>
      </div>

      <ProductMenu productId={product.id} setProductList={setProductList} />
    </CardFooter>
  </Card>
)
