'use client'

import { useRouter } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next'
import { I18nProvider, RouterProvider } from 'react-aria-components'

import { AuthProvider } from '@/features/auth/presentation/context/auth-provider'
import { locale } from '@/infrastructure/i18n'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  return (
    <I18nProvider locale={locale}>
      <NuqsAdapter>
        <RouterProvider navigate={router.push}>
          <AuthProvider>{children}</AuthProvider>
        </RouterProvider>
      </NuqsAdapter>
    </I18nProvider>
  )
}
