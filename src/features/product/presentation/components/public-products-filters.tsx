import { useCallback, useState } from 'react'

import type { ProductFilters } from '@/features/product/domain/product-entities'
import { ProductPriceFilter } from '@/features/product/presentation/components/product-price-filter'
import { PublicProductsSearch } from '@/features/product/presentation/components/public-products-search'

import './public-products-filters.sass'

type PublicProductsFiltersProps = {
  isLoadingProducts: boolean
  loadProducts: (filters?: ProductFilters) => void
}

export const PublicProductsFilters: React.FC<PublicProductsFiltersProps> = ({
  isLoadingProducts,
  loadProducts
}) => {
  const [productsFilters, setProductsFilters] = useState<ProductFilters | null>(null)

  const onSearchChange = useCallback(
    (search: string) => {
      if (search === productsFilters?.search) return

      const newFilters = { ...productsFilters, search }
      setProductsFilters(newFilters)
      loadProducts(newFilters)
    },
    [loadProducts, productsFilters]
  )

  const onMaxPriceFilterChange = useCallback(
    (maxPrice: number) => {
      if (maxPrice === productsFilters?.maxPrice) return

      const newFilters = { ...productsFilters, maxPrice }
      setProductsFilters(newFilters)
      loadProducts(newFilters)
    },
    [loadProducts, productsFilters]
  )

  const onMinPriceFilterChange = useCallback(
    (minPrice: number) => {
      if (minPrice === productsFilters?.minPrice) return

      const newFilters = { ...productsFilters, minPrice }
      setProductsFilters(newFilters)
      loadProducts(newFilters)
    },
    [loadProducts, productsFilters]
  )

  return (
    <div className='public-products-filters'>
      <PublicProductsSearch isLoadingProducts={isLoadingProducts} onSearchChange={onSearchChange} />

      <ProductPriceFilter
        isLoadingProducts={isLoadingProducts}
        onMaxPriceFilterChange={onMaxPriceFilterChange}
        onMinPriceFilterChange={onMinPriceFilterChange}
      />
    </div>
  )
}
