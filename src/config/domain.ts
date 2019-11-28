import parseLocationSearch from "../utils/parseLocationSearch"
import queryParams from "../utils/queryParams"
import pick from "../utils/pick"

const hostname = window.location.hostname
const api = parseLocationSearch(window.location.search).api
const isAcc = api === "acc"

const domain =
  hostname === "acc.straatnotes.amsterdam.nl" ? "https://acc.api.straatnotes.amsterdam.nl/" :
  hostname === "straatnotes.amsterdam.nl" ? "https://api.straatnotes.amsterdam.nl/" :
  isAcc ? "https://acc.api.straatnotes.amsterdam.nl/" :
  "http://localhost:8000/"
const basePath = "api/v1/"
const authPath = "api-token-auth/"
const pathPrefix = "looplijsten/"

const config = {
  domain,
  pathPrefix,
  basePath,
  authPath
}
export default config

export const getUrl = (path: string, params?: QueryParams) => {
  const { domain, pathPrefix, basePath } = config
  const shouldAppendSlash = path.substr(-1) !== "/"
  const url = `${ domain }${ pathPrefix }${ basePath }${ path }${ shouldAppendSlash ? "/" : "" }`
  return `${ url }${ params ? queryParams(params) : "" }`
}

export const getAuthUrl = () => {
  const { domain, pathPrefix, authPath } = config
  return `${ domain }${ pathPrefix }${ authPath }`
}

export const getBasepath = () => hostname === "acc.straatnotes.amsterdam.nl" || hostname === "straatnotes.amsterdam.nl" ? "/looplijsten" : ""
export const to = (path: string) => {
  const forwardParams = ["api", "anonymous"]
  const params = parseLocationSearch(window.location.search)
  const queryParamsString = queryParams(pick(params, forwardParams))
  return `${ getBasepath() }${ path[0] !== "/" ? "/" : "" }${ path }${ queryParamsString }`
}
