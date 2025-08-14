'use client'

import { AuthClient } from '@/auth/infrastructure/auth-client'
import { Form } from '@/presentation/components/forms/form'

const changeEmailFormFields = {
  newEmail: 'new-email'
}

const onChangeEmailFormSubmit = async (formData: FormData): Promise<void> => {
  const newEmail = formData.get(changeEmailFormFields.newEmail) as string

  const changeEmailResponse = await AuthClient.changeEmail(newEmail)

  console.log(changeEmailResponse)
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
