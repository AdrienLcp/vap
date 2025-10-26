'use client'

import { useCallback, useEffect, useState } from 'react'

import { useSession } from '@/features/auth/application/use-session'
import type { AuthUserDTO } from '@/features/auth/domain/auth-entities'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { type Auth, AuthContext } from '@/features/auth/presentation/context/auth-context'
import { OK_STATUS } from '@/infrastructure/api/http-response'

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>({ status: 'loading' })

  const session = useSession()

  const setUser = useCallback((user: AuthUserDTO) => {
    setAuth({ status: 'authenticated', user })
  }, [])

  const loadUser = useCallback(async () => {
    const userResponse = await AuthClient.findUser()

    if (userResponse.status === OK_STATUS) {
      setUser(userResponse.data)
      return
    }

    setAuth({ status: 'unauthenticated' })
  }, [setUser])

  useEffect(() => {
    if (session.isPending) {
      setAuth({ status: 'loading' })
      return
    }

    if (!session.data) {
      setAuth({ status: 'unauthenticated' })
      return
    }

    loadUser()
  }, [loadUser, session])

  return <AuthContext value={{ auth, setUser }}>{children}</AuthContext>
}
