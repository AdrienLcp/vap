import classNames from 'classnames'

import { PRODUCT_CONSTANTS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { Image, type ImageProps } from '@/presentation/components/ui/image'

import './product-image.sass'

export type ProductImageSize = 'small' | 'large'

type ProductImageProps = Partial<ImageProps> & {
  size?: ProductImageSize
}

const getImageSizeInPx = (size: ProductImageSize) => {
  switch (size) {
    case 'small':
      return PRODUCT_CONSTANTS.IMAGE_SMALL_SIZE_IN_PX
    case 'large':
      return PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX
    default:
      return PRODUCT_CONSTANTS.IMAGE_SIZE_IN_PX
  }
}

export const ProductImage: React.FC<ProductImageProps> = ({
  className,
  size = 'large',
  src,
  ...productImageRestProps
}) => {
  const imageSizeInPx = getImageSizeInPx(size)

  return (
    <Image
      alt={t('product.imageAlt')}
      className={classNames('product-image', className)}
      height={imageSizeInPx}
      src={src}
      width={imageSizeInPx}
      {...productImageRestProps}
    />
  )
}
