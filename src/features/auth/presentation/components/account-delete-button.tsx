'use client'

import { UserRoundXIcon } from 'lucide-react'

import { t } from '@/infrastructure/i18n'
import { Button, type ButtonProps } from '@/presentation/components/ui/pressables/button'

export const AccountDeleteButton: React.FC<ButtonProps> = (props) => (
  <Button
    Icon={<UserRoundXIcon aria-hidden />}
    variant='destructive'
    {...props}
  >
    {t('auth.profile.deleteAccount')}
  </Button>
)
