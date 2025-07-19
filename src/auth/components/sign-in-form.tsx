'use client'

import { AuthClient } from '@/auth/auth-client'
import { Form } from '@/presentation/components/forms/form'

const signInFields = {
  email: 'email',
  password: 'password'
}

const onSubmit = async (formData: FormData) => {
  const credentials = {
    email: formData.get(signInFields.email) as string,
    password: formData.get(signInFields.password) as string
  }

  const signInResult = await AuthClient.emailSignIn(credentials)

  if (signInResult.status === 'ERROR') {
    console.error('Sign in error:', signInResult.errors)
    return
  }

  console.log('Sign in success:', signInResult.data)
}

export const SignInForm: React.FC = () => (
  <Form onSubmit={onSubmit}>
    <label>
      Email:
      <input
        name={signInFields.email}
        placeholder='jean-neige@gmail.com'
        type='text'
      />
    </label>

    <label>
      Password:
      <input
        name={signInFields.password}
        placeholder='Password'
        type='password'
      />
    </label>

    <button type='submit'>
      Submit
    </button>
  </Form>
)
