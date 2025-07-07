import type { ZodObject, ZodRawShape } from 'zod'

import { failure, success } from '@/helpers/result'

type ValidateParams<T extends ZodRawShape> = {
  data: unknown
  schema: ZodObject<T>
}

export const validate = <T extends ZodRawShape>({ data, schema }: ValidateParams<T>) => {
  const validation = schema.safeParse(data)

  if (validation.error) {
    return failure(validation.error)
  }

  return success(validation.data)
}
