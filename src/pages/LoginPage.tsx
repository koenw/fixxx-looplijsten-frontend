import React from "react"
import { RouteComponentProps } from "@reach/router"
import { navigate } from "@reach/router"
import { getAuthUrl } from "../config/domain"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"


const Error = styled.p`
  margin: 18px 0 0 0;
  color: red;
`;

const LoginContainer = styled.div`
  margin: 32px 0 0 0;
`;

const Input = styled.input`
  font-size: 1rem;
  border: 1px solid
  rgb(118, 118, 118);
  border-radius: 0px;
  box-sizing: border-box;
  line-height: 18px;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  margin: 0 0 18px 0;
  display: block;
  &:focus {
    outline: rgb(254, 200, 19) solid 2px
    outline-offset: 0.5px;
  }
`

const submit = async (event: React.FormEvent<HTMLElement>) => {
  event.preventDefault();

  const email = document.getElementById('email-input') as HTMLInputElement;
  const password = document.getElementById('password-input') as HTMLInputElement;
  if (email && password) {
    const url = getAuthUrl();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: email.value, password: password.value })
    })
    const login_response = await response;
    const login_json = await login_response.json();

    // Handle error responses
    if (login_response.status === 400) {
      const message = document.getElementById('error_message')
      if (message && login_json.non_field_errors) {
        message.innerHTML = 'Login Failed: ' + login_json.non_field_errors;
      }
      else if (message) {
        message.innerHTML = 'Login Failed';
      }
    }

    // Handle if login is succesful
    else if (login_response.status === 200) {
      localStorage.setItem('token', login_json.token);
      navigate('/');
    }
  }

  return event;

}

const LoginPage: React.FC<RouteComponentProps> = () => {
  return (
    <LoginContainer>
      <form onSubmit={submit}>
        <Input type="text" name="email" id="email-input" placeholder="email" />
        <Input type="password" name="password" id="password-input" placeholder="password" />
        <Button onClick={submit} >Submit</Button>
        <Error id="error_message"></Error>
      </form>

    </LoginContainer >
  )
}

export default LoginPage
