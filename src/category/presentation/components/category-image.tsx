import { CATEGORY_CONSTANTS } from '@/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { Image, type ImageProps } from '@/presentation/components/ui/image'

export const CategoryImage: React.FC<Partial<ImageProps>> = ({ src, ...categoryImageRestProps }) => (
  <Image
    alt={t('category.imageAlt')}
    height={CATEGORY_CONSTANTS.IMAGE_SIZE_IN_PX}
    src={src}
    width={CATEGORY_CONSTANTS.IMAGE_SIZE_IN_PX}
    {...categoryImageRestProps}
  />
)
