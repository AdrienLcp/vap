import classNames from 'classnames'
import { ImageOffIcon } from 'lucide-react'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import { useState } from 'react'

import type { CSSVariables } from '@/presentation/utils/styles-utils'

import './image.sass'

type ImageProps = Omit<NextImageProps, 'src'> & {
  Fallback?: React.ReactNode
  src?: NextImageProps['src']
}

type ImageDefaultFallbackProps = Pick<ImageProps, 'className' | 'height' | 'width'>

const ImageDefaultFallback: React.FC<ImageDefaultFallbackProps> = ({ className, height, width }) => {
  const imageDefaultFallbackStyle: CSSVariables = {
    '--image-default-fallback-height': `${height}px`,
    '--image-default-fallback-width': `${width}px`
  }

  return (
    <div
      className={classNames('image-default-fallback', className)}
      style={imageDefaultFallbackStyle}
    >
      <ImageOffIcon />
    </div>
  )
}

export const Image: React.FC<ImageProps> = ({
  className,
  Fallback,
  height,
  src,
  width,
  ...imageRestProps
}) => {
  const [hasImageError, setHasImageError] = useState<boolean>(false)

  if (hasImageError || !src) {
    return Fallback ?? <ImageDefaultFallback className={className} height={height} width={width} />
  }

  return (
    <NextImage
      {...imageRestProps}
      className={className}
      height={height}
      onError={() => setHasImageError(true)}
      src={src}
      width={width}
    />
  )
}
