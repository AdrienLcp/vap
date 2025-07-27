'use client'

import { AuthContext } from '@/auth/context/auth-context'
import { useRequiredContext } from '@/presentation/hooks/use-required-context'

export const useAuth = () => useRequiredContext(AuthContext, 'Auth')
