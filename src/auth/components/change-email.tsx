'use client'

import { AuthClient } from '@/auth/auth-client'
import { Form } from '@/presentation/components/forms/form'

const changeEmailFormFields = {
  newEmail: 'new-email'
}

const onChangeEmailFormSubmit = async (formData: FormData): Promise<void> => {
  const newEmail = formData.get(changeEmailFormFields.newEmail) as string

  const changeEmailResult = await AuthClient.changeEmail(newEmail)

  if (changeEmailResult.status === 'ERROR') {
    console.error('Failed to change email:', changeEmailResult.errors)
    return
  }

  console.log('Email changed successfully')
}

export const ChangeEmail: React.FC = () => (
  <Form onSubmit={onChangeEmailFormSubmit}>
    <label>
      Nouveau email:
      <input
        type='email'
        name={changeEmailFormFields.newEmail}
        required
        style={{ minWidth: 100 }}
      />
    </label>

    <button type='submit'>Changer email</button>
  </Form>
)
