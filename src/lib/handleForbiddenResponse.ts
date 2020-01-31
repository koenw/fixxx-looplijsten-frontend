import logoutGrip from "./logoutGrip"
import { navigateToLogin } from "./navigateTo"

const handleForbiddenResponse = () => {
  logoutGrip()
  navigateToLogin()
}

export default handleForbiddenResponse
