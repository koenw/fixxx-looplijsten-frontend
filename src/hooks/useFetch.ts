import { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import { getUrl } from "../config/domain"
import authToken from "../utils/authToken"

const useFetch = (path: string, plural = false): [any, boolean, ErrorMessage] => {

  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<ErrorMessage>()

  const defaultState = plural ? [] : undefined
  const [data, setData] = useState(defaultState)

  useEffect(() => {

    (async () => {
      try {
        const url = getUrl(path)
        const token = authToken.get()
        if (token === undefined) return
        const response = await fetch(url, {
          headers: {
            "Authorization": `Token ${ token }`
          }
        })

        if (response.status === 403) {
          navigate("/login")
        }
        else if (response.ok) {
          const json = await response.json()
          setData(json)
        }
        else {
          setError(`Error: HTTP ${ response.status }`)
        }

      } catch (err) {
        console.error(err)
        setError(err)
      } finally {
        setIsFetching(false)
      }
    })()
  }, [path])

  return [data, isFetching, error]
}

export default useFetch
