import React, { FC, useState, useEffect } from "react"
import { Spinner } from "@datapunt/asc-ui"
import { RouteComponentProps } from "@reach/router"
import ErrorMessage from "../components/global/ErrorMessage"
import { getAuthOIDCUrl } from "../config/domain"
import authToken from "../utils/authToken"
import parseLocationSearch from '../utils/parseLocationSearch'
import { navigate } from "@reach/router"
import { to } from "../config/domain"


const LoginCallbackPage: FC<RouteComponentProps> = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const showErrorMessage = errorMessage !== ""

  const confirmLogin = async () => {
    setErrorMessage("")
    const queryParameters = parseLocationSearch(window.location.search)
    const { code }  = queryParameters

    const url = getAuthOIDCUrl()
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({code})
    })  
  
    // Handle error responses
    if (response.status !== 200) {
      const message = `Could not confirm authentication with resource server`
      setErrorMessage(message)
    }

    // Handle successful login
    else if (response.status === 200) {
      const json = await response.json()
      authToken.set(json.token)
      navigate(to("/"))      
    }
  }
  
  useEffect(() => {    
    if(!loading) {
      setLoading(true)
      confirmLogin()      
    }    
  }, [loading])

  return (
    <>
      <h1>Confirming authentication with resource server</h1>
      { loading && <Spinner/> }
      { showErrorMessage && <ErrorMessage text={ errorMessage } />
      }  
    </>
  )
}

export default LoginCallbackPage
