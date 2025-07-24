'use client'

import React from 'react'

import type { AuthUserDTO } from '@/auth/domain/auth-entities'

export type Auth =
  | { status: 'authenticated', user: AuthUserDTO }
  | { status: 'loading' }
  | { status: 'unauthenticated' }

type AuthContextValue = {
  auth: Auth
  setAuth: React.Dispatch<React.SetStateAction<Auth>>
}

export const AuthContext = React.createContext<AuthContextValue | null>(null)
