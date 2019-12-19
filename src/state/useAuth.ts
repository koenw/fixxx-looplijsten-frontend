import { useEffect, useReducer } from "react"
import reducer, {
  initialState,
  createInitialize,
  createAuthenticate,
  createUnAuthenticate,
  createClear } from "./authReducer"
import { getAuthUrl } from "../config/domain"
import authToken from "../utils/authToken"

const useAuth = () : [AuthState, AuthActions] => {

  const [auth, dispatch] = useReducer(reducer, initialState as never)

  useEffect(() => {
    (async () => {
      const token = authToken.get()
      dispatch(createInitialize(token))
    })()
  }, [])

  const authenticate = (email: Email, password: Password) => {

    (async () => {
      const url = getAuthUrl()
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: email, password })
      })

      // Handle error responses
      if (response.status === 400) return false

      // Handle successful login
      if (response.status === 200) {
        const { token } = await response.json()
        authToken.set(token)
        dispatch(createAuthenticate(token))
        return true
      }
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

  return [auth, { authenticate, unAuthenticate, clear  }]
}

export default useAuth
