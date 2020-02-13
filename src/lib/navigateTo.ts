import { navigate } from "@reach/router"
import { to } from "../config/page"

const navigateTo = (path: string = "") => navigate(to(path))
export default navigateTo
export const navigateToHome = () => navigateTo()
export const navigateToLogin = () => navigateTo("login")
