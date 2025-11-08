'use client'

import { useCallback, useEffect, useState } from 'react'

import type { ProductFilters, ProductPublicDTO } from '@/features/product/domain/product-entities'
import { ProductClient } from '@/features/product/infrastructure/product-client'
import { PublicProductList } from '@/features/product/presentation/components/public-product-list'
import { PublicProductsFilters } from '@/features/product/presentation/components/public-products-filters'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { ToastService } from '@/presentation/services/toast-service'

import './public-products-dashboard.sass'

export const PublicProductsDashboard: React.FC = () => {
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductPublicDTO[]>([])

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
    loadProducts()
  }, [loadProducts])

  return (
    <>
      <PublicProductsFilters isLoadingProducts={isLoadingProducts} loadProducts={loadProducts} />

      <PublicProductList products={products} />
    </>
  )
}
