import React from "react"
import { RouteComponentProps } from "@reach/router"
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

type Props = RouteComponentProps
const submit = async (event: React.MouseEvent<HTMLElement>) => {

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

    if (login_response.status === 400) {
      const message = document.getElementById('message')
      if (message) {
        message.innerHTML = 'Login Failed: ' + login_json.non_field_errors + ' ';
      }
    }
    else if (login_response.status === 200) {
      document.cookie = `token=${login_json.token}`;
    }
  }

  return event;

}

const LoginPage: React.FC<Props> = () => {
  return (
    <LoginContainer>
      <Input type="text" name="email" id="email-input" placeholder="email" />
      <Input type="password" name="password" id="password-input" placeholder="password" />
      <Button onClick={(event: React.MouseEvent<HTMLElement>) => submit(event)} >Submit</Button>
      <Error id="message"></Error>
    </LoginContainer >
  )
}

export default LoginPage
