import { getUrl } from "../config/domain"
import authToken from "./authToken"

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
type Path = string
type Body = any

const fetch = async (path: Path, method: Method = "GET", body?: Body, parseResponse = true) => {
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
    if (response.ok === false) return undefined
    if (parseResponse === false) return undefined
    return await response.json()
  } catch (err) {
    console.error(err)
  }
}
export default fetch

export const get = async (path: Path) => await fetch(path)
export const post = async (path: Path, body: Body) => await fetch(path, "POST", body)
export const put = async (path: Path, body: Body) => await fetch(path, "PUT", body)
export const patch = async (path: Path, body: Body) => await fetch(path, "PATCH", body)
export const del = async (path: Path) => await fetch(path, "DELETE", undefined, false)
