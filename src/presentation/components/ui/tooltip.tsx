import {
  Tooltip as ReactAriaTooltip,
  type TooltipProps as ReactAriaTooltipProps,
  TooltipTrigger as ReactAriaTooltipTrigger
} from 'react-aria-components'

import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './tooltip.sass'

export type TooltipProps = Omit<
  ReactAriaTooltipProps,
  'children' | 'className'
> & {
  children: React.ReactNode
  className?: string
  Content: React.ReactNode
  delay?: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  className,
  Content,
  delay = 150,
  offset = 8,
  ...tooltipRestProps
}) => (
  <ReactAriaTooltipTrigger delay={delay}>
    {children}

    <ReactAriaTooltip
      className={(values) => reactAriaClassNames(values, className, 'tooltip')}
      offset={offset}
      {...tooltipRestProps}
    >
      {Content}
    </ReactAriaTooltip>
  </ReactAriaTooltipTrigger>
)
