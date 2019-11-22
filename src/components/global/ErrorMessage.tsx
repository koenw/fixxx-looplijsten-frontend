import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  text: string
}

const P = styled.p`
  color: red
`

const ErrorMessage: FC<Props> = ({ text }) => {
  return (
    <div className="ErrorMessage">
      <P>{ text }</P>
    </div>
  )
}
export default ErrorMessage
