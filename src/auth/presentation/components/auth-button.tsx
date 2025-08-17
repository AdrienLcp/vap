'use client'

import { redirect } from 'next/navigation'

import { useAuth } from '@/auth/application/use-auth'
import { AuthClient } from '@/auth/infrastructure/auth-client'
import { DEFAULT_ROUTE, ROUTES } from '@/domain/navigation'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Spinner } from '@/presentation/components/ui/loaders/spinner'
import { Button } from '@/presentation/components/ui/pressables/button'
import { Link } from '@/presentation/components/ui/pressables/link'
import { ToastService } from '@/presentation/services/toast-service'

const signOut = async () => {
  const signOutResponse = await AuthClient.signOut()

  switch (signOutResponse.status) {
    case NO_CONTENT_STATUS:
      redirect(DEFAULT_ROUTE)
    default:
      ToastService.error(t('auth.signOut.errors.unknown'))
  }
}

export const AuthButton: React.FC = () => {
  const { auth } = useAuth()

  if (auth.status === 'loading') {
    return <Spinner />
  }

  if (auth.status === 'unauthenticated') {
    return (
      <Link href={ROUTES.signIn} variant='filled'>
        {t('auth.signIn.label')}
      </Link>
    )
  }

  return (
    <Button onPress={signOut} variant='outlined'>
      {t('auth.signOut.label')}
    </Button>
  )
}
