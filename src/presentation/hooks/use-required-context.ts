import { type Context, useContext } from 'react'

export const useRequiredContext = <T>(context: Context<T | null>, name?: string): T => {
  const currentContext = useContext(context)

  if (currentContext === null) {
    throw new Error(name ? `${name} provider context is missing` : 'Provider is missing')
  }

  return currentContext
}
