import { EmailLayout } from '@/features/email/presentation/templates/email-layout'
import {
  EmailText,
  EmailTitle
} from '@/features/email/presentation/templates/email-primitives'

type BroadcastEmailProps = {
  body: string
  subject: string
}

export const BroadcastEmail: React.FC<BroadcastEmailProps> = ({
  body,
  subject
}) => (
  <EmailLayout preview={subject}>
    <EmailTitle>{subject}</EmailTitle>
    {body.split('\n').map((paragraph) => (
      <EmailText key={paragraph}>{paragraph || '\u00A0'}</EmailText>
    ))}
  </EmailLayout>
)
