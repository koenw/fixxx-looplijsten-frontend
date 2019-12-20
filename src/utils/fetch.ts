import { getUrl } from "../config/domain"
import authToken from "./authToken"

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
type Path = string
type Body = any

type Response = any
type OResponse = Response | undefined
type Result = any
type OResult = Result | undefined

type Return = [Response] | [Response, Result] | [OResponse, OResult, ErrorMessage]

const fetch = async (path: Path, method: Method = "GET", body?: Body, parseResponse = true) : Promise<Return> => {
  try {
    const url = getUrl(path)
    const token = authToken.get()
    const headers = {
      Accept: "application/json",
      Authorization: `Token ${ token }`,
      "Content-Type": "application/json"
    }
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
export const get = async (path: Path) => await fetch(path)
export const post = async (path: Path, body: Body) => await fetch(path, "POST", body)
export const put = async (path: Path, body: Body) => await fetch(path, "PUT", body)
export const patch = async (path: Path, body: Body) => await fetch(path, "PATCH", body)
export const del = async (path: Path) => await fetch(path, "DELETE", undefined, false)

// utils
export const isOk = (response: OResponse) => response && response.ok
export const notOk = (response: OResponse) => !isOk(response)
