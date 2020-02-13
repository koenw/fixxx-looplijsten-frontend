import React, { FC, useState } from "react"
import displayAddress from "../../lib/displayAddress"
import styled from "styled-components"
import MapsButton from "../itineraries/MapsButton"
import CopyToClipboardButton from "../global/CopyToClipboardButton"

type Props = {
  title?: string
  lists: Lists
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

const createClipboardText = (list: List) => {
  const newline = "\n"
  return list.map(itinerary => {
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

const PlanningResultItineraries: FC<Props> = ({ title, lists }) => {

  const itineraries = lists.flat()

  const hasTitle = title !== undefined
  const fullTitle = hasTitle ? `${ title } (${ itineraries.length })` : ""
  const [isCopied, setIsCopied] = useState(false)
  const style = isCopied ? { opacity: 0.1 } : undefined
  const text = createClipboardText(itineraries)
  const onClick = () => setIsCopied(true)
  return (
    <Div className="PlanningResultItineraries" style={ style }>
      { hasTitle &&
        <h1>{ fullTitle }</h1>
      }
      { lists.map((itineraries, index) => {
        return (
          <div key={ index }>
            <table>
              <thead>
                <tr><Th>Straat</Th><Th>Postcode</Th><Th>Openingsreden</Th><Th>Stadium</Th></tr>
              </thead>
              <tbody>
              { itineraries.map(itinerary => {
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
                    <tr key={ caseId }>
                      <Td>{ address }</Td>
                      <Td>{ postalCode }</Td>
                      <Td>{ caseReason }</Td>
                      <Td>{ stadium }</Td>
                      <Td><a href={ `/cases/${ caseId }` }>detail</a></Td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
            <ButtonWrap>
              <MapsButton itineraries={ itineraries } />
            </ButtonWrap>
          </div>
        )
      })}
      <ButtonWrap>
        <CopyToClipboardButton text={ text } onClick={ onClick } />
      </ButtonWrap>
    </Div>
  )
}
export default PlanningResultItineraries
