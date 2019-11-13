const config = {
  domain: "http://localhost:8000/",
  basePath: "api/v1/"
}
export default config

export const getUrl = (path: string) => {
  const { domain, basePath } = config
  const shouldAppendSlash = path.substr(-1) !== "/"
  return `${ domain}${ basePath }${ path }${ shouldAppendSlash ? "/" : "" }`
}
