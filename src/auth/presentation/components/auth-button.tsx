'use client'

import { LogInIcon } from 'lucide-react'
import React from 'react'

import { useAuth } from '@/auth/application/use-auth'
import { PersonaMenu } from '@/auth/presentation/components/persona-menu'
import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Loader } from '@/presentation/components/ui/loaders/loader'
import { Link } from '@/presentation/components/ui/pressables/link'

export const AuthButton: React.FC = () => {
  const { auth } = useAuth()

  if (auth.status === 'loading') {
    return <Loader />
  }

  if (auth.status === 'unauthenticated') {
    return (
      <Link Icon={<LogInIcon />} href={ROUTES.signIn} variant='filled'>
        {t('auth.signIn.label')}
      </Link>
    )
  }

  const user = auth.user

  return (
    <PersonaMenu
      userEmail={user.email}
      userImageUrl={user.image}
      userName={user.name}
    />
  )
}
