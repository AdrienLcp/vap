'use client'

import { createContext } from 'react'

import type { AuthUserDTO } from '@/features/auth/domain/auth-entities'

export type Auth =
  | { status: 'authenticated', user: AuthUserDTO }
  | { status: 'loading' }
  | { status: 'unauthenticated' }

type AuthContextValue = {
  auth: Auth
  setUser: (user: AuthUserDTO) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
