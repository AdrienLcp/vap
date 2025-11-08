import classNames from 'classnames'
import { type LabelProps, Label as ReactAriaLabel } from 'react-aria-components'

import './label.sass'

export const Label: React.FC<LabelProps> = ({ children, className, ...labelRestProps }) => {
  if (!children) return null

  return (
    <ReactAriaLabel className={classNames('label', className)} {...labelRestProps}>
      {children}
    </ReactAriaLabel>
  )
}
