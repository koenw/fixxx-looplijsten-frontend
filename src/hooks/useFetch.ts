import "abortcontroller-polyfill/dist/polyfill-patch-fetch"
import { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import { getUrl, to } from "../config/domain"
import authToken from "../utils/authToken"
import { get, isOk, isForbidden } from "../utils/fetch"

const navigateToLogin = () => {
  navigate(to("/login"))
}

const useFetch = (path: string, plural = false, immediateReturn = false) : [any, boolean, OErrorMessage] => {

  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<ErrorMessage>()

  const defaultState = plural ? [] : undefined
  const [data, setData] = useState(defaultState)

  useEffect(() => {

    if (immediateReturn) {
      setIsFetching(false)
      return
    }

    (async () => {

      try {

        const url = getUrl(path)
        const token = authToken.get()

        if (token === undefined) {
          navigateToLogin()
        }
        else {
          const [response, result] = await get(url)
          if (isOk(response)) {
            setData(result)
          } else {
            if (isForbidden(response)) return navigateToLogin()
            setError(`Error: HTTP ${ response.status }`)
          }
        }
      }
      catch (err) {
        console.error(err)
        setError(err.toString())
      }
      finally {
        setIsFetching(false)
      }
    })()
  }, [path, immediateReturn])

  return [data, isFetching, error]
}

export default useFetch
