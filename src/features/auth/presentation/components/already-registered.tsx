'use client'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'
import { Separator } from '@/presentation/components/ui/separator'

export const AlreadyRegistered: React.FC = () => (
  <div className='already-registered'>
    <p>{t('auth.signUp.alreadyHaveAccount')}</p>

    <Separator />

    <Link href={ROUTES.signIn} variant='underlined'>
      {t('auth.signUp.signInHere')}
    </Link>
  </div>
)
