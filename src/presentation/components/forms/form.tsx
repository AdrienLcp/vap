import { useCallback } from 'react'
import {
  Form as ReactAriaForm,
  type FormProps as ReactAriaFormProps
} from 'react-aria-components'

import './form.sass'

export type FormTarget = EventTarget & HTMLFormElement

export type FormProps = Omit<
  ReactAriaFormProps,
  'onSubmit' | 'validationErrors'
> & {
  hasResetAfterSubmit?: boolean
  onSubmit?: (formData: FormData, currentTarget: FormTarget) => void
  validationErrors?: ReactAriaFormProps['validationErrors'] | null
}

export const Form: React.FC<FormProps> = ({
  children,
  hasResetAfterSubmit,
  onSubmit,
  validationErrors,
  ...formRestProps
}) => {
  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (!onSubmit) {
        return
      }

      event.preventDefault()

      const currentTarget = event.currentTarget
      const formData = new FormData(currentTarget)

      onSubmit(formData, currentTarget)

      if (hasResetAfterSubmit) {
        currentTarget.reset()
      }
    },
    [hasResetAfterSubmit, onSubmit]
  )

  return (
    <ReactAriaForm
      className='form'
      onSubmit={onSubmit && onSubmitHandler}
      validationErrors={validationErrors ?? undefined}
      {...formRestProps}
    >
      {children}
    </ReactAriaForm>
  )
}
