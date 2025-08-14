'use client'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type RequestOptions = {
  headers?: Record<string, string>
  credentials?: RequestCredentials
  signal?: AbortSignal
}

const hasJsonBody = (response: Response) => {
  const contentType = response.headers.get('content-type')
  return !!contentType && contentType.includes('application/json')
}

const request = async <Response, RequestBody = undefined>(
  route: string,
  method: Method,
  options?: RequestOptions,
  body?: RequestBody
): Promise<Response> => {
  const response = await fetch(`/api/${route}`, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(options?.headers ?? {})
    },
    credentials: options?.credentials,
    signal: options?.signal
  })

  const json = hasJsonBody(response)
    ? await response.json()
    : undefined

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

const PATCH = async <Response, RequestBody>(route: string, body?: RequestBody, options?: RequestOptions) =>
  await request<Response, RequestBody>(route, 'PATCH', options, body)

const POST = async <Response, RequestBody>(route: string, body?: RequestBody, options?: RequestOptions) =>
  await request<Response, RequestBody>(route, 'POST', options, body)

const PUT = async <Response, RequestBody>(route: string, body?: RequestBody, options?: RequestOptions) =>
  await request<Response, RequestBody>(route, 'PUT', options, body)

export const ApiClient = {
  DELETE,
  GET,
  PATCH,
  POST,
  PUT
}

export const UNKNOWN_ERROR_STATUS = 0 as const
export type UnknownErrorStatus = typeof UNKNOWN_ERROR_STATUS
export type UnknownErrorResponse = { status: UnknownErrorStatus }

export const unknownError = (): UnknownErrorResponse => {
  return { status: UNKNOWN_ERROR_STATUS }
}

export type ClientResponse<T> = T | UnknownErrorResponse
