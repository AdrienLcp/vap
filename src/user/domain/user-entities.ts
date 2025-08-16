import type z from 'zod'

import type { UserRoleSchema } from '@/user/domain/user-schemas'

export type UserRole = z.infer<typeof UserRoleSchema>
