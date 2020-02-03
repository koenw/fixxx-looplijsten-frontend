import { getLogoutUrl } from "../config/api"
export default async () => await fetch(getLogoutUrl(), { mode: "no-cors", credentials: "include" })
