type FormProps = Omit<React.ComponentProps<'form'>, 'onSubmit'> & {
  onSubmit?: (data: FormData) => void
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, ...formProps }) => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (!onSubmit) {
      return
    }

    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSubmit(formData)
  }

  return (
    <form onSubmit={onSubmitHandler} {...formProps}>
      {children}
    </form>
  )
}
