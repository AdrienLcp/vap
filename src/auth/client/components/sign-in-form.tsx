'use client'

import { authApi } from '@/auth/client/auth-api'
import { SignInRequestSchema } from '@/auth/domain/auth-schema'
import { authClient } from '@/auth/lib/auth-client'
import { Form } from '@/presentation/components/forms/form'

const signInFields = {
  email: 'email',
  password: 'password'
}

export const SignInForm: React.FC = () => {
  const onSubmit = async (formData: FormData) => {
    const email = formData.get(signInFields.email)
    const password = formData.get(signInFields.password)

    const signInValidation = SignInRequestSchema.safeParse({ email, password })

    if (signInValidation.error) {
      console.error('Sign in validation error:', signInValidation.error)
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
          <label htmlFor={signInFields.email}>
            Email:
            <input
              id={signInFields.email}
              name={signInFields.email}
              placeholder='jean-neige@gmail.com'
              type='text'
            />
          </label>

          <label htmlFor={signInFields.password}>
            Password:
            <input
              id={signInFields.password}
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
