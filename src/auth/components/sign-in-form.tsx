'use client'

import { authApi } from '@/auth/auth-api'
import { SignInRequestSchema } from '@/auth/domain/auth-schema'
import { authClient } from '@/lib/auth-client'
import { validate } from '@/helpers/validation'
import { Form } from '@/presentation/components/forms/form'

const signInFields = {
  email: 'email',
  password: 'password'
}

export const SignInForm: React.FC = () => {
  const onSubmit = async (formData: FormData) => {
    const credentials = {
      email: formData.get(signInFields.email),
      password: formData.get(signInFields.password)
    }

    const signInValidation = validate({ data: credentials, schema: SignInRequestSchema })

    if (signInValidation.status === 'ERROR') {
      console.error('Sign in validation error:', signInValidation.errors)
      return
    }

    const signInResult = await authApi.emailSignIn(signInValidation.data)

    if (signInResult.status === 'ERROR') {
      console.error('Sign in error:', signInResult.errors)
      return
    }

    console.log('Sign in success:', signInResult.data)
  }

  return (
    <>
      <div>
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
      </div>

      <br />
      <br />
      <br />

      <div>
        <button onClick={() => authClient.signOut()}>
          logout
        </button>
      </div>
    </>
  )
}
