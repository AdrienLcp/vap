'use client'

import { LogInIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { useAuth } from '@/features/auth/application/use-auth'
import { AUTH_CONSTANTS, AUTH_ERRORS, AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import type { AuthUserDTO, SignUpInfo } from '@/features/auth/domain/auth-entities'
import { SignUpInfoSchema } from '@/features/auth/domain/auth-schemas'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { UserEmailField } from '@/features/auth/presentation/components/forms/user-email-field'
import { UserNameField } from '@/features/auth/presentation/components/forms/user-name-field'
import { UserPasswordField } from '@/features/auth/presentation/components/forms/user-password-field'
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, CREATED_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { RequiredFieldsMessage } from '@/presentation/components/forms/required-fields-message'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import type { ValueOf } from '@/utils/object-utils'
import type { Issues, ValidationErrors } from '@/utils/validation-utils'

type SignUpFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const SignUpForm: React.FC = () => {
  const [isUserCreationLoading, setIsUserCreationLoading] = useState(false)
  const [signUpFormErrors, setSignUpFormErrors] = useState<SignUpFormErrors>(null)

  const { setUser } = useAuth()

  const onSignUpSuccess = useCallback((createdUser: AuthUserDTO) => {
    setUser(createdUser)
    redirect(DEFAULT_ROUTE)
  }, [setUser])

  const onSignUpBadRequest = useCallback(() => {
    setSignUpFormErrors({
      [AUTH_FORM_FIELDS.PASSWORD]: t('auth.signUp.errors.invalidPasswordLength', {
        maxLength: AUTH_CONSTANTS.PASSWORD_MAX_LENGTH,
        minLength: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH
      })
    })
  }, [])

  const onSignUpValidationError = useCallback((issues: Issues<SignUpInfo>) => {
    const emailErrors: string[] = []
    const userNameErrors: string[] = []
    const passwordErrors: string[] = []
    const formErrors: string[] = []

    for (const issue of issues) {
      switch (issue.message) {
        case AUTH_ERRORS.INVALID_EMAIL:
          emailErrors.push(t('auth.signUp.errors.invalidEmail'))
          break
        case AUTH_ERRORS.USER_NAME_REQUIRED:
          userNameErrors.push(t('auth.signUp.errors.userNameRequired'))
          break
        case AUTH_ERRORS.PASSWORD_TOO_SHORT:
          passwordErrors.push(t('auth.signUp.errors.invalidPasswordLength', {
            maxLength: AUTH_CONSTANTS.PASSWORD_MAX_LENGTH,
            minLength: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH
          }))
          break
        default:
          formErrors.push(t('auth.signUp.errors.unknown'))
          break
      }
    }

    setSignUpFormErrors({
      [AUTH_FORM_FIELDS.EMAIL]: emailErrors,
      [AUTH_FORM_FIELDS.NAME]: userNameErrors,
      [AUTH_FORM_FIELDS.PASSWORD]: passwordErrors,
      form: formErrors
    })
  }, [])

  const onSignUpFormSubmit = useCallback(async (formData: FormData) => {
    setIsUserCreationLoading(true)
    setSignUpFormErrors(null)

    const credentials = {
      email: formData.get(AUTH_FORM_FIELDS.EMAIL),
      name: formData.get(AUTH_FORM_FIELDS.NAME),
      password: formData.get(AUTH_FORM_FIELDS.PASSWORD)
    }

    const credentialsValidation = SignUpInfoSchema.safeParse(credentials)

    if (!credentialsValidation.success) {
      onSignUpValidationError(credentialsValidation.error.issues)
      setIsUserCreationLoading(false)
      return
    }

    const signUpResponse = await AuthClient.emailSignUp(credentialsValidation.data)

    setIsUserCreationLoading(false)

    switch (signUpResponse.status) {
      case CREATED_STATUS:
        onSignUpSuccess(signUpResponse.data)
        break
      case BAD_REQUEST_STATUS:
        // HERE
        // HERE
        // HERE
        // HERE
        // HERE
        onSignUpBadRequest()
        // HERE
        // HERE
        // HERE
        // HERE
        // HERE
        // HERE
        break
      case CONFLICT_STATUS:
        setSignUpFormErrors({ [AUTH_FORM_FIELDS.EMAIL]: t('auth.signUp.errors.userAlreadyExists') })
        break
      default:
        setSignUpFormErrors({ form: t('auth.signUp.errors.unknown') })
        break
    }
  }, [onSignUpBadRequest, onSignUpSuccess, onSignUpValidationError])

  return (
    <Form onSubmit={onSignUpFormSubmit} validationErrors={signUpFormErrors}>
      <FieldSet isDisabled={isUserCreationLoading}>
        <UserEmailField />

        <UserNameField />

        <UserPasswordField />
      </FieldSet>

      <RequiredFieldsMessage />

      <FormError errors={signUpFormErrors?.form} />

      <SubmitButton Icon={<LogInIcon aria-hidden />} isPending={isUserCreationLoading}>
        {({ isPending }) => t(`auth.signUp.submit.${isPending ? 'creating' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
