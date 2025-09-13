import classNames from 'classnames'

import { CATEGORY_CONSTANTS } from '@/features/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { Image, type ImageProps } from '@/presentation/components/ui/image'

import './category-image.sass'

export const CategoryImage: React.FC<Partial<ImageProps>> = ({ className, src, ...categoryImageRestProps }) => (
  <Image
    alt={t('category.imageAlt')}
    className={classNames('category-image', className)}
    height={CATEGORY_CONSTANTS.IMAGE_SIZE_IN_PX}
    src={src}
    width={CATEGORY_CONSTANTS.IMAGE_SIZE_IN_PX}
    {...categoryImageRestProps}
  />
)
