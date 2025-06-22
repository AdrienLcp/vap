import { failure, Result, success } from '@/helpers/result'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const headers = new Headers()
headers.set('Content-Type', 'application/json')

export const fetchApi = async <Error = undefined, T = undefined> (route: string, method?: Method, body?: object): Promise<Result<Error, T>> => {
  const response = await fetch(route, {
    body: body ? JSON.stringify(body) : undefined,
    headers,
    method: method ?? 'GET'
  })

  if (!response.ok) {
    return failure() as Result<Error, T>
  }

  const result = await response.json()

  console.log('réponse dans le fetchApi : ', result)

  if (result.status === 'error') {
    return failure(result.errors) as Result<Error, T>
  }

  return success(result.data) as Result<Error, T>
}
