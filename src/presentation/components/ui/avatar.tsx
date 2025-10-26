import { sha256 } from 'js-sha256'

import { t } from '@/infrastructure/i18n'
import { Image } from '@/presentation/components/ui/image'

import './avatar.sass'

type AvatarProps = {
  size?: 'medium' | 'small'
  userEmail: string
  userImageUrl?: string | null
  userName: string
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  userEmail,
  userImageUrl,
  userName
}) => {
  const imageSize = size === 'medium' ? 48 : 32
  const hashedEmail = sha256(userEmail.trim().toLowerCase())

  return (
    <Image
      alt={userName ? t('user.avatar.alt', { userName }) : t('user.avatar.defaultAlt')}
      className='avatar'
      height={imageSize}
      src={userImageUrl ?? `https://www.gravatar.com/avatar/${hashedEmail}?s=${imageSize}&d=mp`}
      width={imageSize}
    />
  )
}
