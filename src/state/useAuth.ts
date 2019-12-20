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

  useEffect(() => {
    (async () => {
      const token = authToken.get()
      dispatch(createInitialize(token))
      if (token === undefined) navigate(to("/login"))
    })()
  }, [])

  const authenticate = (email: Email, password: Password) => {

    (async () => {
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
    })()
  }

  const unAuthenticate = () => {
    authToken.clear()
    dispatch(createUnAuthenticate())
  }

  const clear = () => {
    authToken.clear()
    dispatch(createClear())
  }

  return [auth, { authenticate, unAuthenticate, clear }]
}

export default useAuth
