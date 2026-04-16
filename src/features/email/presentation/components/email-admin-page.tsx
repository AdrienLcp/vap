'use client'

import { MailIcon, SendIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import type { Key } from 'react-aria-components'

import type { RecipientRole } from '@/features/email/domain/email-schemas'
import { EmailClient } from '@/features/email/infrastructure/email-client'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import type { SelectItem } from '@/presentation/components/forms/select'
import { Select } from '@/presentation/components/forms/select'
import { TextArea } from '@/presentation/components/forms/text-area'
import { TextField } from '@/presentation/components/forms/text-field'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'

import './email-admin-page.sass'

const recipientItems: SelectItem[] = [
  { id: 'ALL', textValue: t('email.admin.recipients.all') },
  { id: 'USER', textValue: t('email.admin.recipients.users') },
  { id: 'ADMIN', textValue: t('email.admin.recipients.admins') },
  { id: 'SUPER_ADMIN', textValue: t('email.admin.recipients.superAdmins') }
]

export const EmailAdminPage: React.FC = () => {
  const [isSending, setIsSending] = useState(false)
  const [recipientRole, setRecipientRole] = useState<RecipientRole>('ALL')

  const onRecipientChange = useCallback((key: Key | null) => {
    if (key != null) {
      setRecipientRole(String(key) as RecipientRole)
    }
  }, [])

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const subject = formData.get('subject') as string
      const body = formData.get('body') as string

      if (!subject || !body) {
        return
      }

      setIsSending(true)

      const response = await EmailClient.sendBroadcastEmail({
        body,
        recipientRole,
        subject
      })

      setIsSending(false)

      if (response.status !== OK_STATUS) {
        ToastService.error(t('email.admin.sendError'))
        return
      }

      ToastService.success(
        t('email.admin.sendSuccess', { count: response.data.sentCount })
      )
    },
    [recipientRole]
  )

  return (
    <main className='email-admin-page'>
      <h1>
        <MailIcon aria-hidden />
        {t('email.admin.title')}
      </h1>

      <Form hasResetAfterSubmit onSubmit={onSubmit}>
        <FieldSet isDisabled={isSending}>
          <Select
            items={recipientItems}
            label={t('email.admin.recipientsLabel')}
            onChange={onRecipientChange}
            value={recipientRole}
          />

          <TextField
            isRequired
            label={t('email.admin.subjectLabel')}
            maxLength={200}
            name='subject'
          />

          <TextArea isRequired label={t('email.admin.bodyLabel')} name='body' />
        </FieldSet>

        <SubmitButton Icon={<SendIcon aria-hidden />} isPending={isSending}>
          {t('email.admin.sendButton')}
        </SubmitButton>
      </Form>
    </main>
  )
}
