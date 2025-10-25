'use client'

import { useRouter } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next'
import { RouterProvider } from 'react-aria-components'

import { AuthProvider } from '@/features/auth/presentation/context/auth-provider'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  return (
    <NuqsAdapter>
      <RouterProvider navigate={router.push}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </RouterProvider>
    </NuqsAdapter>
  )
}
