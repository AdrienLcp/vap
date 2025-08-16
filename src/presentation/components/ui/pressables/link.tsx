import { type LinkRenderProps, Link as ReactAriaLink, type LinkProps as ReactAriaLinkProps } from 'react-aria-components'

import { Tooltip, type TooltipProps } from '@/presentation/components/ui/tooltip'

import { type DefaultChildrenProps, type PressableProps, reactAriaPressableClassNames } from './pressable'

type LinkProps = PressableProps & ReactAriaLinkProps

type LinkRenderPropsValues = LinkRenderProps & DefaultChildrenProps

const renderLinkChildren = (children: LinkProps['children'], renderValues: LinkRenderPropsValues) => {
  return typeof children === 'function' ? children(renderValues) : children
}

export const BaseLink: React.FC<LinkProps> = ({
  children,
  className,
  Icon,
  iconSide,
  size,
  variant,
  ...linkRestProps
}) => (
  <ReactAriaLink
    className={(values) => reactAriaPressableClassNames(
      values,
      className,
      variant,
      Icon,
      iconSide,
      size,
      children
    )}
    {...linkRestProps}
  >
    {values => variant == null
      ? renderLinkChildren(children, values)
      : <>
          {Icon && (
            <div className='icon' role='presentation'>
              {Icon}
            </div>
          )}

          {children != null && (
            <div className='content'>
              {renderLinkChildren(children, values)}
            </div>
          )}
        </>
    }
  </ReactAriaLink>
)

type LinkWithTooltipProps = LinkProps & {
  tooltip?: TooltipProps['children']
}

export const Link: React.FC<LinkWithTooltipProps> = ({ tooltip, ...linkRestProps }) => {
  if (tooltip == null) {
    return <BaseLink {...linkRestProps} />
  }

  return (
    <Tooltip Trigger={<BaseLink {...linkRestProps} />}>
      {tooltip}
    </Tooltip>
  )
}
