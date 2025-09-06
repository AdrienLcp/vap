'use client'

import { VisuallyHidden } from 'react-aria-components'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { ErrorDescription, ErrorTitle, ErrorWrapper } from '@/presentation/components/ui/error'
import { Link } from '@/presentation/components/ui/pressables/link'

export const Unauthorized: React.FC = () => (
  <ErrorWrapper>
    <ErrorTitle>
      {t('auth.unauthorized.title')}
    </ErrorTitle>

    <ErrorDescription>
      {t('auth.unauthorized.description')}
    </ErrorDescription>

    <Link className='error-button' href={DEFAULT_ROUTE}>
      {t('auth.unauthorized.linkLabel')}

      <VisuallyHidden>
        {t('auth.unauthorized.title')}
      </VisuallyHidden>
    </Link>
  </ErrorWrapper>
)
