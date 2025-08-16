'use client'

import { redirect } from 'next/navigation'
import React from 'react'

import { AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import { AuthClient } from '@/auth/infrastructure/auth-client'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Form } from '@/presentation/components/forms/form'
import { Button } from '@/presentation/components/ui/pressables/button'
import type { ValidationErrors } from '@/presentation/utils/react-aria-utils'
import { UserEmailField } from '@/user/presentation/components/user-email-field'
import { UserNameField } from '@/user/presentation/components/user-name-field'
import { UserPasswordField } from '@/user/presentation/components/user-password-field'
import type { ValueOf } from '@/utils/object-utils'

type SignUpFormValidationErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>> | null

export const SignUpForm: React.FC = () => {
  const [isUserCreationLoading, setIsUserCreationLoading] = React.useState(false)
  const [signUpFormValidationErrors, setSignUpFormValidationErrors] = React.useState<SignUpFormValidationErrors>(null)

  const onSignUpFormSubmit = React.useCallback(async (formData: FormData) => {
    setIsUserCreationLoading(true)
    setSignUpFormValidationErrors(null)

    const credentials = {
      email: formData.get(AUTH_FORM_FIELDS.EMAIL) as string,
      name: formData.get(AUTH_FORM_FIELDS.NAME) as string,
      password: formData.get(AUTH_FORM_FIELDS.PASSWORD) as string
    }

    const signUpResponse = await AuthClient.emailSignUp(credentials)

    setIsUserCreationLoading(false)

    if (signUpResponse.status === OK_STATUS) {
      redirect(DEFAULT_ROUTE)
    }
  }, [])

  return (
    <Form onSubmit={onSignUpFormSubmit}>
      <UserEmailField />

      <UserNameField />

      <UserPasswordField />

      <Button type='submit'>
        {t(`auth.signUp.form.submit.${isUserCreationLoading ? 'creating' : 'label'}`)}
      </Button>
    </Form>
  )
}
