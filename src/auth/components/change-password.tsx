'use client'

import { AuthClient } from '@/auth/auth-client'
import { Form } from '@/presentation/components/forms/form'

const changePasswordFormFields = {
  currentPassword: 'current-password',
  newPassword: 'new-password'
}

const onChangePasswordFormSubmit = async (formData: FormData) => {
  const changePasswordInfo = {
    currentPassword: formData.get(changePasswordFormFields.currentPassword) as string,
    newPassword: formData.get(changePasswordFormFields.newPassword) as string
  }

  const changePasswordResult = await AuthClient.changePassword(changePasswordInfo)

  if (changePasswordResult.status === 'ERROR') {
    console.error('Change password error:', changePasswordResult.errors)
    return
  }

  console.log('Change password successful')
}

export const ChangePassword: React.FC = () => (
  <Form onSubmit={onChangePasswordFormSubmit}>
    <label>
      Ancien mot de passe

      <input
        name={changePasswordFormFields.currentPassword}
        required
        type='password'
        style={{ minWidth: 100 }}
      />
    </label>

    <label>
      Nouveau mot de passe

      <input
        name={changePasswordFormFields.newPassword}
        required
        type='password'
        style={{ minWidth: 100 }}
      />
    </label>

    <button type='submit'>Changer le mot de passe</button>
  </Form>
)
