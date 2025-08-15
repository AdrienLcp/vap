'use client'

import { redirect } from 'next/navigation'

import { AuthClient } from '@/auth/infrastructure/auth-client'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { Form } from '@/presentation/components/forms/form'

const signInFields = {
  email: 'email',
  password: 'password'
}

const onSubmit = async (formData: FormData) => {
  const credentials = {
    email: String(formData.get(signInFields.email)),
    password: String(formData.get(signInFields.password))
  }

  const signInResponse = await AuthClient.emailSignIn(credentials)

  if (signInResponse.status === OK_STATUS) {
    redirect(DEFAULT_ROUTE)
  }
}

export const SignInForm: React.FC = () => (
  <Form onSubmit={onSubmit}>
    <label>
      Email:
      <input
        name={signInFields.email}
        placeholder='jean-neige@gmail.com'
        required
        type='text'
      />
    </label>

    <label>
      Password:
      <input
        name={signInFields.password}
        placeholder='Password'
        required
        type='password'
      />
    </label>

    <button type='submit'>
      Submit
    </button>
  </Form>
)
