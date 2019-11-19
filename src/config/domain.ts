import queryParams from "../utils/queryParams"

const config = {
  domain: "http://localhost:8000/",
  basePath: "api/v1/",
  authPath: "api-token-auth/"
}
export default config

export const getUrl = (path: string, params?: QueryParams) => {
  const { domain, basePath } = config
  const shouldAppendSlash = path.substr(-1) !== "/"
  const url = `${ domain }${ basePath }${ path }${ shouldAppendSlash ? "/" : "" }`
  return `${ url }${ params ? queryParams(params) : "" }`
}

export const getAuthUrl = () => {
  const { domain, authPath } = config
  return `${ domain }${ authPath }`
}
