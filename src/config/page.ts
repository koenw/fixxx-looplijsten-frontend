import { to } from "./domain"
export const isPage = (page: string) => window.location.pathname === to(page, false)
export const isLoginPage = () => isPage("login")
export const isLoginCallbackPage = () => isPage("authentication/callback")
export const isHomePage = () => isPage("")
