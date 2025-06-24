'use client'

import { authApi } from '@/auth/client/auth-api'
import { authClient } from '@/auth/lib/auth-client'

const signInFields = {
  email: 'email',
  password: 'password'
}

export const SignInForm: React.FC = () => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);

    const email = formData.get(signInFields.email) as string;
    const password = formData.get(signInFields.password) as string;
    
    const signInResult = await authApi.emailSignIn({ email, password })

    if (signInResult.status === 'ERROR') {
      console.error('Sign in error:', signInResult.errors)
      return
    }

    console.log('Sign in success:', signInResult.data)
  }

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
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
        </form>
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
