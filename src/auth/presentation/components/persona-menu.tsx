'use client'

import { useAuth } from '@/auth/application/use-auth'
import { Avatar } from '@/presentation/components/ui/avatar'
import { Loader } from '@/presentation/components/ui/loaders/loader'

export const PersonaMenu: React.FC = () => {
  const { auth } = useAuth()

  if (auth.status === 'loading') {
    return <Loader />
  }

  if (auth.status === 'unauthenticated') {
    return null
  }

  return <Avatar user={auth.user} />
}
