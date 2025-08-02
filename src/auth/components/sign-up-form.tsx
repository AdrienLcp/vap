'use client'

import { redirect } from 'next/navigation'

import { AuthClient } from '@/auth/auth-client'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { Form } from '@/presentation/components/forms/form'

const signUpFields = {
  email: 'email',
  name: 'name',
  password: 'password'
}

const onSubmit = async (formData: FormData) => {
  const credentials = {
    email: String(formData.get(signUpFields.email)),
    name: String(formData.get(signUpFields.name)),
    password: String(formData.get(signUpFields.password))
  }

  const signUpResult = await AuthClient.emailSignUp(credentials)

  if (signUpResult.status === 'ERROR') {
    console.error('Sign up error:', signUpResult.errors)
    return
  }

  console.log('Sign up success:', signUpResult.data)
  redirect(DEFAULT_ROUTE)
}

export const SignUpForm: React.FC = () => (
  <Form onSubmit={onSubmit}>
    <label>
      Email:
      <input
        name={signUpFields.email}
        placeholder='jean-neige@gmail.com'
        required
        type='text'
      />
    </label>

    <label>
      Name:
      <input
        name={signUpFields.name}
        placeholder='Jean Neige'
        required
        type='text'
      />
    </label>

    <label>
      Password:
      <input
        name={signUpFields.password}
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
