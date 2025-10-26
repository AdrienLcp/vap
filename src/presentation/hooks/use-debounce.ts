import { useEffect, useState } from 'react'

/**
 * Custom hook that returns a debounced value after a specified delay.
 * Useful for reducing the frequency of operations like API calls in search inputs.
 *
 * @param value The value to debounce
 * @param delay The delay in milliseconds (default: 500ms)
 * @returns The debounced value
 */
export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Custom hook that returns a debounced callback function.
 * This avoids the need for an additional state and effect in the parent component.
 *
 * @param value The value to pass to the callback
 * @param callback The function to debounce
 * @param delay The delay in milliseconds (default: 500ms)
 */
export const useDebounceCallback = <T>(value: T, callback: (value: T) => void, delay = 500) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [callback, delay, value])
}
