import { sha256 } from 'js-sha256'

import { t } from '@/infrastructure/i18n'
import { Image } from '@/presentation/components/ui/image'

import './avatar.sass'

type AvatarUser = {
  email: string
  image?: string | null
  name: string
}

type AvatarProps = {
  size?: 'medium' | 'small'
  user: AvatarUser
}

export const Avatar: React.FC<AvatarProps> = ({ size = 'medium', user }) => {
  const imageSize = size === 'medium' ? 48 : 32
  const hashedEmail = sha256(user.email.trim().toLowerCase())
  const userName = user.name

  return (
    <Image
      alt={userName ? t('components.avatar.alt', { userName }) : t('components.avatar.defaultAlt')}
      className='avatar'
      height={imageSize}
      src={user.image ?? `https://www.gravatar.com/avatar/${hashedEmail}?s=${imageSize}&d=mp`}
      width={imageSize}
    />
  )
}
