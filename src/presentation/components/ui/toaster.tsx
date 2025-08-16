'use client'

import { CircleXIcon } from 'lucide-react'
import {
  Text,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastRegion as ToastRegion
} from 'react-aria-components'

import { Button } from '@/presentation/components/ui/pressables/button'
import { toastQueue } from '@/presentation/services/toast-service'

export const Toaster: React.FC = () => (
  <ToastRegion queue={toastQueue}>
    {({ toast }) => (
      <Toast
        className='toast'
        style={{ viewTransitionName: toast.key }}
        toast={toast}
      >
        {toast.content.Icon}

        <ToastContent className='content'>
          <Text slot='title'>{toast.content.title}</Text>

          {toast.content.description && <Text slot='description'>{toast.content.description}</Text>}
        </ToastContent>

        <Button slot='close'>
          <CircleXIcon />
        </Button>
      </Toast>
    )}
  </ToastRegion>
)
