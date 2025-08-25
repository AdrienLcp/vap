import React from 'react'

import { t } from '@/infrastructure/i18n'
import { Image } from '@/presentation/components/ui/image'
import { PRODUCT_CONSTANTS } from '@/product/domain/product-constants'
import { ProductImageUrlField } from '@/product/presentation/components/product-image-url-field'

import './product-image-url-field.sass'

type ProductImagePreviewFieldProps = {
  imageUrl?: string
}

export const ProductImagePreviewField: React.FC<ProductImagePreviewFieldProps> = ({ imageUrl }) => {
  const [currentProductImageUrl, setCurrentProductImageUrl] = React.useState(imageUrl)

  return (
    <div className='product-image-preview-field'>
      <ProductImageUrlField onChange={setCurrentProductImageUrl} value={currentProductImageUrl} />

      <Image
        alt={t('product.imageAlt')}
        className='image'
        height={PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}
        src={imageUrl}
        width={PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}
      />
    </div>
  )
}
