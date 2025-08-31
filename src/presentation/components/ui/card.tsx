import classNames from 'classnames'

import './card.sass'

export const Card: React.FC<React.ComponentProps<'div'>> = ({ children, className, ...cardRestProps }) => (
  <div {...cardRestProps} className={classNames('card', className)}>
    {children}
  </div>
)

export const CardBody: React.FC<React.ComponentProps<'div'>> = ({ children, className, ...cardBodyRestProps }) => (
  <div {...cardBodyRestProps} className={classNames('card-body', className)}>
    {children}
  </div>
)

export const CardFooter: React.FC<React.ComponentProps<'div'>> = ({ children, className, ...cardFooterRestProps }) => (
  <div {...cardFooterRestProps} className={classNames('card-footer', className)}>
    {children}
  </div>
)

export const CardTitle: React.FC<React.ComponentProps<'span'>> = ({ children, className, ...cardLabelRestProps }) => (
  <span {...cardLabelRestProps} className={classNames('card-title', className)}>
    {children}
  </span>
)
