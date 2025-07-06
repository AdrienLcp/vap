import { failure } from '@/helpers/result'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const headers = new Headers()
headers.set('Content-Type', 'application/json')

type FetchApiError = ReturnType<typeof failure>

export const fetchApi = async <T> (route: string, method?: Method, body?: object): Promise<T | FetchApiError> => {
  try {
    const response = await fetch(`/api/${route}`, {
      body: body ? JSON.stringify(body) : undefined,
      headers,
      method: method ?? 'GET'
    })

    const data: T = await response.json()
    return data
  } catch (error) {
    console.error('Fetch API error:', error)
    return failure()
  }
}
