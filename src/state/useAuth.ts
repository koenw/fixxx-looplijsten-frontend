import { useEffect, useReducer } from "react"
import { navigate } from "@reach/router"
import reducer, {
  initialState,
  createInitialize,
  createAuthenticate,
  createUnAuthenticate,
  createClear } from "./authReducer"
import authToken from "../utils/authToken"
import { post, notOk } from "../utils/fetch"
import { getAuthUrl, to } from "../config/domain"

const useAuth = () : [AuthState, AuthActions] => {

  const [auth, dispatch] = useReducer(reducer, initialState as never)

  const initialize = () : boolean => {
    const token = authToken.get()
    const hasToken = token !== undefined
    if (!hasToken) {
      if (window.location.pathname !== to("/authentication/callback")) navigate(to("/login"))
      return false
    } else {
      dispatch(createInitialize(token))
      return true
    }
  }

  const authenticate = async (email: Email, password: Password) : Promise<boolean> => {

    const url = getAuthUrl()
    const [response, result] = await post(url, { username: email, password })

    // Handle error responses
    if (notOk(response)) return false

    // Handle successful login
    const { token } = result
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
