import { z } from 'zod'

export const SignUpRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().min(1, 'Name is required')
})
