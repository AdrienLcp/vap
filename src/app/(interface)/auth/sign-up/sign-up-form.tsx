'use client'

import { signUp } from '@/lib/auth-client'

export const SignUpForm = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    console.log({ email, password })

    signUp.email({ 
      email,
      password,
      name
    }, {
      onError: console.error,
      onSuccess: console.log
    })
  }

  return (
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
  )
}
