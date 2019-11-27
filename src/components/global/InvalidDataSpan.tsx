import React, { FC } from "react"
import styled from "styled-components"

const Span = styled.span`
  color: red
`

const InvalidDataSpan: FC = () => <Span>-</Span>
export default InvalidDataSpan
