'use client'

import { SaveIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { AUTH_CONSTANTS, AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import type { ChangePasswordConflictError } from '@/features/auth/domain/auth-entities'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { UserPasswordField } from '@/features/user/presentation/components/user-password-field'
import { BAD_REQUEST_STATUS, NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form, type FormValues } from '@/presentation/components/forms/form'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'
import type { ValueOf } from '@/utils/object-utils'
import type { ValidationErrors } from '@/utils/validation-utils'

type ChangePasswordFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const ChangePasswordForm: React.FC = () => {
  const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false)
  const [changePasswordFormErrors, setChangePasswordFormErrors] = useState<ChangePasswordFormErrors>(null)

  const onChangePasswordBadRequest = useCallback((errorCode: ChangePasswordConflictError) => {
    switch (errorCode) {
      case 'INVALID_PASSWORD':
        setChangePasswordFormErrors({ [AUTH_FORM_FIELDS.NEW_PASSWORD]: t('auth.changePassword.errors.invalidPassword') })
        break
      case 'PASSWORD_TOO_SHORT':
        setChangePasswordFormErrors({
          [AUTH_FORM_FIELDS.NEW_PASSWORD]: t('auth.changePassword.errors.invalidPasswordLength', {
            maxLength: AUTH_CONSTANTS.PASSWORD_MAX_LENGTH,
            minLength: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH
          })
        })
        break
      default:
        setChangePasswordFormErrors({ form: t('auth.changePassword.errors.unknown') })
        break
    }
  }, [])

  const onChangePasswordFormSubmit = useCallback(async (formValues: FormValues) => {
    setIsChangePasswordLoading(true)
    setChangePasswordFormErrors(null)

    const changePasswordInfo = {
      currentPassword: formValues.getString(AUTH_FORM_FIELDS.PASSWORD),
      newPassword: formValues.getString(AUTH_FORM_FIELDS.NEW_PASSWORD)
    }

    const changePasswordResponse = await AuthClient.changePassword(changePasswordInfo)

    setIsChangePasswordLoading(false)

    switch (changePasswordResponse.status) {
      case NO_CONTENT_STATUS:
        ToastService.success(t('auth.changePassword.success'))
        break
      case BAD_REQUEST_STATUS:
        onChangePasswordBadRequest(changePasswordResponse.issues)
        break
      default:
        setChangePasswordFormErrors({ form: t('auth.changePassword.errors.unknown') })
        break
    }
  }, [onChangePasswordBadRequest])

  return (
    <Form onSubmit={onChangePasswordFormSubmit} validationErrors={changePasswordFormErrors}>
      <FieldSet isDisabled={isChangePasswordLoading}>
        <UserPasswordField
          label={t('auth.changePassword.form.currentPassword.label')}
          placeholder={t('auth.changePassword.form.currentPassword.placeholder')}
        />

        <UserPasswordField
          label={t('auth.changePassword.form.newPassword.label')}
          name={AUTH_FORM_FIELDS.NEW_PASSWORD}
          placeholder={t('auth.changePassword.form.newPassword.placeholder')}
        />
      </FieldSet>

      <SubmitButton Icon={<SaveIcon aria-hidden />} isPending={isChangePasswordLoading}>
        {({ isPending }) => t(`auth.changePassword.form.submit.${isPending ? 'loading' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
