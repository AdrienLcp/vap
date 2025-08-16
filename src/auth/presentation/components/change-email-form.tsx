'use client'

import React from 'react'

import { AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import { AuthClient } from '@/auth/infrastructure/auth-client'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Form } from '@/presentation/components/forms/form'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'
import type { ValidationErrors } from '@/presentation/utils/react-aria-utils'
import { UserEmailField } from '@/user/presentation/user-email-field'
import type { ValueOf } from '@/utils/object-utils'

type ChangeEmailFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const ChangeEmailForm: React.FC = () => {
  const [isChangeEmailLoading, setIsChangeEmailLoading] = React.useState(false)
  const [changeEmailFormErrors, setChangeEmailFormErrors] = React.useState<ChangeEmailFormErrors>(null)

  const onChangeEmailFormSubmit = React.useCallback(async (formData: FormData) => {
    setIsChangeEmailLoading(true)
    setChangeEmailFormErrors(null)

    const newEmail = formData.get(AUTH_FORM_FIELDS.EMAIL) as string

    const changeEmailResponse = await AuthClient.changeEmail(newEmail)

    setIsChangeEmailLoading(false)

    switch (changeEmailResponse.status) {
      case NO_CONTENT_STATUS:
        ToastService.success(t('auth.changeEmail.success'))
        break
      default:
        setChangeEmailFormErrors({ form: t('auth.changeEmail.errors.unknown') })
    }
  }, [])

  return (
    <Form
      className='change-email-form'
      onSubmit={onChangeEmailFormSubmit}
      validationErrors={changeEmailFormErrors}
    >
      <UserEmailField
        label={t('auth.changeEmail.form.email.label')}
        placeholder={t('auth.changeEmail.form.email.placeholder')}
      />

      <Button
        isPending={isChangeEmailLoading}
        type='submit'
        variant='filled'
      >
        {({ isPending }) => t(`auth.changeEmail.form.submit.${isPending ? 'loading' : 'label'}`)}
      </Button>
    </Form>
  )
}
