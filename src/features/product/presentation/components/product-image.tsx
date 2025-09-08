import classNames from 'classnames'

import { PRODUCT_CONSTANTS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { Image, type ImageProps } from '@/presentation/components/ui/image'

import './product-image.sass'

export const ProductImage: React.FC<Partial<ImageProps>> = ({ className, src, ...productImageRestProps }) => (
  <Image
    alt={t('product.imageAlt')}
    className={classNames('product-image', className)}
    height={PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}
    src={src}
    width={PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX}
    {...productImageRestProps}
  />
)
