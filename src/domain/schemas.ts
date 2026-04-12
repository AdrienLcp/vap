import { z } from 'zod'

export const PriceSchema = z.number().nonnegative()
