import classNames from 'classnames'

import './card.sass'

export const Card: React.FC<React.ComponentProps<'div'>> = ({ className, ...cardRestProps }) => (
  <div {...cardRestProps} className={classNames('card', className)} />
)

export const CardBody: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...cardBodyRestProps
}) => <div {...cardBodyRestProps} className={classNames('card-body', className)} />

export const CardFooter: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...cardFooterRestProps
}) => <div {...cardFooterRestProps} className={classNames('card-footer', className)} />

export const CardTitle: React.FC<React.ComponentProps<'span'>> = ({
  className,
  ...cardLabelRestProps
}) => <span {...cardLabelRestProps} className={classNames('card-title', className)} />
