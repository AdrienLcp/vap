'use client'

import { DisclosureGroup } from 'react-aria-components'

import { AccountDelete } from '@/features/auth/presentation/components/account-delete'
import { ChangeEmailForm } from '@/features/auth/presentation/components/forms/change-email-form'
import { ChangePasswordForm } from '@/features/auth/presentation/components/forms/change-password-form'
import { t } from '@/infrastructure/i18n'
import { Disclosure } from '@/presentation/components/ui/disclosure'

import './profile-dashboard.sass'

export const ProfileDashboard: React.FC = () => (
  <DisclosureGroup className='profile-dashboard'>
    <Disclosure Title={<h2>{t('auth.profile.changeEmail')}</h2>}>
      <section>
        <ChangeEmailForm />
      </section>
    </Disclosure>

    <Disclosure Title={<h2>{t('auth.profile.changePassword')}</h2>}>
      <section>
        <ChangePasswordForm />
      </section>
    </Disclosure>

    <Disclosure Title={<h2>{t('auth.profile.deleteAccount')}</h2>}>
      <section>
        <AccountDelete />
      </section>
    </Disclosure>
  </DisclosureGroup>
)
