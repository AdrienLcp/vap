import { PRODUCT_CONSTANTS } from '@/features/product/domain/product-constants'
import type { ProductDTO } from '@/features/product/domain/product-entities'
import { ProductCard } from '@/features/product/presentation/components/product-card'
import type { CSSVariables } from '@/presentation/utils/styles-utils'

import './products-list.sass'

type ProductsListProps = {
  products: ProductDTO[]
}

const productListStyle: CSSVariables = {
  '--product-list-card-min-size': `${PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}px`
}

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => (
  <ul className='products-list' style={productListStyle}>
    {products.map((product) => (
      <li key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
)
