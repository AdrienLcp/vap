import classNames from 'classnames'

import { locale } from '@/infrastructure/i18n'
import { fontBody, fontTitle } from '@/presentation/assets/fonts'
import { Header } from '@/presentation/components/header'
import { Providers } from '@/presentation/components/providers'
import { Toaster } from '@/presentation/components/ui/toaster'

import '@/presentation/styles/base.sass'
import './root-layout.sass'

export const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => (
  <Providers>
    <html data-scroll-behavior='smooth' lang={locale.slice(0, 2)}>
      <body className={classNames(fontBody.variable, fontTitle.variable)}>
        <Header />

        {children}

        <Toaster />
      </body>
    </html>
  </Providers>
)
