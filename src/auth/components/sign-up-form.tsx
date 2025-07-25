'use client'

import { AuthClient } from '@/auth/auth-client'
import { Form } from '@/presentation/components/forms/form'

const signUpFields = {
  email: 'email',
  name: 'name',
  password: 'password'
}

const onSubmit = async (formData: FormData) => {
  const credentials = {
    email: formData.get(signUpFields.email) as string,
    name: formData.get(signUpFields.name) as string,
    password: formData.get(signUpFields.password) as string
  }

  const signUpResult = await AuthClient.emailSignUp(credentials)

  if (signUpResult.status === 'ERROR') {
    console.error('Sign up error:', signUpResult.errors)
    return
  }

  console.log('Sign up success:', signUpResult.data)
}

export const SignUpForm: React.FC = () => (
  <Form onSubmit={onSubmit}>
    <label>
      Email:
      <input
        name={signUpFields.email}
        placeholder='jean-neige@gmail.com'
        type='text'
      />
    </label>

    <label>
      Name:
      <input
        name={signUpFields.name}
        placeholder='Jean Neige'
        type='text'
      />
    </label>

    <label>
      Password:
      <input
        name={signUpFields.password}
        placeholder='Password'
        type='password'
      />
    </label>

    <button type='submit'>
      Submit
    </button>
  </Form>
)
