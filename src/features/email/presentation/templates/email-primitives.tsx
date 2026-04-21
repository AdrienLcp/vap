import { Link, Text } from 'react-email'

import {
  dangerButtonStyle,
  hintStyle,
  primaryButtonStyle,
  textStyle,
  titleStyle
} from '@/features/email/presentation/templates/email-styles'

type EmailTitleProps = {
  children: React.ReactNode
}

export const EmailTitle: React.FC<EmailTitleProps> = ({ children }) => (
  <Text style={titleStyle}>{children}</Text>
)

type EmailTextProps = {
  children: React.ReactNode
}

export const EmailText: React.FC<EmailTextProps> = ({ children }) => (
  <Text style={textStyle}>{children}</Text>
)

type EmailHintProps = {
  children: React.ReactNode
}

export const EmailHint: React.FC<EmailHintProps> = ({ children }) => (
  <Text style={hintStyle}>{children}</Text>
)

type EmailButtonProps = {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'danger'
}

export const EmailButton: React.FC<EmailButtonProps> = ({
  children,
  href,
  variant = 'primary'
}) => (
  <Link
    href={href}
    style={variant === 'danger' ? dangerButtonStyle : primaryButtonStyle}
  >
    {children}
  </Link>
)
