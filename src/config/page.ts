import { isAcc } from "./environment"
import parseLocationSearch from "../lib/utils/parseLocationSearch"
import queryParams from "../lib/utils/queryParams"
import pick from "../lib/utils/pick"

export const basepath = isAcc ? "/looplijsten/" : "/"

export const to = (path: string = "", appendParams = true) => {
  const forwardParams = ["api", "anonymous"]
  const params = parseLocationSearch(window.location.search)
  const queryParamsString = queryParams(pick(params, forwardParams))
  return `${ basepath }${ path }${ appendParams ? queryParamsString : "" }`
}

export const isPage = (page: string) => window.location.pathname === to(page, false)
export const isLoginPage = () => isPage("login")
export const isLoginCallbackPage = () => isPage("authentication/callback")
export const isHomePage = () => isPage("")
