import type z from 'zod'

import type { UserRoleSchema } from '@/features/user/domain/user-schemas'

export type UserRole = z.infer<typeof UserRoleSchema>
