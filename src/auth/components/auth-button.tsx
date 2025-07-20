'use client'

import { redirect } from 'next/navigation'

import { AuthClient } from '@/auth/auth-client'
import { useAuth } from '@/auth/hooks/use-auth'
import { DEFAULT_ROUTE, ROUTES } from '@/domain/navigation'
import { Spinner } from '@/presentation/components/ui/loaders/spinner'
import { Button } from '@/presentation/components/ui/pressables/button'
import { Link } from '@/presentation/components/ui/pressables/link'

const signOut = async () => {
  const result = await AuthClient.signOut()

  if (result.status === 'SUCCESS') {
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
