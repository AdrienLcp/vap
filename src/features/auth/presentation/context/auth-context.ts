'use client'

import { createContext } from 'react'

import type { AuthUserDTO } from '@/features/auth/domain/auth-entities'

export type UserAuthState =
  | { status: 'authenticated'; user: AuthUserDTO }
  | { status: 'loading' }
  | { status: 'unauthenticated' }

type AuthContextValue = {
  setUser: (user: AuthUserDTO) => void
  userAuthState: UserAuthState
}

export const AuthContext = createContext<AuthContextValue | null>(null)
