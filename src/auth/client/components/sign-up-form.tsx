'use client'

import { authApi } from '@/auth/client/auth-api'
import { SignUpRequestSchema } from '@/auth/domain/auth-schema'
import { authClient } from '@/auth/lib/auth-client'
import { Form } from '@/presentation/components/forms/form'

const signUpFields = {
  email: 'email',
  name: 'name',
  password: 'password'
}

export const SignUpForm: React.FC = () => {
  const onSubmit = async (formData: FormData) => {
    const email = formData.get(signUpFields.email)
    const name = formData.get(signUpFields.name)
    const password = formData.get(signUpFields.password)

    const signUpValidation = SignUpRequestSchema.safeParse({ email, name, password })

    if (signUpValidation.error) {
      console.error('Sign up validation error:', signUpValidation.error)
      return
    }

    const signUpResult = await authApi.emailSignUp(signUpValidation.data)

    if (signUpResult.status === 'ERROR') {
      console.error('Sign up error:', signUpResult.errors)
      return
    }

    console.log('Sign up success:', signUpResult.data)
  }

  return (
    <>
      <div>
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
