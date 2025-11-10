import classNames from 'classnames'

import './auth-wrapper.sass'

type AuthWrapperProps = React.PropsWithChildren & {
  className?: string
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, className }) => (
  <main className={classNames('auth-wrapper', className)}>{children}</main>
)
