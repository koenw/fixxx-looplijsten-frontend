import React, { FC } from "react"
import styled from "styled-components"
import Signal from "../global/Signal"

type Props = {
  reason: string
  stadium: Stadium
}

const Div = styled.div``
const P = styled.p`
  font-weight: normal
  color: black
`

const SearchResultCase: FC<Props> = ({ reason, stadium }) => (
  <Div className="SearchResultCase">
    <P>{ reason }</P>
    <Signal text={ stadium } />
  </Div>
)
export default SearchResultCase
