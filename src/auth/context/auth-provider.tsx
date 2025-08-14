'use client'

import React from 'react'

import { AuthClient } from '@/auth/auth-client'
import { type Auth, AuthContext } from '@/auth/context/auth-context'
import type { AuthUserDTO } from '@/auth/domain/auth-entities'
import { useSession } from '@/auth/hooks/use-session'
import { OK_STATUS } from '@/infrastructure/api/http-response'

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = React.useState<Auth>({ status: 'loading' })

  const session = useSession()

  const setUser = React.useCallback((user: AuthUserDTO) => {
    setAuth({ status: 'authenticated', user })
  }, [])

  const loadUser = React.useCallback(async () => {
    const userResponse = await AuthClient.findUser()

    if (userResponse.status === OK_STATUS) {
      setUser(userResponse.data)
      return
    }

    setAuth({ status: 'unauthenticated' })
  }, [setUser])

  React.useEffect(() => {
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
