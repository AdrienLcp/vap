'use client'

import { authApi } from '@/auth/client/auth-api'
import { authClient } from '@/auth/lib/auth-client'

export const SignUpForm = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const result = await authApi.signUpEmail({ name, email, password })
    console.log('result', result)
  }

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor='email'>
            Email:
            <input name='email' id='email' placeholder='email' type='text' />
          </label>

          <label htmlFor='name'>
            Name:
            <input name='name' id='name' placeholder='name' type='text' />
          </label>

          <label htmlFor='password'>
            Password:
            <input name='password' id='password' placeholder='password' type='password' />
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
