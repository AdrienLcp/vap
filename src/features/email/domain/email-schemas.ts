import { z } from 'zod'

const RECIPIENT_ROLES = ['ALL', 'USER', 'ADMIN', 'SUPER_ADMIN'] as const

export const BroadcastEmailSchema = z.object({
  body: z.string().min(1),
  recipientRole: z.enum(RECIPIENT_ROLES),
  subject: z.string().min(1).max(200)
})

export type BroadcastEmailData = z.infer<typeof BroadcastEmailSchema>

export type RecipientRole = BroadcastEmailData['recipientRole']
