import { z } from 'zod'

export const createRequiredEnvString = (variableName: string) => {
  return z.string().min(1, `${variableName} is required`)
}
