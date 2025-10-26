'use client'

import classNames from 'classnames'
import { CheckIcon, CircleXIcon } from 'lucide-react'
import {
  Text,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastRegion as ToastRegion
} from 'react-aria-components'

import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'
import { toastQueue } from '@/presentation/services/toast-service'
import type { Style } from '@/presentation/utils/styles-utils'

import './toaster.sass'

export const Toaster: React.FC = () => (
  <ToastRegion className='toaster' queue={toastQueue}>
    {({ toast }) => {
      const toastStyle: Style = {
        '--toast-view-transition-name': toast.key
      }

      return (
        <Toast className={classNames('toast', toast.content.type)} style={toastStyle} toast={toast}>
          <span aria-hidden className='icon'>
            {toast.content.Icon}
            <CheckIcon aria-hidden />
          </span>

          <ToastContent className='content'>
            <Text slot='title'>{toast.content.title}</Text>

            {toast.content.description && (
              <Text slot='description'>{toast.content.description}</Text>
            )}
          </ToastContent>

          <Button
            aria-label={t('components.toaster.closeButtonLabel')}
            className='close-button'
            slot='close'
          >
            <CircleXIcon aria-hidden />
          </Button>
        </Toast>
      )
    }}
  </ToastRegion>
)
