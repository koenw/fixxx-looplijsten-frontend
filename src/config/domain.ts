import parseLocationSearch from "../lib/utils/parseLocationSearch"
import queryParams from "../lib/utils/queryParams"
import pick from "../lib/utils/pick"

const hostname = window.location.hostname
const isProduction = hostname === "top.amsterdam.nl"
const isAcc = hostname === "acc.straatnotes.amsterdam.nl"
const { api } = parseLocationSearch(window.location.search)
const forceAcc = api === "acc"

const domain =
  isProduction ? "https://top.amsterdam.nl/" :
  isAcc || forceAcc ? "https://acc.api.straatnotes.amsterdam.nl/" :
  "http://localhost:8000/"
const pathPrefix =
  isProduction ? "api/" :
  isAcc || forceAcc ? "looplijsten/" :
  ""
const basePath = "api/v1/"
const authPath = "credentials-authenticate/"
const authOIDCPath = "oidc-authenticate/"
const isAuthenticatedPath = "is-authenticated/"

const config = {
  domain,
  pathPrefix,
  basePath,
  authPath,
  isAuthenticatedPath,
  authOIDCPath
}
export default config

export const getUrl = (path: string, params?: QueryParams) => {
  const { domain, pathPrefix, basePath } = config
  const shouldAppendSlash = path.substr(-1) !== "/"
  const url = `${ domain }${ pathPrefix }${ basePath }${ path }${ shouldAppendSlash ? "/" : "" }`
  return `${ url }${ params ? queryParams(params) : "" }`
}

export const getIsAuthenticatedUrl = () => {
  const { domain, pathPrefix, isAuthenticatedPath } = config
  return `${ domain }${ pathPrefix }${ isAuthenticatedPath }`
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
  const clientId = isProduction ? "d3d664c7-bb33-4bf0-b7c9-b8bdf1199b76" : "d3d664c7-bb33-4bf0-b7c9-b8bdf1199b76"

  const redirectDomain =
    isProduction ? "https://top.amsterdam.nl/" :
    isAcc ? "https://acc.straatnotes.amsterdam.nl/" :
    "http://localhost:3000/"
  const redirectUri = `${ redirectDomain }authentication/callback`
  const queryParamsString = queryParams({
    response_type: responseType,
    scope,
    client_id: clientId,
    redirect_uri: redirectUri,
  })
  return `${ authorizeUri }${ queryParamsString }`
}

export const getBasepath = () => hostname === "acc.straatnotes.amsterdam.nl" || hostname === "straatnotes.amsterdam.nl" ? "/looplijsten" : ""
export const to = (path: string, appendParams = true) => {
  const forwardParams = ["api", "anonymous"]
  const params = parseLocationSearch(window.location.search)
  const queryParamsString = queryParams(pick(params, forwardParams))
  return `${ getBasepath() }${ path[0] !== "/" ? "/" : "" }${ path }${ appendParams ? queryParamsString : "" }`
}
