import { useState } from 'react'

import { ProductImage } from '@/features/product/presentation/components/product-image'
import { ProductImageUrlField } from '@/features/product/presentation/components/product-image-url-field'

import './product-image-preview-field.sass'

type ProductImagePreviewFieldProps = {
  imageUrl?: string
}

export const ProductImagePreviewField: React.FC<ProductImagePreviewFieldProps> = ({ imageUrl }) => {
  const [currentProductImageUrl, setCurrentProductImageUrl] = useState(imageUrl)

  return (
    <div className='product-image-preview-field'>
      <ProductImageUrlField onChange={setCurrentProductImageUrl} value={currentProductImageUrl} />

      <ProductImage className='image' src={currentProductImageUrl} />
    </div>
  )
}
