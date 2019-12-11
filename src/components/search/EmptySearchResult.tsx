import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  text?: string
}

const Div = styled.div`
  margin-top: 12px
  border-bottom: 4px solid #767676
`
const Span = styled.span`
  font-style: italic
`

const EmptySearchResult: FC<Props> = ({ text = "" }) => {
  return (
    <Div>
      <h1>Geen zoekresultaat</h1>
      <p>Voor: <Span>"{ text }"</Span></p>
    </Div>
  )
}
export default EmptySearchResult
