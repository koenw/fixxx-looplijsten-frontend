import React, { FC, useState } from "react"
import displayAddress from "../../lib/displayAddress"
import styled from "styled-components"
import MapsButton from "../itineraries/MapsButton"
import CopyToClipboardButton from "../global/CopyToClipboardButton"

type Props = {
  title?: string
  itineraries: BWVData[][]
}

const Div = styled.div`
  padding: 12px
  border: solid 1px #B4B4B4
  margin-bottom: 36px
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  max-width: 600px
  margin: 12px 0 36px
`
const Th = styled.th`
  text-align: left
  padding-right: 36px
`
const Td = styled.td`
  padding-right: 36px
`

const createClipboardText = (itineraries: BWVData[]) => {
  const newline = "\n"
  return itineraries.map((itinerary: BWVData) => {
    const {
      street_name: streetName,
      street_number: streetNumber,
      suffix,
      suffix_letter: suffixLetter,
      postal_code: postalCode,
      stadium,
      case_reason: caseReason
    } = itinerary
    const address = displayAddress(streetName, streetNumber, suffix || undefined, suffixLetter || undefined)
    const text = `${ address } ${ postalCode } ${ stadium } ${ caseReason }`
    return text
  }).join(newline) + newline
}

const PlanningResultItineraries: FC<Props> = ({ title, itineraries }) => {

  const itinerariesFlattened = itineraries.flat()

  const hasTitle = title !== undefined
  const fullTitle = hasTitle ? `${ title } (${ itinerariesFlattened.length })` : ""
  const [isCopied, setIsCopied] = useState(false)
  const style = isCopied ? { opacity: 0.1 } : undefined
  const text = createClipboardText(itinerariesFlattened)
  const onClick = () => setIsCopied(true)
  return (
    <Div className="PlanningResultItineraries" style={ style }>
      { hasTitle &&
        <h1>{ fullTitle }</h1>
      }
      { itineraries.map(list => {
        return (
          <>
            <table>
              <tr><Th>Straat</Th><Th>Postcode</Th><Th>Openingsreden</Th><Th>Stadium</Th></tr>
              { list.map((itinerary: BWVData) => {
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
                  const address = displayAddress(streetName, streetNumber, suffix || undefined, suffixLetter || undefined)
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
              <MapsButton itineraries={ itineraries[0] } />
            </ButtonWrap>
          </>
        )
      })}
      <ButtonWrap>
        <CopyToClipboardButton text={ text } onClick={ onClick } />
      </ButtonWrap>
    </Div>
  )
}
export default PlanningResultItineraries
