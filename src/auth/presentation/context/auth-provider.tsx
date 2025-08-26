'use client'

import { useCallback, useEffect, useState } from 'react'

import { useSession } from '@/auth/application/use-session'
import type { AuthUserDTO } from '@/auth/domain/auth-entities'
import { AuthClient } from '@/auth/infrastructure/auth-client'
import { type Auth, AuthContext } from '@/auth/presentation/context/auth-context'
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

  return (
    <AuthContext value={{ auth, setAuth, setUser }}>
      {children}
    </AuthContext>
  )
}
