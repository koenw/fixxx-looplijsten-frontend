import React, { FC, FormEvent, useState } from "react"
import useOnChangeState from "../../hooks/useOnChangeState"
import { navigate } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Login as LoginIcon } from "@datapunt/asc-assets"
import { getAuthUrl, getOIDCProviderUrl } from "../../config/domain"
import authToken from "../../utils/authToken"
import ErrorMessage from "../global/ErrorMessage"
import Input from "../styled/Input"

const Form = styled.form`
  width: 100%
  max-width: 300px
`

const Div = styled.div`
  margin: 32px 0 0 0
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  height: 75vh
`

const InputLoginForm = styled(Input)`
  width: 100%
  display: block
  margin-bottom: 18px
`

const LoginForm: FC = () => {

  const [email, onChangeEmail] = useOnChangeState()
  const [password, onChangePassword] = useOnChangeState()
  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async (event: FormEvent) => {

    event.preventDefault()

    setErrorMessage("")

    const url = getAuthUrl()
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: email, password })
    })
    const json = await response.json()

    // Handle error responses
    if (response.status === 400) {
      const message = `Login failed${ json.non_field_errors ? `: ${ json.non_field_errors }` : "" }`
      setErrorMessage(message)
    }

    // Handle successful login
    else if (response.status === 200) {
      authToken.set(json.token)
      navigate(to("/"))
      window.location.reload()
    }
  }

  const showErrorMessage = errorMessage !== ""
  const gripUri = getOIDCProviderUrl()

  return (
    <Div className="Login">
      <Form onSubmit={ onSubmit }>
        <h1>Looplijsten vakantieverhuur login</h1>
        <InputLoginForm type="email" placeholder="email" value={ email } onChange={ onChangeEmail } />
        <InputLoginForm type="password" placeholder="wachtwoord" value={ password } onChange={ onChangePassword } />
        { showErrorMessage &&
          <ErrorMessage text={ errorMessage } />
        }
        <Button variant="application" iconLeft={ <LoginIcon /> }>Inloggen</Button>
      </Form>
      <h2>
          <a href={gripUri}>
            Login met KPN Grip
          </a>
        </h2>      
    </Div>
  )
}

export default LoginForm
