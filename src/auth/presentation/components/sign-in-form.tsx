'use client'

import { LogInIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

import { useAuth } from '@/auth/application/use-auth'
import { AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import type { AuthUserDTO, SignInInfo } from '@/auth/domain/auth-entities'
import { AuthClient } from '@/auth/infrastructure/auth-client'
import { DEFAULT_ROUTE, ROUTES } from '@/domain/navigation'
import { BAD_REQUEST_STATUS, OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { RequiredFieldsMessage } from '@/presentation/components/forms/required-fields-message'
import { Button } from '@/presentation/components/ui/pressables/button'
import { Link } from '@/presentation/components/ui/pressables/link'
import { Separator } from '@/presentation/components/ui/separator'
import type { ValidationErrors } from '@/presentation/utils/react-aria-utils'
import { UserEmailField } from '@/user/presentation/user-email-field'
import { UserPasswordField } from '@/user/presentation/user-password-field'
import type { ValueOf } from '@/utils/object-utils'

import './sign-in-form.sass'

type SignInFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const SignInForm: React.FC = () => {
  const [isUserAuthenticationLoading, setIsUserAuthenticationLoading] = React.useState(false)
  const [signInFormErrors, setSignInFormErrors] = React.useState<SignInFormErrors>(null)

  const { setUser } = useAuth()

  const onSignInSuccess = React.useCallback((authenticatedUser: AuthUserDTO) => {
    setUser(authenticatedUser)
    redirect(DEFAULT_ROUTE)
  }, [setUser])

  const onSignInFormSubmit = React.useCallback(async (formData: FormData) => {
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
    <Form
      className='sign-in-form'
      onSubmit={onSignInFormSubmit}
      validationErrors={signInFormErrors}
    >
      <FieldSet isDisabled={isUserAuthenticationLoading}>
        <UserEmailField />

        <UserPasswordField />
      </FieldSet>

      <RequiredFieldsMessage />

      <FormError validationErrors={signInFormErrors} />

      <Button
        Icon={<LogInIcon />}
        isPending={isUserAuthenticationLoading}
        type='submit'
        variant='filled'
      >
        {({ isPending }) => t(`auth.signIn.form.submit.${isPending ? 'loading' : 'label'}`)}
      </Button>

      <div className='sign-up'>
        <p>{t('auth.signIn.noAccount')}</p>

        <Separator />

        <Link href={ROUTES.signUp} variant='underlined'>
          {t('auth.signIn.signUpHere')}
        </Link>
      </div>
    </Form>
  )
}
