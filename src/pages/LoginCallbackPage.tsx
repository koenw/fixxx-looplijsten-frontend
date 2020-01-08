import React, { FC, useState, useEffect } from "react"
import { Spinner } from "@datapunt/asc-ui"
import { RouteComponentProps } from "@reach/router"
import ErrorMessage from "../components/global/ErrorMessage"
import { getAuthOIDCUrl } from "../config/domain"
import authToken from "../utils/authToken"
import parseLocationSearch from '../utils/parseLocationSearch'
import { navigate } from "@reach/router"
import { to } from "../config/domain"
import { post, notOk } from "../utils/fetch"

const LoginCallbackPage: FC<RouteComponentProps> = () => {

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const showSpinner = loading
  const showErrorMessage = errorMessage !== undefined

  const confirmLogin = async () => {

    setErrorMessage(undefined)

    const queryParameters = parseLocationSearch(window.location.search)
    const { code } = queryParameters

    console.log("Grip code", code)

    const url = getAuthOIDCUrl()
    const [response, result] = await post(url, { code })

    if (notOk(response)) {
      // @TODO: Dutch error message
      const httpStatus = response ? response.status : "Unknown"
      const message = `Could not confirm authentication with resource server. HTTP Status: ${ httpStatus }`
      setErrorMessage(message)
    } else {
      authToken.set(result.token)
      navigate(to("/"))
    }

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    confirmLogin()
  }, [])

  // @TODO: Dutch title
  return (
    <>
      <h1>Confirming authentication with resource server</h1>
      { showSpinner && <Spinner/> }
      { showErrorMessage && <ErrorMessage text={ errorMessage! } />
      }
    </>
  )
}

export default LoginCallbackPage
