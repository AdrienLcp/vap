/**
 * Logs an error message to the browser console if called in a browser environment.
 * Intended to be used on the server side; calling this function in the browser will output an error.
 *
 * @param message - Optional message to log alongside the error.
 */
export const serverSideLogger = (message?: string) => {
  if (window) {
    window.console.error('This should not be called in the browser', message)
  }
}
