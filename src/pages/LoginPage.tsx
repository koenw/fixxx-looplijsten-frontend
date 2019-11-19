import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import LoginForm from "../components/auth/LoginForm"

const LoginPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <LoginForm />
    </>
  )
}

export default LoginPage
