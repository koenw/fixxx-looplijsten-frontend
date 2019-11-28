import React, { FC } from "react"
import { Link } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"
import Signal from "../global/Signal"

type Props = {
  itinerary: any
}

const Article = styled.article`
  margin-bottom: 12px
`
const H1 = styled.h1`
  a {
    font-size: 20px
    line-height: 28px
  }
`

const Itinerary: FC<Props> = ({ itinerary }) => {
  const {
    case_id: id,
    street_name: streetName,
    street_number: streetNumber,
    suffix,
    suffix_letter,
    postal_code: postalCode,
    stadium
  } = itinerary

  const linkTo = to(`/cases/${ id }`)

  return (
    <Article className="Itinerary">
      <H1><Link to={ linkTo }>{ streetName } { streetNumber } { suffix }{ suffix_letter }</Link></H1>
      <p>{ postalCode }</p>
      <Signal text={ stadium } />
    </Article>
  )
}
export default Itinerary
