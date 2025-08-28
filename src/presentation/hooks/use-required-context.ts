'use client'

import { useContext } from 'react'

export const useRequiredContext = <T>(context: React.Context<T | null>, name = 'A'): T => {
  const currentContext = useContext(context)

  if (currentContext === null) {
    throw new Error(`${name} context provider is missing`)
  }

  return currentContext
}
