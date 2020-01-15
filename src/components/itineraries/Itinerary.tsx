import React, { FC } from "react"
import { Link } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"
import Signal from "../global/Signal"
import displayAddress from "../../lib/displayAddress"

type Props = {
  itinerary: BWVData
  note?: string
  showAddress?: boolean
}

const Article = styled.article`
  width: 100%
  a {
    display: block
    margin-bottom: 0
    padding: 15px 0
  }
`
const Div = styled.div`
  padding-left: 12px
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
const PostalCode = styled(P)`
  font-weight: bold
`
const Note = styled.p`
  margin-bottom: 0
  font-size: 16px
  line-height: 1.3em
  color: gray
  font-weight: normal
`
const SignalWrap = styled.div`
  margin-left: -12px
`

const Itinerary: FC<Props> = ({ itinerary, note, showAddress = true }) => {

  const {
    case_id: id,
    street_name: streetName,
    street_number: streetNumber,
    suffix,
    suffix_letter,
    postal_code: postalCode,
    stadium,
    case_reason: caseReason
  } = itinerary

  const address = displayAddress(streetName, streetNumber, suffix_letter || undefined, suffix || undefined)
  const showNote = note !== undefined
  const maxLength = 48
  const noteString = note ?
    note!.length > maxLength ?
    `${ note!.substring(0, maxLength).trim() }…` :
    note! :
    undefined

  const linkTo = to(`/cases/${ id }`)

  return (
    <Article className="Itinerary">
      <Link to={ linkTo }>
        <Div>
          { showAddress &&
            <>
              <H1>{ address }</H1>
              <PostalCode>{ postalCode }</PostalCode>
            </>
          }
          <div>
            <P>{ caseReason }</P>
            <SignalWrap>
              <Signal text={ stadium } />
            </SignalWrap>
            { showNote &&
              <Note>{ noteString }</Note>
            }
          </div>
        </Div>
      </Link>
    </Article>
  )
}
export default Itinerary
