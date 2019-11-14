import React, { ChangeEvent, FormEvent, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import { navigate } from "@reach/router"
import { getAuthUrl } from "../config/domain"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"

const Form = styled.form`
  width: 100%
  max-width: 300px
`

const Error = styled.p`
  margin: 18px 0 0 0
  color: red
`

const LoginContainer = styled.div`
  margin: 32px 0 0 0
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  height: 75vh
`

const Input = styled.input`
  font-size: 1rem
  border: 1px solid
  rgb(118, 118, 118)
  border-radius: 0px
  box-sizing: border-box
  line-height: 18px
  padding: 10px
  width: 100%
  margin: 0 0 18px 0
  display: block
  &:focus {
    outline: rgb(254, 200, 19) solid 2px
    outline-offset: 0.5px
  }
`

const LoginPage: React.FC<RouteComponentProps> = () => {

  const [email, setEmail] = useState("")
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const [password, setPassword] = useState("")
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async (event: FormEvent) => {

    event.preventDefault()

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
      localStorage.setItem("token", json.token)
      navigate("/")
    }
  }

  return (
    <LoginContainer>
      <Form onSubmit={ onSubmit }>
        <h1>Looplijsten vakantieverhuur login</h1>
        <Input type="email" placeholder="email" value={ email } onChange={ onChangeEmail } />
        <Input type="password" placeholder="wachtwoord" value={ password } onChange={ onChangePassword } />
        <Error>{ errorMessage }</Error>
        <Button>Inloggen</Button>
      </Form>
    </LoginContainer>
  )
}

export default LoginPage
