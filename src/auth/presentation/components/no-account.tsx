'use client'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'
import { Separator } from '@/presentation/components/ui/separator'

export const NoAccount: React.FC = () => (
  <div className='no-account'>
    <p>{t('auth.signIn.noAccount')}</p>

    <Separator />

    <Link href={ROUTES.signUp} variant='underlined'>
      {t('auth.signIn.signUpHere')}
    </Link>
  </div>
)
