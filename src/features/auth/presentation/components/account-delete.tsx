'use client'

import { Trash2Icon, XIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { AccountDeleteButton } from '@/features/auth/presentation/components/account-delete-button'
import { UserPasswordField } from '@/features/user/presentation/components/user-password-field'
import { BAD_REQUEST_STATUS, NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Form, type FormValues } from '@/presentation/components/forms/form'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'
import type { ValidationErrors } from '@/utils/validation-utils'

import './account-delete.sass'

type SignInFormErrors = ValidationErrors<typeof AUTH_FORM_FIELDS.PASSWORD>

export const AccountDelete: React.FC = () => {
  const [isDeletingUserAccount, setIsDeletingUserAccount] = useState(false)
  const [accountDeletionFormValidationErrors, setAccountDeletionFormValidationErrors] = useState<SignInFormErrors>(null)

  const deleteAccount = useCallback(async (formValues: FormValues) => {
    setIsDeletingUserAccount(true)

    const password = formValues.getString(AUTH_FORM_FIELDS.PASSWORD)
    const accountDeletionResponse = await AuthClient.deleteUser(password)

    setIsDeletingUserAccount(false)

    switch (accountDeletionResponse.status) {
      case NO_CONTENT_STATUS:
        ToastService.success(t('auth.deleteAccount.success'))
        redirect(DEFAULT_ROUTE)
        break
      case BAD_REQUEST_STATUS:
        setAccountDeletionFormValidationErrors({ [AUTH_FORM_FIELDS.PASSWORD]: t('auth.deleteAccount.errors.invalidPassword') })
        break
      default:
        setAccountDeletionFormValidationErrors({ form: t('auth.deleteAccount.errors.unknown') })
        break
    }
  }, [])

  return (
    <DialogTrigger>
      <AccountDeleteButton isPending={isDeletingUserAccount} />

      <ModalOverlay className='account-delete overlay' isDismissable>
        <Modal className='modal'>
          <Dialog className='dialog'>
            {({ close }) => (
              <Form
                onSubmit={deleteAccount}
                validationErrors={accountDeletionFormValidationErrors}
              >
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
                    onPress={close}
                    variant='transparent'
                  >
                    {t('auth.deleteAccount.form.cancel')}
                  </Button>
                </div>
              </Form>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
