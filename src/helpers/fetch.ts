import { failure, Result, success } from '@/helpers/result'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const headers = new Headers()
headers.set('Content-Type', 'application/json')

export const fetchApi = async <Error = undefined, Data = undefined> (route: string, method?: Method, body?: object): Promise<Result<Error, Data>> => {
  try {
    const response = await fetch(`/api/${route}`, {
      body: body ? JSON.stringify(body) : undefined,
      headers,
      method: method ?? 'GET'
    })

    if (!response.ok) {
      return failure() as Result<Error, Data>
    }

    const result = await response.json()

    if (result.status === 'error') {
      return failure(result.errors) as Result<Error, Data>
    }

    return success(result.data) as Result<Error, Data>
  } catch (error) {
    console.error('Fetch API error:', error)
    return failure() as Result<Error, Data>
  }
}
