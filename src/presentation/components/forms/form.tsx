import { Form as ReactAriaForm, type FormProps as ReactAriaFormProps } from 'react-aria-components'

import './form.sass'

export type FormTarget = EventTarget & HTMLFormElement

export type FormProps = Omit<ReactAriaFormProps, 'onSubmit' | 'validationErrors'> & {
  hasResetAfterSubmit?: boolean
  onSubmit?: (data: FormData, currentTarget: FormTarget) => void
  validationErrors?: ReactAriaFormProps['validationErrors'] | null
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, validationErrors, ...formRestProps }) => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (!onSubmit) {
      return
    }

    event.preventDefault()

    const currentTarget = event.currentTarget
    const formData = new FormData(currentTarget)

    onSubmit(formData, currentTarget)
  }

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
