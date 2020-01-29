import React, { FC } from "react"
import styled from "styled-components"
import { getOIDCProviderUrl } from "../../config/api"

const Div = styled.div`
  margin-top: 100px
  display: flex
  justify-content: center
`

const LoginForm: FC = () => {

  const href = getOIDCProviderUrl()

  return (
    <Div className="LoginForm">
      <a href={ href }>Login met KPN Grip</a>
    </Div>
  )
}

export default LoginForm
