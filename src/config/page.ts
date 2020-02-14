import { isAcc } from "./environment"
import parseLocationSearch from "../lib/utils/parseLocationSearch"
import queryParams from "../lib/utils/queryParams"
import pick from "../lib/utils/pick"

export const basepath = isAcc ? "/looplijsten/" : "/"

export const to = (path: string = "") => {
  return `${ basepath }${ path }`
}

export const isPage = (page: string) => window.location.pathname === to(page)
export const isLoginPage = () => isPage("login")
export const isLoginCallbackPage = () => isPage("authentication/callback")
export const isHomePage = () => isPage("")
