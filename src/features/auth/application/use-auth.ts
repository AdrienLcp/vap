'use client'

import { AuthContext } from '@/features/auth/presentation/context/auth-context'
import { useRequiredContext } from '@/presentation/hooks/use-required-context'

export const useAuth = () => useRequiredContext(AuthContext, 'Auth')
