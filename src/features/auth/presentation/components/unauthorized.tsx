'use client'

import { VisuallyHidden } from 'react-aria-components'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import {
  FallbackDescription,
  FallbackTitle,
  FallbackWrapper
} from '@/presentation/components/ui/fallback'
import { Link } from '@/presentation/components/ui/pressables/link'

export const Unauthorized: React.FC = () => (
  <FallbackWrapper>
    <FallbackTitle>{t('auth.unauthorized.title')}</FallbackTitle>

    <FallbackDescription>{t('auth.unauthorized.description')}</FallbackDescription>

    <Link className='fallback-button' href={DEFAULT_ROUTE} variant='underlined'>
      {t('auth.unauthorized.linkLabel')}

      <VisuallyHidden>{t('auth.unauthorized.title')}</VisuallyHidden>
    </Link>
  </FallbackWrapper>
)
