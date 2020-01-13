import "abortcontroller-polyfill/dist/polyfill-patch-fetch"
import { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import { getUrl, to } from "../config/domain"
import authToken from "../utils/authToken"

const navigateToLogin = () => {
  navigate(to("/login"))
}

const useFetch = (path: string, plural = false, immediateReturn = false) : [any, boolean, ErrorMessage] => {

  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<ErrorMessage>()

  const defaultState = plural ? [] : undefined
  const [data, setData] = useState(defaultState)

  useEffect(() => {

    if (immediateReturn) {
      setIsFetching(false)
      return
    }

    let abortController: AbortController

    (async () => {

      try {

        abortController = new AbortController()
        const signal = abortController.signal

        const url = getUrl(path)
        const token = authToken.get()

        if (token === undefined) {
          navigateToLogin()
        }
        else {
          const response = await fetch(url, {
            signal,
            headers: {
              "Authorization": `Bearer ${ token }`
            }
          })

          if (response.status === 403) {
            navigateToLogin()
          }
          else if (response.ok) {
            const json = await response.json()
            setData(json)
          }
          else {
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

    return () => {
      if (abortController === undefined) return
      abortController.abort()
    }
  }, [path, immediateReturn])

  return [data, isFetching, error]
}

export default useFetch
