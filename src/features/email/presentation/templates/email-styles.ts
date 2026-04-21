export const emailColors = {
  background: '#f6f9fc',
  border: '#f0f0f0',
  borderSoft: '#e6ebf1',
  buttonDanger: '#c0392b',
  buttonForeground: '#ffffff',
  buttonPrimary: '#1a1a1a',
  surface: '#ffffff',
  text: '#525f7f',
  textMuted: '#8898aa',
  textStrong: '#1a1a1a'
} as const

export const emailFontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif'

export const bodyStyle: React.CSSProperties = {
  backgroundColor: emailColors.background,
  fontFamily: emailFontFamily
}

export const containerStyle: React.CSSProperties = {
  backgroundColor: emailColors.surface,
  border: `1px solid ${emailColors.border}`,
  borderRadius: '8px',
  margin: '40px auto',
  maxWidth: '560px',
  padding: '32px'
}

export const headerStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  margin: '0 0 24px'
}

export const titleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: '1.4',
  margin: '0 0 16px'
}

export const textStyle: React.CSSProperties = {
  color: emailColors.text,
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 12px'
}

export const hintStyle: React.CSSProperties = {
  color: emailColors.textMuted,
  fontSize: '13px',
  lineHeight: '1.5',
  marginTop: '16px'
}

export const footerStyle: React.CSSProperties = {
  color: emailColors.textMuted,
  fontSize: '12px',
  lineHeight: '16px'
}

export const hrStyle: React.CSSProperties = {
  borderColor: emailColors.borderSoft,
  margin: '24px 0'
}

const baseButtonStyle: React.CSSProperties = {
  borderRadius: '6px',
  color: emailColors.buttonForeground,
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 600,
  padding: '12px 24px',
  textDecoration: 'none'
}

export const primaryButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: emailColors.buttonPrimary
}

export const dangerButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: emailColors.buttonDanger
}
