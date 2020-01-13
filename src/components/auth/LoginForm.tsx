import React, { FC, FormEvent, useContext } from "react"
import useOnChangeState from "../../hooks/useOnChangeState"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import { Login as LoginIcon } from "@datapunt/asc-assets"
import { getOIDCProviderUrl } from "../../config/domain"

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
      authenticate,
      auth: {
        isFetching,
        errorMessage
      }
    }
  } = useContext(StateContext)

  const [email, onChangeEmail] = useOnChangeState()
  const [password, onChangePassword] = useOnChangeState()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await authenticate(email, password)
  }

  const gripUri = getOIDCProviderUrl()

  const isDisabled = isFetching
  const showErrorMessage = errorMessage !== undefined

  return (
    <Div className="Login">
      <Form onSubmit={ onSubmit }>
        <h1>Looplijsten vakantieverhuur login</h1>
        <InputLoginForm type="email" placeholder="email" value={ email } onChange={ onChangeEmail } />
        <InputLoginForm type="password" placeholder="wachtwoord" value={ password } onChange={ onChangePassword } />
        { showErrorMessage &&
          <ErrorMessage text={ errorMessage! } />
        }
        <Button variant="application" iconLeft={ <LoginIcon /> } disabled={ isDisabled }>Inloggen</Button>
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
