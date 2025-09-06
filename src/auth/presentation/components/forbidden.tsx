import { VisuallyHidden } from 'react-aria-components'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { ErrorDescription, ErrorTitle, ErrorWrapper } from '@/presentation/components/ui/error'
import { Link } from '@/presentation/components/ui/pressables/link'

export const Forbidden: React.FC = () => (
  <ErrorWrapper>
    <ErrorTitle>
      {t('auth.forbidden.title')}
    </ErrorTitle>

    <ErrorDescription>
      {t('auth.forbidden.description')}
    </ErrorDescription>

    <Link className='error-button' href={DEFAULT_ROUTE}>
      {t('auth.forbidden.linkLabel')}

      <VisuallyHidden>
        {t('auth.forbidden.title')}
      </VisuallyHidden>
    </Link>
  </ErrorWrapper>
)
