import classNames from 'classnames'
import { Separator as ReactAriaSeparator, type SeparatorProps } from 'react-aria-components'

import './separator.sass'

export const Separator: React.FC<SeparatorProps> = ({ className, ...separatorRestProps }) => (
  <ReactAriaSeparator className={classNames('separator', className)} {...separatorRestProps} />
)
