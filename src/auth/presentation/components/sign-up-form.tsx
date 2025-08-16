'use client'

import { AlertCircleIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

import { useAuth } from '@/auth/application/use-auth'
import { AUTH_CONSTANTS, AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import type { AuthUserDTO } from '@/auth/domain/auth-entities'
import { AuthClient } from '@/auth/infrastructure/auth-client'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, CREATED_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { RequiredFieldsMessage } from '@/presentation/components/forms/required-fields-message'
import { Button } from '@/presentation/components/ui/pressables/button'
import type { ValidationErrors } from '@/presentation/utils/react-aria-utils'
import { UserEmailField } from '@/user/presentation/user-email-field'
import { UserNameField } from '@/user/presentation/user-name-field'
import { UserPasswordField } from '@/user/presentation/user-password-field'
import type { ValueOf } from '@/utils/object-utils'

import './sign-up-form.sass'

type SignUpFormValidationErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const SignUpForm: React.FC = () => {
  const [isUserCreationLoading, setIsUserCreationLoading] = React.useState(false)
  const [signUpFormErrors, setSignUpFormErrors] = React.useState<SignUpFormValidationErrors>()

  const { setUser } = useAuth()

  const onSignUpSuccess = React.useCallback((createdUser: AuthUserDTO) => {
    setUser(createdUser)
    redirect(DEFAULT_ROUTE)
  }, [setUser])

  const onSignUpFormSubmit = React.useCallback(async (formData: FormData) => {
    setIsUserCreationLoading(true)
    setSignUpFormErrors(null)

    const credentials = {
      email: formData.get(AUTH_FORM_FIELDS.EMAIL) as string,
      name: formData.get(AUTH_FORM_FIELDS.NAME) as string,
      password: formData.get(AUTH_FORM_FIELDS.PASSWORD) as string
    }

    const signUpResponse = await AuthClient.emailSignUp(credentials)

    setIsUserCreationLoading(false)

    switch (signUpResponse.status) {
      case CREATED_STATUS:
        onSignUpSuccess(signUpResponse.data)
      case BAD_REQUEST_STATUS:
        setSignUpFormErrors({
          [AUTH_FORM_FIELDS.PASSWORD]: t('auth.signUp.errors.passwordTooShort', { characterCount: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH })
        })
        break
      case CONFLICT_STATUS:
        setSignUpFormErrors({ [AUTH_FORM_FIELDS.EMAIL]: t('auth.signUp.errors.userAlreadyExists') })
        break
      default:
        setSignUpFormErrors({ form: t('auth.signUp.errors.unknown') })
        break
    }
  }, [onSignUpSuccess])

  return (
    <Form
      className='sign-up-form'
      onSubmit={onSignUpFormSubmit}
      validationErrors={signUpFormErrors}
    >
      <FieldSet isDisabled={isUserCreationLoading}>
        <UserEmailField />

        <UserNameField />

        <UserPasswordField />
      </FieldSet>

      <RequiredFieldsMessage />

      <FormError validationErrors={signUpFormErrors} />

      <Button variant='filled' type='submit'>
        {t(`auth.signUp.form.submit.${isUserCreationLoading ? 'creating' : 'label'}`)}
      </Button>
    </Form>
  )
}
