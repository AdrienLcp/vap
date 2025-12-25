'use client'

import { useCallback, useEffect, useState } from 'react'

import { useSession } from '@/features/auth/application/use-session'
import type { AuthUserDTO } from '@/features/auth/domain/auth-entities'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { AuthContext, type UserAuthState } from '@/features/auth/presentation/context/auth-context'
import { OK_STATUS } from '@/infrastructure/api/http-response'

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    status: 'loading'
  })

  const session = useSession()
  const hasSessionData = Boolean(session.data)

  const setUser = useCallback((user: AuthUserDTO) => {
    setUserAuthState({ status: 'authenticated', user })
  }, [])

  const loadUser = useCallback(async () => {
    const userResponse = await AuthClient.findUser()

    if (userResponse.status === OK_STATUS) {
      setUser(userResponse.data)
      return
    }

    setUserAuthState({ status: 'unauthenticated' })
  }, [setUser])

  useEffect(() => {
    if (session.isPending) {
      setUserAuthState({ status: 'loading' })
      return
    }

    if (!hasSessionData) {
      setUserAuthState({ status: 'unauthenticated' })
      return
    }

    loadUser()
  }, [hasSessionData, loadUser, session.isPending])

  return <AuthContext value={{ setUser, userAuthState }}>{children}</AuthContext>
}
