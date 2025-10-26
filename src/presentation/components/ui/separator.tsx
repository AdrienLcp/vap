import classNames from 'classnames'
import {
  Separator as ReactAriaSeparator,
  type SeparatorProps as ReactAriaSeparatorProps
} from 'react-aria-components'

import './separator.sass'

type SeparatorProps = ReactAriaSeparatorProps & {
  size?: string
}

export const Separator: React.FC<SeparatorProps> = ({
  className,
  size,
  style,
  ...separatorRestProps
}) => {
  const separatorVariables = size ? { '--separator-size': size } : null

  const separatorStyle = {
    ...separatorVariables,
    ...style
  }

  return (
    <ReactAriaSeparator
      className={classNames('separator', className)}
      style={separatorStyle}
      {...separatorRestProps}
    />
  )
}
