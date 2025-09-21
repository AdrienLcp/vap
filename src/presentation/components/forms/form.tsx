import { Form as ReactAriaForm, type FormProps as ReactAriaFormProps } from 'react-aria-components'

import './form.sass'

export class FormValues extends FormData {
  /**
   * Gets a string value from form data as a specific type (e.g. enum)
   * @template T Type to cast the string value to (typically an enum or string literal union)
   * @param key The key of the form field
   * @returns The typed string value
   */
  getAs<T extends string>(key: string): T {
    return this.getString(key) as T
  }

  /** Gets a boolean value from the form data */
  getBoolean(key: string): boolean {
    const value = this.get(key)
    return value === 'true' || value === 'on' || value === '1'
  }

  /** Gets a number value from the form data */
  getNumber(key: string): number {
    const value = this.get(key)
    return Number(value)
  }

  /**
   * Gets an optional string value from form data as a specific type
   * @template T Type to cast the string value to (typically an enum or string literal union)
   * @param key The key of the form field
   * @returns The typed string value or undefined if empty
   */
  getOptionalAs<T extends string>(key: string): T | undefined {
    const value = this.getOptionalString(key)
    return value as T | undefined
  }

  /** Gets an optional number value from the form data */
  getOptionalNumber(key: string): number | undefined {
    const value = this.get(key)

    if (!value || typeof value !== 'string' || value.trim() === '') {
      return undefined
    }

    const parsed = Number(value)
    return Number.isNaN(parsed) ? undefined : parsed
  }

  /** Gets an optional string value from the form data */
  getOptionalString(key: string): string | undefined {
    const value = this.get(key)
    return value && typeof value === 'string' && value.trim() !== '' ? value : undefined
  }

  /** Gets a string value from the form data */
  getString(key: string): string {
    return this.get(key) as string
  }
}

export type FormTarget = EventTarget & HTMLFormElement

export type FormProps = Omit<ReactAriaFormProps, 'onSubmit' | 'validationErrors'> & {
  hasResetAfterSubmit?: boolean
  onSubmit?: (formValues: FormValues, currentTarget: FormTarget) => void
  validationErrors?: ReactAriaFormProps['validationErrors'] | null
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, validationErrors, ...formRestProps }) => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (!onSubmit) {
      return
    }

    event.preventDefault()

    const currentTarget = event.currentTarget
    const formValues = new FormValues(currentTarget)

    onSubmit(formValues, currentTarget)
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
