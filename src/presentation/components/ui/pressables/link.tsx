import { type LinkRenderProps, Link as ReactAriaLink, type LinkProps as ReactAriaLinkProps } from 'react-aria-components'

import { type DefaultChildrenProps, type PressableProps, reactAriaPressableClassNames } from './pressable'

type LinkProps = PressableProps & ReactAriaLinkProps

type LinkRenderPropsValues = LinkRenderProps & DefaultChildrenProps

const renderLinkChildren = (children: LinkProps['children'], renderValues: LinkRenderPropsValues) => {
  return typeof children === 'function' ? children(renderValues) : children
}

export const Link: React.FC<LinkProps> = ({
  children,
  className,
  Icon,
  iconSide,
  size,
  variant,
  ...linkProps
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
    {...linkProps}
  >
    {(values) => variant == null
      ? renderLinkChildren(children, values)
      : <>
          {Icon && (
            <div className='pressable-icon' role='presentation'>
              {Icon}
            </div>
          )}

          {children != null && (
            <div className='pressable-content'>
              {renderLinkChildren(children, values)}
            </div>
          )}
        </>
    }
  </ReactAriaLink>
)
