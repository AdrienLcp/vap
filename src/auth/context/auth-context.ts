'use client'

import { createContext } from 'react'

import type { AuthUserDTO } from '@/auth/domain/auth-entities'

type AuthenticatedUser = {
  status: 'authenticated'
  user: AuthUserDTO
}

export type Auth =
  | AuthenticatedUser
  | { status: 'loading' }
  | { status: 'unauthenticated' }

type AuthContextValue = {
  auth: Auth
  setAuth: React.Dispatch<React.SetStateAction<Auth>>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
