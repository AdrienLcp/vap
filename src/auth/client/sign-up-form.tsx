'use client'

import { authApi } from '@/auth/client/auth-api'
import { authClient } from '@/auth/lib/auth-client'

const signUpFields = {
  email: 'email',
  name: 'name',
  password: 'password'
}

export const SignUpForm: React.FC = () => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);

    const email = formData.get(signUpFields.email) as string;
    const name = formData.get(signUpFields.name) as string;
    const password = formData.get(signUpFields.password) as string;
    
    const signUpResult = await authApi.emailSignUp({ name, email, password })

    if (signUpResult.status === 'ERROR') {
      console.error('Sign up error:', signUpResult.errors)
      return
    }

    console.log('Sign up success:', signUpResult.data)
  }

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
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
