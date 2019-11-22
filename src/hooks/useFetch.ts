import { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import { getUrl } from "../config/domain"
import authToken from "../utils/authToken"

const navigateToLogin = () => {
  navigate("/login")
}

const useFetch = (path: string, plural = false) : [any, boolean, ErrorMessage] => {

  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<ErrorMessage>()

  const defaultState = plural ? [] : undefined
  const [data, setData] = useState(defaultState)

  useEffect(() => {

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
              "Authorization": `Token ${ token }`
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
      abortController.abort()
    }
  }, [path])

  return [data, isFetching, error]
}

export default useFetch
