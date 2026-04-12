'use client'

import { LogInIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { useAuth } from '@/features/auth/application/use-auth'
import { PersonaMenu } from '@/features/auth/presentation/components/persona-menu'
import { t } from '@/infrastructure/i18n'
import { Spinner } from '@/presentation/components/ui/loaders/spinner'
import { Link } from '@/presentation/components/ui/pressables/link'

import './auth-button.sass'

export const AuthButton: React.FC = () => {
  const { userAuthState } = useAuth()
  const pathname = usePathname()

  if (pathname === ROUTES.signIn) {
    return null
  }

  if (userAuthState.status === 'loading') {
    return <Spinner />
  }

  if (userAuthState.status === 'authenticated') {
    return <PersonaMenu user={userAuthState.user} />
  }

  return (
    <Link
      className='auth-link'
      href={ROUTES.signIn}
      Icon={<LogInIcon aria-hidden />}
      variant='filled'
    >
      {t('auth.signIn.label')}
    </Link>
  )
}
