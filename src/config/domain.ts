import queryParams from "../utils/queryParams"

const config = {
  domain: "http://localhost:8000/",
  pathPrefix: "looplijsten/",
  basePath: "api/v1/",
  authPath: "api-token-auth/"
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
