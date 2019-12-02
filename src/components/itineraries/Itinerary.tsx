import React, { FC } from "react"
import { Link } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"
import Signal from "../global/Signal"

type Props = {
  itinerary: BWVData
  note?: string
}

const Article = styled.article`
  width: 100%
  a {
    display: block
    margin-bottom: 0
    padding: 24px 0
  }
`
const H1 = styled.h1`
  font-size: 20px
  line-height: 28px
  color: black
`
const P = styled.p`
  color: black
  font-weight: normal
`
const Note = styled.p`
  margin-bottom: 0
  font-family: serif
  font-size: 24px
  color: lightgray
  font-style: italic
`

const Itinerary: FC<Props> = ({ itinerary, note }) => {

  const {
    case_id: id,
    street_name: streetName,
    street_number: streetNumber,
    suffix,
    suffix_letter,
    postal_code: postalCode,
    stadium
  } = itinerary

  const showNote = note !== undefined

  const linkTo = to(`/cases/${ id }`)

  return (
    <Article className="Itinerary">
      <Link to={ linkTo }>
        <div>
          <H1>{ streetName } { streetNumber } { suffix_letter }{ suffix }</H1>
          <P>{ postalCode }</P>
          <Signal text={ stadium } />
          { showNote &&
            <Note>{ note }</Note>
          }
        </div>
      </Link>
    </Article>
  )
}
export default Itinerary
