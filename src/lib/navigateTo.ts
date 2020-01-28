import { navigate } from "@reach/router"
import { to } from "../config/page"

export const navigateToHome = () => navigate(to("/"))
export const navigateToLogin = () => navigate(to("login"))
