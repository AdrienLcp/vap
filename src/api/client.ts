import { failure } from '@/helpers/result'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const headers = new Headers()
headers.set('Content-Type', 'application/json')

const fetchApi = async <T>(route: string, method: Method = 'GET', body?: object): Promise<T> => {
  try {
    const response = await fetch(`/api/${route}`, {
      body: body ? JSON.stringify(body) : undefined,
      headers,
      method
    })

    return await response.json()
  } catch (error) {
    console.error('Fetch API error:', error)
    return failure() as T
  }
}

const GET = async <T>(route: string) => {
  return await fetchApi<T>(route)
}

const POST = async <T>(route: string, body: object) => {
  return await fetchApi<T>(route, 'POST', body)
}

const PUT = async <T>(route: string, body: object) => {
  return await fetchApi<T>(route, 'PUT', body)
}

const DELETE = async <T>(route: string) => {
  return await fetchApi<T>(route, 'DELETE')
}

const PATCH = async <T>(route: string, body: object) => {
  return await fetchApi<T>(route, 'PATCH', body)
}

export const ApiClient = {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH
}
