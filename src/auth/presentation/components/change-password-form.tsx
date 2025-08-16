'use client'

import React from 'react'

import { AUTH_CONSTANTS, AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import type { ChangePasswordConflictError } from '@/auth/domain/auth-entities'
import { AuthClient } from '@/auth/infrastructure/auth-client'
import { BAD_REQUEST_STATUS, NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Form } from '@/presentation/components/forms/form'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'
import type { ValidationErrors } from '@/presentation/utils/react-aria-utils'
import { UserPasswordField } from '@/user/presentation/user-password-field'
import type { ValueOf } from '@/utils/object-utils'

type ChangePasswordFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const ChangePasswordForm: React.FC = () => {
  const [isChangePasswordLoading, setIsChangePasswordLoading] = React.useState(false)
  const [changePasswordFormErrors, setChangePasswordFormErrors] = React.useState<ChangePasswordFormErrors>(null)

  const onChangePasswordBadRequest = React.useCallback((errorCode: ChangePasswordConflictError) => {
    switch (errorCode) {
      case 'INVALID_PASSWORD':
        setChangePasswordFormErrors({ [AUTH_FORM_FIELDS.NEW_PASSWORD]: t('auth.changePassword.errors.invalidPassword') })
      case 'PASSWORD_TOO_SHORT':
        setChangePasswordFormErrors({
          [AUTH_FORM_FIELDS.NEW_PASSWORD]: t('auth.changePassword.errors.invalidPasswordLength', {
            minLength: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH,
            maxLength: AUTH_CONSTANTS.PASSWORD_MAX_LENGTH
          })
        })
      default:
        setChangePasswordFormErrors({ form: t('auth.changePassword.errors.unknown') })
        break
    }
  }, [])

  const onChangePasswordFormSubmit = React.useCallback(async (formData: FormData) => {
    setIsChangePasswordLoading(true)
    setChangePasswordFormErrors(null)

    const changePasswordInfo = {
      currentPassword: formData.get(AUTH_FORM_FIELDS.PASSWORD) as string,
      newPassword: formData.get(AUTH_FORM_FIELDS.NEW_PASSWORD) as string
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
      <UserPasswordField
        label={t('auth.changePassword.form.currentPassword.label')}
        placeholder={t('auth.changePassword.form.currentPassword.placeholder')}
      />

      <UserPasswordField
        label={t('auth.changePassword.form.newPassword.label')}
        name={AUTH_FORM_FIELDS.NEW_PASSWORD}
        placeholder={t('auth.changePassword.form.newPassword.placeholder')}
      />

      <Button
        isPending={isChangePasswordLoading}
        type='submit'
        variant='filled'
      >
        {({ isPending }) => t(`auth.changePassword.form.submit.${isPending ? 'loading' : 'label'}`)}
      </Button>
    </Form>
  )
}
