import React from "react"
import styled from "styled-components"

type Props = {
  type?: "ISSUE" | "REGULAR"
  text?: string
}

const Span = styled.span`
  display: inline-block;
  color: white;
  background-color: #004699;
  border-radius: 99px;
  padding: 2px 12px;
  margin-bottom: 8px;
  &.signal-issue {
    background-color: #EC0000;
  }
`

const Signal: React.FC<Props> = ({ type = "REGULAR", text }) => {
  const classNames = ["signal", `signal-${ type.toLowerCase() }`].join(" ")
  const body = text || (type === "ISSUE" ? "ISSUE melding" : "melding")
  return (
    <Span className={ classNames }>{ body }</Span>
  )
}

export default Signal
