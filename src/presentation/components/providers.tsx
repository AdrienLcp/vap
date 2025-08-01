'use client'

import { useRouter } from 'next/navigation'
import { RouterProvider } from 'react-aria-components'

import { AuthProvider } from '@/auth/context/auth-provider'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  return (
    <RouterProvider navigate={router.push}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </RouterProvider>
  )
}
