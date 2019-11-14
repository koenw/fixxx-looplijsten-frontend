import { useState, useEffect } from "react"
import { getUrl } from "../config/domain"
import { navigate } from "@reach/router"

const useFetch = (path: string, plural = false): any => {

  const [isFetching, setIsFetching] = useState(true)

  const defaultState = plural ? [] : undefined
  const [data, setData] = useState(defaultState)

  useEffect(() => {
    (async () => {
      try {
        const url = getUrl(path)
        const authToken = localStorage.getItem('token')
        const response = await fetch(url, {
          headers: {
            "Authorization": `Token ${ authToken }`
          }
        })

        if (response.status === 403) {
          navigate('/login')
        }
        else {
          const json = await response.json()
          setData(json)
        }

        setIsFetching(false)

      } catch (err) {
        console.error(err)
        setIsFetching(false)
      }
    })()
  }, [path])

  return [isFetching, data]
}

export default useFetch
