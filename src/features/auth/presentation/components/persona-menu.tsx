'use client'

import { LogOutIcon, ShieldIcon, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import { DEFAULT_ROUTE, ROUTES } from '@/domain/navigation'
import type { AuthUserDTO } from '@/features/auth/domain/auth-entities'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
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

const MENU_ITEM_ADMIN_ID = 'admin'

const PersonaMenuTrigger: React.FC<PersonaMenuProps> = ({ user }) => (
  <Button className='persona-menu-trigger'>
    <Avatar
      userEmail={user.email}
      userImageUrl={user.image}
      userName={user.name}
    />
  </Button>
)

export const PersonaMenu: React.FC<PersonaMenuProps> = ({ user }) => {
  const router = useRouter()

  const signOut = useCallback(async () => {
    const signOutResponse = await AuthClient.signOut()

    switch (signOutResponse.status) {
      case NO_CONTENT_STATUS:
        router.push(DEFAULT_ROUTE)
        break
      default:
        ToastService.error(t('auth.signOut.errors.unknown'))
    }
  }, [router])

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        href: ROUTES.profile,
        Icon: <UserIcon aria-hidden />,
        id: 'profile',
        textValue: t('auth.persona.profile')
      },
      {
        href: ROUTES.admin,
        Icon: <ShieldIcon aria-hidden />,
        id: MENU_ITEM_ADMIN_ID,
        textValue: t('auth.persona.admin')
      },
      {
        Icon: <LogOutIcon aria-hidden />,
        id: 'sign-out',
        onAction: signOut,
        textValue: t('auth.persona.signOut')
      }
    ],
    [signOut]
  )

  const filteredMenuItems = useMemo(() => {
    return user.permissions.canAccessAdmin
      ? menuItems
      : menuItems.filter((item) => item.id !== MENU_ITEM_ADMIN_ID)
  }, [menuItems, user.permissions.canAccessAdmin])

  return (
    <Menu
      items={filteredMenuItems}
      Trigger={<PersonaMenuTrigger user={user} />}
    />
  )
}
