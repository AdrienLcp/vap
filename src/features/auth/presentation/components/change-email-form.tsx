'use client'

import { SaveIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { UserEmailField } from '@/features/user/presentation/components/user-email-field'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Form, type FormValues } from '@/presentation/components/forms/form'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'
import type { ValueOf } from '@/utils/object-utils'
import type { ValidationErrors } from '@/utils/validation-utils'

type ChangeEmailFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const ChangeEmailForm: React.FC = () => {
  const [isChangeEmailLoading, setIsChangeEmailLoading] = useState(false)
  const [changeEmailFormErrors, setChangeEmailFormErrors] = useState<ChangeEmailFormErrors>(null)

  const onChangeEmailFormSubmit = useCallback(async (formValues: FormValues) => {
    setIsChangeEmailLoading(true)
    setChangeEmailFormErrors(null)

    const newEmail = formValues.getString(AUTH_FORM_FIELDS.EMAIL)

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
      onSubmit={onChangeEmailFormSubmit}
      validationErrors={changeEmailFormErrors}
    >
      <UserEmailField
        isDisabled={isChangeEmailLoading}
        label={t('auth.fields.email.label')}
        placeholder={t('auth.fields.email.placeholder')}
      />

      <SubmitButton Icon={<SaveIcon aria-hidden />} isPending={isChangeEmailLoading}>
        {({ isPending }) => t(`auth.changeEmail.submit.${isPending ? 'loading' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
