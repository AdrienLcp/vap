'use client'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const request = async <Response, RequestBody = undefined>(route: string, method: Method, body?: RequestBody): Promise<Response> => {
  const response = await fetch(`/api/${route}`, {
    body: body ? JSON.stringify(body) : undefined,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    method
  })

  return await response.json()
}

const DELETE = async <Response>(route: string) => await request<Response>(route, 'DELETE')

const GET = async <Response>(route: string) => await request<Response>(route, 'GET')

const PATCH = async <Response, RequestBody>(route: string, body?: RequestBody) => await request<Response, RequestBody>(route, 'PATCH', body)

const POST = async <Response, RequestBody>(route: string, body?: RequestBody) => await request<Response, RequestBody>(route, 'POST', body)

const PUT = async <Response, RequestBody>(route: string, body?: RequestBody) => await request<Response, RequestBody>(route, 'PUT', body)

export const ApiClient = {
  DELETE,
  GET,
  PATCH,
  POST,
  PUT
}
