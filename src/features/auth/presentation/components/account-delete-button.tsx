'use client'

import { UserRoundXIcon } from 'lucide-react'

import { t } from '@/infrastructure/i18n'
import { Button, type ButtonProps } from '@/presentation/components/ui/pressables/button'

import './account-delete-button.sass'

export const AccountDeleteButton: React.FC<ButtonProps> = (props) => (
  <Button
    className='account-delete-button'
    Icon={<UserRoundXIcon aria-hidden />}
    variant='destructive'
    {...props}
  >
    {t('auth.profile.deleteAccount')}
  </Button>
)
