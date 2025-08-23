import { LogOutIcon, ShieldIcon, UserIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

import type { AuthUserDTO } from '@/auth/domain/auth-entities'
import { AuthClient } from '@/auth/infrastructure/auth-client'
import { DEFAULT_ROUTE, ROUTES } from '@/domain/navigation'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Avatar } from '@/presentation/components/ui/avatar'
import { Menu, type MenuItem } from '@/presentation/components/ui/menu'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

import './persona-menu.sass'

type PersonaMenuProps = {
  user: AuthUserDTO
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

const MENU_ITEM_ADMIN_ID = 'admin'

const menuItems: MenuItem[] = [
  {
    Icon: <UserIcon aria-hidden />,
    id: 'profile',
    href: ROUTES.profile,
    textValue: t('auth.persona.profile')
  },
  {
    Icon: <ShieldIcon aria-hidden />,
    id: MENU_ITEM_ADMIN_ID,
    href: ROUTES.admin,
    textValue: t('auth.persona.admin')
  },
  {
    Icon: <LogOutIcon aria-hidden />,
    id: 'sign-out',
    onAction: signOut,
    textValue: t('auth.persona.signOut')
  }
]

export const PersonaMenu: React.FC<PersonaMenuProps> = ({ user }) => {
  const MenuTrigger = React.useMemo(() => (
    <Button className='persona-menu-trigger'>
      <Avatar
        userEmail={user.email}
        userImageUrl={user.image}
        userName={user.name}
      />
    </Button>
  ), [user.email, user.image, user.name])

  const filteredMenuItems = React.useMemo(() => {
    return user.permissions.canAccessAdmin
      ? menuItems
      : menuItems.filter(item => item.id !== MENU_ITEM_ADMIN_ID)
  }, [user.permissions.canAccessAdmin])

  return (
    <Menu
      items={filteredMenuItems}
      Trigger={MenuTrigger}
    />
  )
}
