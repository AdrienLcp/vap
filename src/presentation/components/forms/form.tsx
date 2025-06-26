import type { ComponentProps, FormEvent } from 'react'

type FormProps<T> = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  onSubmit?: (data: T) => void
}

export function Form <T>({ children, onSubmit, ...formProps }: FormProps<T>) {
  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (onSubmit) {
      const formData: FormData = new FormData(event.currentTarget)
      const formEntries = formData.entries()
      const data = Object.fromEntries(formEntries)

      onSubmit(data as T)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} {...formProps}>
      {children}
    </form>
  )
}
