'use client'

import { LogInIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { useAuth } from '@/features/auth/application/use-auth'
import { AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import type { AuthUserDTO, SignInInfo } from '@/features/auth/domain/auth-entities'
import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { UserEmailField } from '@/features/user/presentation/user-email-field'
import { UserPasswordField } from '@/features/user/presentation/user-password-field'
import { BAD_REQUEST_STATUS, OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { RequiredFieldsMessage } from '@/presentation/components/forms/required-fields-message'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import type { ValueOf } from '@/utils/object-utils'
import type { ValidationErrors } from '@/utils/validation-utils'

type SignInFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const SignInForm: React.FC = () => {
  const [isUserAuthenticationLoading, setIsUserAuthenticationLoading] = useState(false)
  const [signInFormErrors, setSignInFormErrors] = useState<SignInFormErrors>(null)

  const { setUser } = useAuth()

  const onSignInSuccess = useCallback((authenticatedUser: AuthUserDTO) => {
    setUser(authenticatedUser)
    redirect(DEFAULT_ROUTE)
  }, [setUser])

  const onSignInFormSubmit = useCallback(async (formData: FormData) => {
    setIsUserAuthenticationLoading(true)
    setSignInFormErrors(null)

    const credentials: SignInInfo = {
      email: formData.get(AUTH_FORM_FIELDS.EMAIL) as string,
      password: formData.get(AUTH_FORM_FIELDS.PASSWORD) as string
    }

    const signInResponse = await AuthClient.emailSignIn(credentials)

    setIsUserAuthenticationLoading(false)

    switch (signInResponse.status) {
      case OK_STATUS:
        onSignInSuccess(signInResponse.data)
        break
      case BAD_REQUEST_STATUS:
        setSignInFormErrors({ form: t('auth.signIn.errors.invalidCredentials') })
        break
      default:
        setSignInFormErrors({ form: t('auth.signIn.errors.unknown') })
        break
    }
  }, [onSignInSuccess])

  return (
    <Form onSubmit={onSignInFormSubmit} validationErrors={signInFormErrors}>
      <FieldSet isDisabled={isUserAuthenticationLoading}>
        <UserEmailField />

        <UserPasswordField />
      </FieldSet>

      <RequiredFieldsMessage />

      <FormError errors={signInFormErrors?.form} />

      <SubmitButton Icon={<LogInIcon aria-hidden />} isPending={isUserAuthenticationLoading}>
        {({ isPending }) => t(`auth.signIn.submit.${isPending ? 'loading' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
