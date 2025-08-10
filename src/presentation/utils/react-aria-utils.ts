import classNames from 'classnames'
import type { ButtonRenderProps, FieldErrorRenderProps, LinkRenderProps, TextFieldRenderProps } from 'react-aria-components'

export type ReactAriaComponentRenderProps =
  | ButtonRenderProps
  | FieldErrorRenderProps
  | LinkRenderProps
  | TextFieldRenderProps

export type RenderPropsValues <T extends ReactAriaComponentRenderProps> = T & {
  defaultClassName: string | undefined
}

export type ReactAriaClassName <T extends ReactAriaComponentRenderProps> =
  | string
  | ((values: RenderPropsValues<T>) => string)
  | undefined

export const reactAriaClassNames = <T extends ReactAriaComponentRenderProps> (
  values: RenderPropsValues<T>,
  className: ReactAriaClassName<T>,
  ...baseClassName: classNames.ArgumentArray
) => {
  const classNameOverride = typeof className === 'function'
    ? className(values)
    : className

  return classNames(...baseClassName, classNameOverride)
}

export type GlobalFormErrors = 'form'
export type ValidationErrors <T extends string = string> = Partial<Record<T, string | string[]>>

type ReactAriaComponentChildrenValues <T extends ReactAriaComponentRenderProps> = T & { defaultChildren: React.ReactNode | undefined }

type ReactAriaComponentChildren <T extends ReactAriaComponentRenderProps> =
  | ((values: ReactAriaComponentChildrenValues<T>) => React.ReactNode)
  | React.ReactNode

export const renderReactAriaChildren = <T extends ReactAriaComponentRenderProps> (
  children: ReactAriaComponentChildren<T>,
  values: ReactAriaComponentChildrenValues<T>
) => {
  return typeof children === 'function'
    ? children(values)
    : children
}
