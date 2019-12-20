import authToken from "./authToken"

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
type URL = string
type Body = any

type Response = any
type OResponse = Response | undefined
type Result = any
type OResult = Result | undefined

type Return = [Response] | [Response, Result] | [OResponse, OResult, ErrorMessage]

type Headers = Record<string, string>

const getHeaders = (token?: AuthToken, body?: Body) => {
  const headers: Headers = {}
  if (token !== undefined) headers.Authorization = `Token ${ token }`
  if (body !== undefined) headers["Content-Type"] = "application/json"
  return headers
}

const fetch = async (url: URL, method: Method = "GET", body?: Body, parseResponse = true) : Promise<Return> => {
  try {
    const token = authToken.get()
    const hasToken = token !== undefined
    const hasBody = body !== undefined
    const headers = getHeaders(token, body)
    const bodyString = body ? JSON.stringify(body) : undefined
    const response = await window.fetch(url, { method, headers, body: bodyString })
    if (!response.ok || !parseResponse) return [response]
    const data = await response.json()
    return [response, data]
  } catch (err) {
    console.error(err)
    return [undefined, undefined, err]
  }
}
export default fetch

// REST
export const get = async (url: URL) => await fetch(url)
export const post = async (url: URL, body: Body) => await fetch(url, "POST", body)
export const put = async (url: URL, body: Body) => await fetch(url, "PUT", body)
export const patch = async (url: URL, body: Body) => await fetch(url, "PATCH", body)
export const del = async (url: URL) => await fetch(url, "DELETE", undefined, false)

// utils
export const isOk = (response: OResponse) => response && response.ok
export const notOk = (response: OResponse) => !isOk(response)
