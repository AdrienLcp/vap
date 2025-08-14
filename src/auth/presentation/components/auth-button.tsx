'use client'

import { redirect } from 'next/navigation'

import { useAuth } from '@/auth/application/use-auth'
import { AuthClient } from '@/auth/infrastructure/auth-client'
import { DEFAULT_ROUTE, ROUTES } from '@/domain/navigation'
import  { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { Spinner } from '@/presentation/components/ui/loaders/spinner'
import { Button } from '@/presentation/components/ui/pressables/button'
import { Link } from '@/presentation/components/ui/pressables/link'

const signOut = async () => {
  const signOutResponse = await AuthClient.signOut()

  if (signOutResponse.status === NO_CONTENT_STATUS) {
    redirect(DEFAULT_ROUTE)
  }
}

export const AuthButton: React.FC = () => {
  const { auth } = useAuth()

  if (auth.status === 'loading') {
    return <Spinner />
  }

  if (auth.status === 'unauthenticated') {
    return <Link href={ROUTES.signIn}>Sign In</Link>
  }

  return (
    <Button onPress={signOut}>
      Sign Out
    </Button>
  )
}
