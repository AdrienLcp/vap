'use client'

import { useCallback, useEffect, useState } from 'react'

import { AuthClient } from '@/auth/auth-client'
import { type Auth, AuthContext } from '@/auth/context/auth-context'
import { useSession } from '@/auth/hooks/use-session'

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>({ status: 'loading' })

  const session = useSession()

  const loadUser = useCallback(async () => {
    const userResult = await AuthClient.findUser()

    if (userResult.status === 'ERROR') {
      setAuth({ status: 'unauthenticated' })
      return
    }

    setAuth({ status: 'authenticated', user: userResult.data })
  }, [])

  useEffect(() => {
    if (session.data) {
      loadUser()
    }
  }, [loadUser, session])

  return (
    <AuthContext value={{ auth, setAuth }}>
      {children}
    </AuthContext>
  )
}
