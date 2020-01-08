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
const authOIDCPath = "oidc-authenticate/"
const pathPrefix = "looplijsten/"

const config = {
  domain,
  pathPrefix,
  basePath,
  authPath,
  authOIDCPath
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

export const getAuthOIDCUrl = () => {
  const { domain, pathPrefix, authOIDCPath } = config

  return `${ domain }${ pathPrefix }${ authOIDCPath }`
}

export const getOIDCProviderUrl = () => {
  // TODO: generate this dynamically using environment
  const authorizeUri = "https://auth.grip-on-it.com/v2/rjsfm52t/oidc/idp/authorize"
  const responseType = "code"
  const scope = "openid"
  const clientId = "d3d664c7-bb33-4bf0-b7c9-b8bdf1199b76"

  // TODO: add production url
  const redirectUri = hostname === "acc.straatnotes.amsterdam.nl"
  ? "https%3A%2F%2Facc.straatnotes.amsterdam.nl%2Flooplijsten%2Fauthentication%2Fcallback"
  : "http%3A%2F%2Flocalhost%3A3000%2Fauthentication%2Fcallback"
  return `${authorizeUri}?response_type=${responseType}&scope=${scope}&client_id=${clientId}&redirect_uri=${redirectUri}`
}

export const getBasepath = () => hostname === "acc.straatnotes.amsterdam.nl" || hostname === "straatnotes.amsterdam.nl" ? "/looplijsten" : ""
export const to = (path: string, appendParams = true) => {
  const forwardParams = ["api", "anonymous"]
  const params = parseLocationSearch(window.location.search)
  const queryParamsString = queryParams(pick(params, forwardParams))
  return `${ getBasepath() }${ path[0] !== "/" ? "/" : "" }${ path }${ appendParams ? queryParamsString : "" }`
}
