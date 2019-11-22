import queryParams from "../utils/queryParams"

const hostname = window.location.hostname

const domain =
  hostname === "acc.straatnotes.amsterdam.nl" ? "https://acc.api.straatnotes.amsterdam.nl/" :
  hostname === "straatnotes.amsterdam.nl" ? "https://api.straatnotes.amsterdam.nl/" :
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

export const getBasepath = () => hostname === "acc.straatnotes.amsterdam.nl" || hostname === "straatnotes.amsterdam.nl" ? "/looplijsten" : "/"
