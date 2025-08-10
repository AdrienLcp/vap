import { Form as ReactAriaForm, type FormProps as ReactAriaFormProps } from 'react-aria-components'

export type FormTarget = EventTarget & HTMLFormElement

export type FormProps = Omit<ReactAriaFormProps, 'onSubmit'> & {
  hasResetAfterSubmit?: boolean
  onSubmit?: (data: FormData, currentTarget: FormTarget) => void
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, ...formRestProps }) => {
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
    <ReactAriaForm onSubmit={onSubmit && onSubmitHandler} {...formRestProps}>
      {children}
    </ReactAriaForm>
  )
}
