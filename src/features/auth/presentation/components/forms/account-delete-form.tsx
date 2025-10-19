'use client'

import { Trash2Icon, XIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import { DeleteAccountPasswordSchema } from '@/features/auth/domain/auth-schemas'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { UserPasswordField } from '@/features/auth/presentation/components/forms/user-password-field'
import { BAD_REQUEST_STATUS, NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Form } from '@/presentation/components/forms/form'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'
import type { ValidationErrors } from '@/utils/validation-utils'

type SignInFormErrors = ValidationErrors<typeof AUTH_FORM_FIELDS.PASSWORD>

type AccountDeleteFormProps = {
  onCloseButtonPress: () => void
}

export const AccountDeleteForm: React.FC<AccountDeleteFormProps> = ({ onCloseButtonPress }) => {
  const [isDeletingUserAccount, setIsDeletingUserAccount] = useState(false)
  const [accountDeletionFormValidationErrors, setAccountDeletionFormValidationErrors] = useState<SignInFormErrors>(null)

  const onDeleteAccountSuccess = useCallback(() => {
    ToastService.success(t('auth.deleteAccount.success'))
    redirect(DEFAULT_ROUTE)
  }, [])

  const onDeleteAccountBadRequest = useCallback(() => {
    setAccountDeletionFormValidationErrors({ [AUTH_FORM_FIELDS.PASSWORD]: t('auth.deleteAccount.errors.invalidPassword') })
  }, [])

  const deleteAccount = useCallback(async (formData: FormData) => {
    setIsDeletingUserAccount(true)

    const password = formData.get(AUTH_FORM_FIELDS.PASSWORD)
    const passwordValidation = DeleteAccountPasswordSchema.safeParse(password)

    if (!passwordValidation.success) {
      onDeleteAccountBadRequest()
      setIsDeletingUserAccount(false)
      return
    }

    const accountDeletionResponse = await AuthClient.deleteUser(passwordValidation.data)

    setIsDeletingUserAccount(false)

    switch (accountDeletionResponse.status) {
      case NO_CONTENT_STATUS:
        onDeleteAccountSuccess()
        break
      case BAD_REQUEST_STATUS:
        onDeleteAccountBadRequest()
        break
      default:
        setAccountDeletionFormValidationErrors({ form: t('auth.deleteAccount.errors.unknown') })
        break
    }
  }, [onDeleteAccountBadRequest, onDeleteAccountSuccess])

  return (
    <Form onSubmit={deleteAccount} validationErrors={accountDeletionFormValidationErrors}>
      <h3>{t('auth.deleteAccount.title')}</h3>

      <p className='warning'>{t('auth.deleteAccount.warning')}</p>

      <UserPasswordField />

      <div className='actions'>
        <Button
          Icon={<Trash2Icon aria-hidden />}
          isPending={isDeletingUserAccount}
          type='submit'
          variant='destructive'
        >
          {t('auth.deleteAccount.form.submit.label')}
        </Button>

        <Button
          Icon={<XIcon aria-hidden />}
          isPending={isDeletingUserAccount}
          onPress={onCloseButtonPress}
          variant='transparent'
        >
          {t('auth.deleteAccount.form.cancel')}
        </Button>
      </div>
    </Form>
  )
}
