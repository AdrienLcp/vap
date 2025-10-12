import type { ProductPublicDTO } from '@/features/product/domain/product-entities'
import { ProductImage } from '@/features/product/presentation/components/product-image'
import { PublicProductActions } from '@/features/product/presentation/components/public-product-actions'
import { formatPrice } from '@/utils/format-utils'

import './public-product.sass'

type PublicProductProps = {
  product: ProductPublicDTO
}

export const PublicProduct: React.FC<PublicProductProps> = ({ product }) => (
  <div className='public-product'>
    <ProductImage alt={product.name} src={product.imageUrl} />

    <div className='content'>
      <div className='info'>
        <h1 className='name'>{product.name}</h1>

        {product.description && <p>{product.description}</p>}
      </div>

      <div className='detail'>
        <p className='price'>{formatPrice(product.price)}</p>

        <PublicProductActions productId={product.id} />
      </div>
    </div>
  </div>
)
