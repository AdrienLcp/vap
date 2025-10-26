'use client'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type RequestOptions = {
  headers?: Record<string, string>
  credentials?: RequestCredentials
  signal?: AbortSignal
}

const hasBody = (response: Response) => {
  const contentType = response.headers.get('Content-Type')
  return contentType?.includes('application/json')
}

const request = async <Response, RequestBody = undefined>(
  route: string,
  method: Method,
  options?: RequestOptions,
  body?: RequestBody
): Promise<Response> => {
  const headers = new Headers(options?.headers)

  if (body) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`/api/${route}`, {
    body: body ? JSON.stringify(body) : null,
    credentials: options?.credentials,
    headers,
    method,
    signal: options?.signal
  })

  const json = hasBody(response) ? await response.json() : null

  return {
    ...json,
    headers: response.headers,
    status: response.status
  }
}

const DELETE = async <Response>(route: string, options?: RequestOptions) =>
  await request<Response>(route, 'DELETE', options)

const GET = async <Response>(route: string, options?: RequestOptions) =>
  await request<Response>(route, 'GET', options)

const PATCH = async <Response, RequestBody>(
  route: string,
  body?: RequestBody,
  options?: RequestOptions
) => await request<Response, RequestBody>(route, 'PATCH', options, body)

const POST = async <Response, RequestBody>(
  route: string,
  body?: RequestBody,
  options?: RequestOptions
) => await request<Response, RequestBody>(route, 'POST', options, body)

const PUT = async <Response, RequestBody>(
  route: string,
  body?: RequestBody,
  options?: RequestOptions
) => await request<Response, RequestBody>(route, 'PUT', options, body)

export const ApiClient = {
  DELETE,
  GET,
  PATCH,
  POST,
  PUT
}

export const unknownError = () => {
  return { status: 0 } as const
}

export type ClientResponse<T> = T | ReturnType<typeof unknownError>
