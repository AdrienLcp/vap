import classNames from 'classnames'
import type {
  ButtonRenderProps,
  DisclosureRenderProps,
  FieldErrorRenderProps,
  GridListRenderProps,
  LinkRenderProps,
  ListBoxItemRenderProps,
  MenuItemRenderProps,
  NumberFieldRenderProps,
  SearchFieldRenderProps,
  SelectRenderProps,
  SliderRenderProps,
  StyleRenderProps,
  SwitchRenderProps,
  TextFieldRenderProps,
  TooltipRenderProps
} from 'react-aria-components'

export type ReactAriaComponentRenderProps =
  | ButtonRenderProps
  | DisclosureRenderProps
  | FieldErrorRenderProps
  | GridListRenderProps
  | LinkRenderProps
  | ListBoxItemRenderProps
  | MenuItemRenderProps
  | NumberFieldRenderProps
  | SearchFieldRenderProps
  | SelectRenderProps
  | SliderRenderProps
  | SwitchRenderProps
  | TextFieldRenderProps
  | TooltipRenderProps

export type RenderPropsValues<T extends ReactAriaComponentRenderProps> = T & {
  defaultClassName: string | undefined
}

export type ClassNameOrFunction<T> = StyleRenderProps<T>['className']

export const reactAriaClassNames = <T extends ReactAriaComponentRenderProps>(
  values: RenderPropsValues<T>,
  className: ClassNameOrFunction<T>,
  ...baseClassName: classNames.ArgumentArray
) => {
  const classNameOverride =
    typeof className === 'function' ? className(values) : className
  return classNames(...baseClassName, classNameOverride)
}

type ReactAriaComponentChildrenValues<T extends ReactAriaComponentRenderProps> =
  T & {
    defaultChildren: React.ReactNode | undefined
  }

type ReactAriaComponentChildren<T extends ReactAriaComponentRenderProps> =
  | ((values: ReactAriaComponentChildrenValues<T>) => React.ReactNode)
  | React.ReactNode

export const renderReactAriaChildren = <
  T extends ReactAriaComponentRenderProps
>(
  children: ReactAriaComponentChildren<T>,
  values: ReactAriaComponentChildrenValues<T>
) => {
  return typeof children === 'function' ? children(values) : children
}
