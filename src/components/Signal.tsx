import React from "react"
import styled from "styled-components"

type Props = {
  type?: "ISSUE" | "REGULAR"
}

const Span = styled.span`
  display: inline-block;
  color: white;
  background-color: blue;
  border-radius: 99px;
  padding: 2px 12px;
  margin-bottom: 8px;
  &.signal-issue {
    background-color: red;
  }
`

const Signal: React.FC<Props> = ({ type = "REGULAR" }) => {
  const classNames = ["signal", `signal-${ type.toLowerCase }`].join(" ")
  const text = type === "ISSUE" ? "ISSUE melding" : "melding"
  return (
    <Span className={ classNames }>{ text }</Span>
  )
}

export default Signal
