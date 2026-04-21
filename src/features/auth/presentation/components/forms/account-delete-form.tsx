'use client'

import { MailIcon, XIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

import './account-delete-form.sass'

type AccountDeleteFormProps = {
  onCloseButtonPress: () => void
}

export const AccountDeleteForm: React.FC<AccountDeleteFormProps> = ({
  onCloseButtonPress
}) => {
  const [isRequestingDeletion, setIsRequestingDeletion] = useState(false)

  const requestAccountDeletion = useCallback(async () => {
    setIsRequestingDeletion(true)

    const response = await AuthClient.deleteUser()

    setIsRequestingDeletion(false)

    if (response.status === NO_CONTENT_STATUS) {
      ToastService.success(t('auth.deleteAccount.emailSent'))
      onCloseButtonPress()
      return
    }

    ToastService.error(t('auth.deleteAccount.errors.unknown'))
  }, [onCloseButtonPress])

  return (
    <div className='account-delete-form'>
      <h3>{t('auth.deleteAccount.title')}</h3>

      <p className='warning-message'>{t('auth.deleteAccount.warning')}</p>

      <p className='warning-message'>{t('auth.deleteAccount.emailHint')}</p>

      <div className='actions'>
        <Button
          Icon={<MailIcon aria-hidden />}
          isPending={isRequestingDeletion}
          onPress={requestAccountDeletion}
          variant='destructive'
        >
          {t('auth.deleteAccount.form.submit.label')}
        </Button>

        <Button
          Icon={<XIcon aria-hidden />}
          isPending={isRequestingDeletion}
          onPress={onCloseButtonPress}
          variant='transparent'
        >
          {t('auth.deleteAccount.form.cancel')}
        </Button>
      </div>
    </div>
  )
}
