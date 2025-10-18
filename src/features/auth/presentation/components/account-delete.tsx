import { UserRoundXIcon } from 'lucide-react'
import { Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components'

import { AccountDeleteForm } from '@/features/auth/presentation/components/forms/account-delete-form'
import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'

import './account-delete.sass'

export const AccountDelete: React.FC = () => (
  <DialogTrigger>
    <Button
      className='account-delete-button'
      Icon={<UserRoundXIcon aria-hidden />}
      variant='destructive'
    >
      {t('auth.profile.deleteAccount')}
    </Button>

    <ModalOverlay className='account-delete overlay' isDismissable>
      <Modal className='modal'>
        <Dialog className='dialog'>
          {({ close }) => <AccountDeleteForm onCloseButtonPress={close} />}
        </Dialog>
      </Modal>
    </ModalOverlay>
  </DialogTrigger>
)
