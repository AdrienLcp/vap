'use client'

import { SaveIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import { UserEmailSchema } from '@/features/auth/domain/auth-schemas'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { UserEmailField } from '@/features/auth/presentation/components/forms/user-email-field'
import { BAD_REQUEST_STATUS, NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Form } from '@/presentation/components/forms/form'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'
import type { ValueOf } from '@/utils/object-utils'
import type { ValidationErrors } from '@/utils/validation-utils'

type ChangeEmailFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const ChangeEmailForm: React.FC = () => {
  const [isChangeEmailLoading, setIsChangeEmailLoading] = useState(false)
  const [changeEmailFormErrors, setChangeEmailFormErrors] = useState<ChangeEmailFormErrors>(null)

  const onChangeEmailFormSubmit = useCallback(async (formData: FormData) => {
    setIsChangeEmailLoading(true)
    setChangeEmailFormErrors(null)

    const newEmail = formData.get(AUTH_FORM_FIELDS.EMAIL)
    const emailValidation = UserEmailSchema.safeParse(newEmail)

    if (!emailValidation.success) {
      setIsChangeEmailLoading(false)
      setChangeEmailFormErrors({ [AUTH_FORM_FIELDS.EMAIL]: t('auth.changeEmail.errors.invalidEmail') })
      return
    }

    const changeEmailResponse = await AuthClient.changeEmail(emailValidation.data)

    setIsChangeEmailLoading(false)

    switch (changeEmailResponse.status) {
      case NO_CONTENT_STATUS:
        ToastService.success(t('auth.changeEmail.success'))
        break
      case BAD_REQUEST_STATUS:
        setChangeEmailFormErrors({ [AUTH_FORM_FIELDS.EMAIL]: t('auth.changeEmail.errors.invalidEmail') })
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
