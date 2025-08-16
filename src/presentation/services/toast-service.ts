'use client'

import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components'
import { flushSync } from 'react-dom'

type Toast = {
  description?: string
  Icon?: React.ReactElement
  title: string
  type?: 'error' | 'info' | 'success' | 'warning'
}

export const toastQueue = new ToastQueue<Toast>({
  wrapUpdate: (fn) => {
    if (!('startViewTransition' in document)) {
      fn()
      return
    }

    document.startViewTransition(() => {
      flushSync(fn)
    })
  }
})

type ToastOptions = Pick<Toast, 'description' | 'Icon'> & {
  duration?: number
}

const DEFAULT_DURATION = 3000

const error = (title: string, options?: ToastOptions) => {
  toastQueue.add({
    title,
    description: options?.description,
    Icon: options?.Icon,
    type: 'error'
  }, {
    timeout: options?.duration ?? DEFAULT_DURATION
  })
}

const info = (title: string, options?: ToastOptions) => {
  toastQueue.add({
    title,
    description: options?.description,
    Icon: options?.Icon,
    type: 'info'
  }, {
    timeout: options?.duration ?? DEFAULT_DURATION
  })
}

const success = (title: string, options?: ToastOptions) => {
  toastQueue.add({
    title,
    description: options?.description,
    Icon: options?.Icon,
    type: 'success'
  }, {
    timeout: options?.duration ?? DEFAULT_DURATION
  })
}

const warning = (title: string, options?: ToastOptions) => {
  toastQueue.add({
    title,
    description: options?.description,
    Icon: options?.Icon,
    type: 'warning'
  }, {
    timeout: options?.duration ?? DEFAULT_DURATION
  })
}

export const ToastService = {
  error,
  info,
  success,
  warning
}
