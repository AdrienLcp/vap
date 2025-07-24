'use client'

import React from 'react'

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

export const AuthContext = React.createContext<AuthContextValue | null>(null)
