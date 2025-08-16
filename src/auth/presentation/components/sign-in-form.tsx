'use client'

import { redirect } from 'next/navigation'
import React from 'react'

import { AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import { AuthClient } from '@/auth/infrastructure/auth-client'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { Form } from '@/presentation/components/forms/form'
import type { ValidationErrors } from '@/presentation/utils/react-aria-utils'
import { UserEmailField } from '@/user/presentation/user-email-field'
import type { ValueOf } from '@/utils/object-utils'
import { UserPasswordField } from '@/user/presentation/user-password-field'
import { Button } from '@/presentation/components/ui/pressables/button'

const onSignInFormSubmit = async (formData: FormData) => {
  const credentials = {
    email: String(formData.get(AUTH_FORM_FIELDS.EMAIL)),
    password: String(formData.get(AUTH_FORM_FIELDS.PASSWORD))
  }

  const signInResponse = await AuthClient.emailSignIn(credentials)

  if (signInResponse.status === OK_STATUS) {
    redirect(DEFAULT_ROUTE)
  }
}

type SignInFormErrors = ValidationErrors<ValueOf<typeof AUTH_FORM_FIELDS>>

export const SignInForm: React.FC = () => {
  const [isUserAuthenticationLoading, setIsUserAuthenticationLoading] = React.useState(false)
  const [signInFormErrors, setSignInFormErrors] = React.useState<SignInFormErrors>(null)

  return (
    <Form onSubmit={onSignInFormSubmit}>
      <UserEmailField />

      <UserPasswordField />

      <Button variant='filled' type='submit'>
        Submit
      </Button>
    </Form>
  )
}
