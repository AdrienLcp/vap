'use client'

import { authApi } from '@/auth/client/auth-api'
import type { SignUpInfo } from '@/auth/domain/auth-entities'
import { authClient } from '@/auth/lib/auth-client'
import { Form } from '@/presentation/components/forms/form'

const signUpFields = {
  email: 'email',
  name: 'name',
  password: 'password'
}

export const SignUpForm: React.FC = () => {
  const onSubmit = async (signUpInfo: SignUpInfo) => {
    const signUpResult = await authApi.emailSignUp(signUpInfo)

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
          <label htmlFor={signUpFields.email}>
            Email:
            <input
              id={signUpFields.email}
              name={signUpFields.email}
              placeholder='jean-neige@gmail.com'
              type='text'
            />
          </label>

          <label htmlFor={signUpFields.name}>
            Name:
            <input
              id={signUpFields.name}
              name={signUpFields.name}
              placeholder='Jean Neige'
              type='text'
            />
          </label>

          <label htmlFor={signUpFields.password}>
            Password:
            <input
              id={signUpFields.password}
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
