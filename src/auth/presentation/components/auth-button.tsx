'use client'

import { LogInIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

import { useAuth } from '@/auth/application/use-auth'
import { PersonaMenu } from '@/auth/presentation/components/persona-menu'
import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Loader } from '@/presentation/components/ui/loaders/loader'
import { Link } from '@/presentation/components/ui/pressables/link'

import './auth-button.sass'

export const AuthButton: React.FC = () => {
  const { auth } = useAuth()
  const pathname = usePathname()

  if (auth.status === 'loading') {
    return <Loader />
  }

  if (auth.status === 'unauthenticated') {
    if (pathname === ROUTES.signIn) {
      return null
    }

    return (
      <Link
        className='auth-link'
        Icon={<LogInIcon aria-hidden />}
        href={ROUTES.signIn}
        variant='filled'
      >
        {t('auth.signIn.label')}
      </Link>
    )
  }

  return <PersonaMenu user={auth.user} />
}
