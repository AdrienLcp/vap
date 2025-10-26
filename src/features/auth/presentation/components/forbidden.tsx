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

export const Forbidden: React.FC = () => (
  <FallbackWrapper>
    <FallbackTitle>{t('auth.forbidden.title')}</FallbackTitle>

    <FallbackDescription>{t('auth.forbidden.description')}</FallbackDescription>

    <Link className='fallback-button' href={DEFAULT_ROUTE}>
      {t('auth.forbidden.linkLabel')}

      <VisuallyHidden>{t('auth.forbidden.title')}</VisuallyHidden>
    </Link>
  </FallbackWrapper>
)
