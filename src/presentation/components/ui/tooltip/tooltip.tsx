import {
  Tooltip as ReactAriaTooltip,
  type TooltipProps as ReactAriaTooltipProps,
  TooltipTrigger,
  type TooltipTriggerComponentProps
} from 'react-aria-components'

import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './tooltip.sass'

export type TooltipProps = ReactAriaTooltipProps & {
  delay?: TooltipTriggerComponentProps['delay']
  Trigger: React.ReactElement
}

export const Tooltip: React.FC<TooltipProps> = ({ className, delay = 500, offset = 8, Trigger, ...tooltipProps }) => (
  <TooltipTrigger delay={delay}>
    {Trigger}

    <ReactAriaTooltip
      className={(values) => reactAriaClassNames(values, className, 'tooltip')}
      offset={offset}
      {...tooltipProps}
    />
  </TooltipTrigger>
)
