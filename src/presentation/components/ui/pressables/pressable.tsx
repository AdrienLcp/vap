import type { ButtonRenderProps, LinkRenderProps } from 'react-aria-components'

import { reactAriaClassNames, type RenderPropsValues } from '@/presentation/utils/react-aria-utils'

import './pressable.sass'

export type DefaultChildrenProps = { defaultChildren: React.ReactNode | undefined }

export type PressableIconSide = 'left' | 'right'
export type PressableSize = 'medium' | 'small'

export type PressableVariant =
  | 'destructive'
  | 'filled'
  | 'outlined'
  | 'transparent'
  | 'underlined'

type PressableWithVariantProps = {
  /** Optional icon to display within the button. */
  Icon?: React.ReactElement

  /**
   * Determines the side of the button the icon should appear on. Defaults to 'left'.
   * @values 'left', 'right'
   * @default 'left'
   */
  iconSide?: PressableIconSide

  /**
   * Defines the size of the button.
   * @values 'medium', 'small'
   * @default 'medium'
   */
  size?: PressableSize

  /**
   * The visual style variant of the button.
   * @values 'filled', 'outlined', 'transparent', 'underlined',
   * @default 'outlined'
   */
  variant: PressableVariant
}

type PressableWithoutVariantProps = {
  Icon?: undefined
  iconSide?: undefined
  size?: undefined
  variant?: undefined
}

export type PressableProps = PressableWithVariantProps | PressableWithoutVariantProps

type PressableRenderProps =
  | ButtonRenderProps
  | LinkRenderProps

type PressableChildren <T extends PressableRenderProps> =
  | React.ReactNode
  | ((values: T & { defaultChildren: React.ReactNode | undefined }) => React.ReactNode)

export function reactAriaPressableClassNames <T extends PressableRenderProps> (
  values: RenderPropsValues<T>,
  className: string | ((values: RenderPropsValues<T>) => string) | undefined,
  variant: PressableProps['variant'],
  Icon: PressableProps['Icon'],
  iconSide: PressableProps['iconSide'] = 'left',
  size: PressableProps['size'],
  children?: PressableChildren<T>
) {
  const hasIcon = !!Icon
  const isIconButton = hasIcon && children == null
  const currentVariant: PressableProps['variant'] = variant == null && isIconButton ? 'transparent' : variant
  const currentSize: PressableProps['size'] = size === 'medium' ? undefined : size

  return reactAriaClassNames(
    values,
    className,
    'pressable',
    currentVariant,
    hasIcon && !isIconButton && `has-icon-on-${iconSide}`,
    isIconButton && 'is-icon-button',
    currentSize
  )
}
