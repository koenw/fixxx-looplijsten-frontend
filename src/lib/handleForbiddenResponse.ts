import logoutGrip from "./logoutGrip"
import { navigateToLogin } from "./navigateTo"

const handleForbiddenResponse = async () => {
  await logoutGrip()
  navigateToLogin()
  window.location.reload()
}

export default handleForbiddenResponse
