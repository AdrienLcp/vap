import { useState } from 'react'

import { CATEGORY_CONSTANTS } from '@/features/category/domain/category-constants'
import { CategoryImageUrlField } from '@/features/category/presentation/components/forms/category-image-url-field'
import { t } from '@/infrastructure/i18n'
import { Image } from '@/presentation/components/ui/image'

import './category-image-preview-field.sass'

type CategoryImagePreviewFieldProps = {
  imageUrl?: string
}

export const CategoryImagePreviewField: React.FC<CategoryImagePreviewFieldProps> = ({ imageUrl }) => {
  const [currentCategoryImageUrl, setCurrentCategoryImageUrl] = useState(imageUrl)

  return (
    <div className='category-image-preview-field'>
      <CategoryImageUrlField onChange={setCurrentCategoryImageUrl} value={currentCategoryImageUrl} />

      <Image
        alt={t('category.imageAlt')}
        className='image'
        height={CATEGORY_CONSTANTS.IMAGE_SIZE_IN_PX}
        src={currentCategoryImageUrl}
        width={CATEGORY_CONSTANTS.IMAGE_SIZE_IN_PX}
      />
    </div>
  )
}
