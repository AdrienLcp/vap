import { LogOutIcon, UserIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

import { AuthClient } from '@/auth/infrastructure/auth-client'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Avatar } from '@/presentation/components/ui/avatar'
import { Menu, type MenuItem } from '@/presentation/components/ui/menu'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

import './persona-menu.sass'

type PersonaMenuProps = {
  userEmail: string
  userImageUrl?: string | null
  userName: string
}

const signOut = async () => {
  const signOutResponse = await AuthClient.signOut()

  switch (signOutResponse.status) {
    case NO_CONTENT_STATUS:
      redirect(DEFAULT_ROUTE)
    default:
      ToastService.error(t('auth.signOut.errors.unknown'))
  }
}

const menuItems: MenuItem[] = [
  {
    Icon: <UserIcon />,
    id: 'profile',
    href: '/auth/sign-in',
    textValue: t('auth.persona.profile')
  },
  {
    Icon: <LogOutIcon />,
    id: 'sign-out',
    onAction: signOut,
    textValue: t('auth.persona.signOut')
  }
]

export const PersonaMenu: React.FC<PersonaMenuProps> = ({ userEmail, userImageUrl, userName }) => {
  const MenuTrigger = React.useMemo(() => (
    <Button className='persona-menu-trigger'>
      <Avatar
        userEmail={userEmail}
        userImageUrl={userImageUrl}
        userName={userName}
      />
    </Button>
  ), [userEmail, userImageUrl, userName])

  return (
    <Menu
      items={menuItems}
      Trigger={MenuTrigger}
    />
  )
}
