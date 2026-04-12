import { Text } from '@react-email/components'

import { EmailLayout } from '@/features/email/presentation/templates/email-layout'

type BroadcastEmailProps = {
  body: string
  subject: string
}

export const BroadcastEmail: React.FC<BroadcastEmailProps> = ({
  body,
  subject
}) => (
  <EmailLayout preview={subject}>
    <Text style={titleStyle}>{subject}</Text>
    {body.split('\n').map((paragraph) => (
      <Text key={paragraph} style={textStyle}>
        {paragraph || '\u00A0'}
      </Text>
    ))}
  </EmailLayout>
)

const titleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: '1.4',
  margin: '0 0 16px'
}

const textStyle: React.CSSProperties = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 4px'
}
