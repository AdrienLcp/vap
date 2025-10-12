'use client'

import { LogInIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { useAuth } from '@/features/auth/application/use-auth'
import { AUTH_CONSTANTS, AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import type { AuthUserDTO, SignUpInfo } from '@/features/auth/domain/auth-entities'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { UserEmailField } from '@/features/user/presentation/components/user-email-field'
import { UserNameField } from '@/features/user/presentation/components/user-name-field'
import { UserPasswordField } from '@/features/user/presentation/components/user-password-field'
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, CREATED_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form, type FormValues } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { RequiredFieldsMessage } from '@/presentation/components/forms/required-fields-message'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import type { ValueOf } from '@/utils/object-utils'
import type { ValidationErrors } from '@/utils/validation-utils'

type SignUpFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const SignUpForm: React.FC = () => {
  const [isUserCreationLoading, setIsUserCreationLoading] = useState(false)
  const [signUpFormErrors, setSignUpFormErrors] = useState<SignUpFormErrors>(null)

  const { setUser } = useAuth()

  const onSignUpSuccess = useCallback((createdUser: AuthUserDTO) => {
    setUser(createdUser)
    redirect(DEFAULT_ROUTE)
  }, [setUser])

  const onSignUpFormSubmit = useCallback(async (formValues: FormValues) => {
    setIsUserCreationLoading(true)
    setSignUpFormErrors(null)

    const credentials: SignUpInfo = {
      email: formValues.getString(AUTH_FORM_FIELDS.EMAIL),
      name: formValues.getString(AUTH_FORM_FIELDS.NAME),
      password: formValues.getString(AUTH_FORM_FIELDS.PASSWORD)
    }

    const signUpResponse = await AuthClient.emailSignUp(credentials)

    setIsUserCreationLoading(false)

    switch (signUpResponse.status) {
      case CREATED_STATUS:
        onSignUpSuccess(signUpResponse.data)
        break
      case BAD_REQUEST_STATUS:
        setSignUpFormErrors({
          [AUTH_FORM_FIELDS.PASSWORD]: t('auth.signUp.errors.invalidPasswordLength', {
            maxLength: AUTH_CONSTANTS.PASSWORD_MAX_LENGTH,
            minLength: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH
          })
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
    <Form onSubmit={onSignUpFormSubmit} validationErrors={signUpFormErrors}>
      <FieldSet isDisabled={isUserCreationLoading}>
        <UserEmailField />

        <UserNameField />

        <UserPasswordField />
      </FieldSet>

      <RequiredFieldsMessage />

      <FormError errors={signUpFormErrors?.form} />

      <SubmitButton Icon={<LogInIcon />} isPending={isUserCreationLoading}>
        {({ isPending }) => t(`auth.signUp.submit.${isPending ? 'creating' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
