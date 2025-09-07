'use client'

// import { PRODUCT_CONSTANTS } from '@/features/product/domain/product-constants'
import type { ProductDTO } from '@/features/product/domain/product-entities'
// import { ProductCard } from '@/features/product/presentation/components/product-card'
import { Table, type TableColumn } from '@/presentation/components/ui/table'
// import type { CSSVariables } from '@/presentation/utils/styles-utils'

import './product-list.sass'

type ProductListProps = {
  products: ProductDTO[]
}

// const productListStyle: CSSVariables = {
//   '--product-list-card-min-size': `${PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}px`
// }

// export const ProductList: React.FC<ProductListProps> = ({ products }) => (
//   <ul className='product-list' style={productListStyle}>
//     {products.map(product => (
//       <li key={product.id}>
//         <ProductCard product={product} />
//       </li>
//     ))}
//   </ul>
// )

type ProductColumnKey = 'name' | 'price' | 'category' | 'actions'
type ProductColumn = TableColumn<ProductColumnKey>

const productTableColumn: ProductColumn[] = [
  { id: 'name', children: 'Name', className: 'column-name', isRowHeader: true },
  { id: 'price', children: 'Price', className: 'column-price' },
  { id: 'category', children: 'Category', className: 'column-category' },
  { id: 'actions', children: 'Actions', className: 'column-actions' }
]

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const renderProductCell = (product: ProductDTO, productColumn: ProductColumn) => {
    switch (productColumn.id) {
      case 'name':
        return product.name
      case 'price':
        return `$${product.price.toFixed(2)}`
      case 'category':
        return product.category?.name
      case 'actions':
        return 'actions'
    }
  }

  return (
    <Table
      aria-label='test'
      columns={productTableColumn}
      renderCell={renderProductCell}
      rows={products}
    />
  )
}
