import React, { FC, useRef, useState } from "react"
import displayAddress from "../../lib/displayAddress"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"
import MapsButton from "../itineraries/MapsButton"
import CopyToClipboardButton from "../global/CopyToClipboardButton"

type Props = {
  title: string
  itineraries: any
}

const Div = styled.div`
  margin-bottom: 36px
`

const P = styled.p`
  display: inline
`
const TextArea = styled.textarea`
  position: absolute
  top: -9999px
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: space-between
  max-width: 600px
  margin-top: 24px
`
const Th = styled.th`
  text-align: left
  padding-right: 36px
`
const Td = styled.td`
  padding-right: 36px
`

const createClipboardText = (itineraries: any) => {
  const newline = "\n"
  return itineraries.map((itinerary: any) => {
    const {
      street_name: streetName,
      street_number: streetNumber,
      suffix,
      suffix_letter: suffixLetter,
      postal_code: postalCode,
      stadium,
      case_reason: caseReason
    } = itinerary
    const address = displayAddress(streetName, streetNumber, suffix, suffixLetter)
    const text = `${ address } ${ postalCode } ${ stadium } ${ caseReason }`
    return text
  }).join(newline) + newline
}

const PlanningResultItineraries: FC<Props> = ({ title, itineraries }) => {
  const fullTitle = `${ title } (${ itineraries.length })`
  const [isCopied, setIsCopied] = useState(false)
  const style = isCopied ? { opacity: 0.1 } : undefined
  const text = createClipboardText(itineraries)
  const onClick = () => setIsCopied(true)
  return (
    <Div className="PlanningResultItineraries" style={ style }>
      <h1>{ fullTitle }</h1>
      <table>
        <tr><Th>Straat</Th><Th>Postcode</Th><Th>Openingsreden</Th><Th>Stadium</Th></tr>
        { itineraries.map((itinerary: any) => {
            const {
              street_name: streetName,
              street_number: streetNumber,
              suffix,
              suffix_letter: suffixLetter,
              case_id: caseId,
              postal_code: postalCode,
              stadium,
              case_reason: caseReason
            } = itinerary
            const address = displayAddress(streetName, streetNumber, suffix, suffixLetter)
            return (
              <tr key={ address }>
                <Td>{ address }</Td>
                <Td>{ postalCode }</Td>
                <Td>{ caseReason }</Td>
                <Td>{ stadium }</Td>
                <Td><a href={ `/cases/${ caseId }` }>detail</a></Td>
              </tr>
            )
          })
        }
      </table>
      <ButtonWrap>
        <MapsButton itineraries={ itineraries.map((itinerary: any) => ({ case: { bwv_data: itinerary } })) } />
        <CopyToClipboardButton text={ text } onClick={ onClick } />
      </ButtonWrap>
    </Div>
  )
}
export default PlanningResultItineraries
