import NextImage, { type ImageProps } from 'next/image'

export const Image: React.FC<ImageProps> = (props) => (
  <NextImage {...props} />
)
