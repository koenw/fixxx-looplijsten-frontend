import React, { FC, FormEvent, useState, useContext } from "react"
import useOnChangeState from "../../hooks/useOnChangeState"
import { navigate } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Login as LoginIcon } from "@datapunt/asc-assets"
import ErrorMessage from "../global/ErrorMessage"
import Input from "../styled/Input"
import StateContext from "../../contexts/StateContext"

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

  const {
    state: {
      authActions: {
        authenticate
      }
    }
  } = useContext(StateContext)

  const [email, onChangeEmail] = useOnChangeState()
  const [password, onChangePassword] = useOnChangeState()
  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    authenticate(email, password)
  }

  const showErrorMessage = errorMessage !== ""

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
    </Div>
  )
}

export default LoginForm
