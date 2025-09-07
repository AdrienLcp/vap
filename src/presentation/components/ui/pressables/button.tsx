import { type ButtonRenderProps, Button as ReactAriaButton, type ButtonProps as ReactAriaButtonProps } from 'react-aria-components'

import { Spinner } from '@/presentation/components/ui/loaders/spinner'
import { Tooltip, type TooltipProps } from '@/presentation/components/ui/tooltip'

import { type PressableProps, reactAriaPressableClassNames } from './pressable'

export type ButtonProps = PressableProps & ReactAriaButtonProps

type ButtonRenderPropsValues = ButtonRenderProps & { defaultChildren: React.ReactNode | undefined }

const renderButtonChildren = (children: ButtonProps['children'], renderValues: ButtonRenderPropsValues) => {
  return typeof children === 'function' ? children(renderValues) : children
}

const renderButtonIcon = (Icon: ButtonProps['Icon'], variant: ButtonProps['variant'], isPending: boolean) => {
  if (Icon == null || variant == null) {
    return null
  }

  return (
    <div aria-hidden className='icon'>
      {isPending && Icon != null ? <Spinner /> : Icon}
    </div>
  )
}

const BaseButton: React.FC<ButtonProps> = ({
  children,
  className,
  Icon,
  iconSide,
  size,
  variant,
  ...buttonRestProps
}) => (
  <ReactAriaButton
    className={values => reactAriaPressableClassNames(
      values,
      className,
      variant,
      Icon,
      iconSide,
      size,
      children
    )}
    {...buttonRestProps}
  >
    {values => variant == null
      ? renderButtonChildren(children, values)
      : <>
          {renderButtonIcon(Icon, variant, values.isPending)}

          {children != null && renderButtonChildren(children, values)}
        </>
    }
  </ReactAriaButton>
)

type ButtonWithTooltipProps = ButtonProps & {
  tooltip?: TooltipProps['children']
}

export const Button: React.FC<ButtonWithTooltipProps> = ({ tooltip, ...buttonRestProps }) => {
  if (tooltip == null) {
    return <BaseButton {...buttonRestProps} />
  }

  return (
    <Tooltip Trigger={<BaseButton {...buttonRestProps} />}>
      {tooltip}
    </Tooltip>
  )
}
