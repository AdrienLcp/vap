import classNames from 'classnames'

import './field-set.sass'

type FieldSetProps = Omit<React.ComponentProps<'fieldset'>, 'disabled'> & {
  isDisabled?: boolean
}

export const FieldSet: React.FC<FieldSetProps> = ({ className, isDisabled, ...fieldSetRestProps }) => (
  <fieldset
    className={classNames('field-set', className)}
    disabled={isDisabled}
    {...fieldSetRestProps}
  />
)
