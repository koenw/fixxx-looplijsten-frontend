const config = {
  domain: "http://localhost:8000/",
  basePath: "api/v1/",
  authPath: "api-token-auth/",
}
export default config

export const getUrl = (path: string) => {
  const { domain, basePath } = config
  const shouldAppendSlash = path.substr(-1) !== "/"
  return `${domain}${basePath}${path}${shouldAppendSlash ? "/" : ""}`
}

export const getAuthUrl = () => {
  const { domain, authPath } = config
  return `${domain}${authPath}`
}