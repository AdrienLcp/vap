'use client'

import { betterAuthClient } from '@/features/auth/infrastructure/auth-client'

export const useSession = betterAuthClient.useSession
