import { useReducer } from "react"
import { navigate } from "@reach/router"
import reducer, {
  initialState,
  createStartFetching,
  createInitialize,
  createSetErrorMessage,
  createAuthenticate,
  createUnAuthenticate,
  createClear } from "./authReducer"
import authToken from "../lib/authToken"
import { get, post, notOk } from "../lib/utils/fetch"
import { getAuthUrl, getIsAuthenticatedUrl, to } from "../config/domain"

const useAuth = () : [AuthState, AuthActions] => {

  const [auth, dispatch] = useReducer(reducer, initialState as never)

  const isAuthenticated = async () : Promise<boolean> => {
    const token = authToken.get()
    const hasToken = token !== undefined
    if (!hasToken) return false
    const url = getIsAuthenticatedUrl()
    const [, result] = await get(url) as [undefined, IsAuthenticatedResponse]
    if (result === undefined) return false
    const { is_authenticated: isAuthenticated } = result
    return isAuthenticated
  }

  const initialize = async () : Promise<boolean> => {
    const isAuthorized = await isAuthenticated()
    if (isAuthorized) {
      const token = authToken.get()
      dispatch(createInitialize(token))
      if (window.location.pathname === to("/login", false)) navigate(to("/"))
      return true
    } else {
      if (window.location.pathname !== to("/authentication/callback")) navigate(to("/login"))
      return false
    }
  }

  const authenticate = async (email: Email, password: Password) : Promise<boolean> => {

    dispatch(createStartFetching())

    const url = getAuthUrl()
    const [response, result, errorMessage] = await post(url, { email, password })

    // Handle error responses
    if (notOk(response)) {
      const message =
        response.status === 401 ? "Ongeldige email, wachtwoord combinatie" :
        errorMessage !== undefined ? errorMessage! :
        String(response.status)
      dispatch(createSetErrorMessage(message))
      return false
    }

    // Handle successful login
    const { access } = result
    const token = access
    authToken.set(token)
    dispatch(createAuthenticate(token))
    navigate(to("/"))
    return true
  }

  const authenticateToken = (token: AuthToken) => {
    authToken.set(token)
    dispatch(createAuthenticate(token))
    navigate(to("/"))
  }

  const unAuthenticate = () => {
    authToken.clear()
    dispatch(createUnAuthenticate())
  }

  const clear = () => {
    authToken.clear()
    dispatch(createClear())
    navigate(to("/login"))
  }

  return [auth, { initialize, authenticate, authenticateToken, unAuthenticate, clear }]
}

export default useAuth
