'use client'

import { parseAsInteger, useQueryState } from 'nuqs'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  PRODUCT_CONSTANTS,
  PRODUCT_SEARCH_PARAMS
} from '@/features/product/domain/product-constants'
import type { ProductFilters, ProductPublicDTO } from '@/features/product/domain/product-entities'
import { ProductClient } from '@/features/product/infrastructure/product-client'
import { PublicProductList } from '@/features/product/presentation/components/public-product-list'
import { PublicProductsFilters } from '@/features/product/presentation/components/public-products-filters'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Loader } from '@/presentation/components/ui/loaders/loader'
import { ToastService } from '@/presentation/services/toast-service'

import './public-products-dashboard.sass'

export const PublicProductsDashboard: React.FC = () => {
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductPublicDTO[]>([])

  const [maxPriceFilter, setMaxPriceFilter] = useQueryState(
    PRODUCT_SEARCH_PARAMS.MAX_PRICE,
    parseAsInteger.withDefault(Math.ceil(PRODUCT_CONSTANTS.MAX_PRICE))
  )

  const [minPriceFilter, setMinPriceFilter] = useQueryState(
    PRODUCT_SEARCH_PARAMS.MIN_PRICE,
    parseAsInteger.withDefault(Math.floor(PRODUCT_CONSTANTS.MIN_PRICE))
  )

  const [productSearch, setProductSearch] = useQueryState(PRODUCT_SEARCH_PARAMS.SEARCH, {
    defaultValue: ''
  })

  const loadProducts = useCallback(async (filters?: ProductFilters) => {
    setIsLoadingProducts(true)
    const productsResponse = await ProductClient.findPublicProducts(filters)
    setIsLoadingProducts(false)

    switch (productsResponse.status) {
      case OK_STATUS:
        setProducts(productsResponse.data)
        break
      default:
        ToastService.error(t('product.list.loadError'))
    }
  }, [])

  useEffect(() => {
    loadProducts({ maxPrice: maxPriceFilter, minPrice: minPriceFilter, search: productSearch })
  }, [loadProducts, maxPriceFilter, minPriceFilter, productSearch])

  const filters: ProductFilters = useMemo(
    () => ({
      maxPrice: maxPriceFilter,
      minPrice: minPriceFilter,
      search: productSearch
    }),
    [maxPriceFilter, minPriceFilter, productSearch]
  )

  const onFilterChange = useCallback(
    (newFilters: ProductFilters) => {
      if (newFilters.maxPrice != null) {
        setMaxPriceFilter(newFilters.maxPrice)
      }

      if (newFilters.minPrice != null) {
        setMinPriceFilter(newFilters.minPrice)
      }

      if (newFilters.search != null) {
        setProductSearch(newFilters.search)
      }
    },
    [setMaxPriceFilter, setMinPriceFilter, setProductSearch]
  )

  return (
    <>
      <PublicProductsFilters
        filters={filters}
        isLoadingProducts={isLoadingProducts}
        onFilterChange={onFilterChange}
      />

      {isLoadingProducts ? <Loader /> : <PublicProductList products={products} />}
    </>
  )
}
