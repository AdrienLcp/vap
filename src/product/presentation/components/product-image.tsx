import { t } from '@/infrastructure/i18n'
import { Image, type ImageProps } from '@/presentation/components/ui/image'
import { PRODUCT_CONSTANTS } from '@/product/domain/product-constants'

export const ProductImage: React.FC<Partial<ImageProps>> = ({ src, ...productImageRestProps }) => (
  <Image
    alt={t('product.imageAlt')}
    height={PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}
    src={src}
    width={PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}
    {...productImageRestProps}
  />
)
