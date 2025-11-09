import { useCallback } from 'react'

import { PRODUCT_CONSTANTS } from '@/features/product/domain/product-constants'
import type { ProductPriceFilters } from '@/features/product/domain/product-entities'
import { t } from '@/infrastructure/i18n'
import { Slider } from '@/presentation/components/ui/slider'
import { priceFormatOptions } from '@/utils/format-utils'

import './product-price-filter.sass'

const filterMaxPrice = Math.ceil(PRODUCT_CONSTANTS.MAX_PRICE)
const filterMinPrice = Math.floor(PRODUCT_CONSTANTS.MIN_PRICE)

const priceFilterFormatOptions: Intl.NumberFormatOptions = {
  ...priceFormatOptions,
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
}

type ProductPriceFilterProps = {
  isLoadingProducts: boolean
  maxPriceFilter: number
  minPriceFilter: number
  onPriceFiltersChange: (prices: ProductPriceFilters) => void
}

export const ProductPriceFilter: React.FC<ProductPriceFilterProps> = ({
  isLoadingProducts,
  maxPriceFilter,
  minPriceFilter,
  onPriceFiltersChange
}) => {
  const onProductPriceFilterChange = useCallback(
    (values: number | number[]) => {
      if (!Array.isArray(values)) return

      const newMaxPrice = values[1] ?? filterMaxPrice
      const newMinPrice = values[0] ?? filterMinPrice

      onPriceFiltersChange({ maxPrice: newMaxPrice, minPrice: newMinPrice })
    },
    [onPriceFiltersChange]
  )

  return (
    <Slider
      className='product-price-filter'
      defaultValue={[minPriceFilter, maxPriceFilter]}
      formatOptions={priceFilterFormatOptions}
      isDisabled={isLoadingProducts}
      label={t('product.filters.price.label')}
      maxValue={filterMaxPrice}
      minValue={filterMinPrice}
      onChangeEnd={onProductPriceFilterChange}
      step={5}
      thumbLabels={[
        t('product.filters.price.minPriceAriaLabel'),
        t('product.filters.price.maxPriceAriaLabel')
      ]}
    />
  )
}
