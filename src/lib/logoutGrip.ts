import { getLogoutUrl } from "../config/api"
export default () => fetch(getLogoutUrl(), { mode: "no-cors", credentials: "include" })
