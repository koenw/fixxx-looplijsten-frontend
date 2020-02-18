import React, { FC, useState } from "react"
import displayAddress from "../../lib/displayAddress"
import styled from "styled-components"
import MapsButton from "../itineraries/MapsButton"
import CopyToClipboardButton from "../global/CopyToClipboardButton"

type Props = {
  title?: string
  lists: Lists
  subtitles?: string[]
}

const Div = styled.div`
  padding: 12px
  border: solid 1px #B4B4B4
  margin-bottom: 36px
`
const H1 = styled.h1`
  font-size: 24px
`
const H2 = styled.h2`
  font-size: 16px
  margin-top: 24px
`
const Wrap = styled.div`
  margin-left: 12px
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  margin: 12px
`
const Table = styled.table`
  width: 100%
`
const Th = styled.th`
  width: 20%
  text-align: left
  padding-right: 36px
`
const Td = styled.td`
  padding-right: 36px
`

const createClipboardText = (lists: Lists, subtitles?: string[]) => {
  const nl = "\n"
  return lists.map((list, index) => {
    const subtitle = subtitles && subtitles[index]
    const hasSubtitle = subtitle !== undefined
    const addressesText = list.map(itinerary => {
      const {
        street_name: streetName,
        street_number: streetNumber,
        suffix,
        suffix_letter: suffixLetter,
        postal_code: postalCode,
        stadium,
        case_reason: caseReason
      } = itinerary
      const address = displayAddress(streetName, streetNumber, suffixLetter || undefined, suffix || undefined)
      const text = `${ address } ${ postalCode } ${ stadium } ${ caseReason }`
      return text
    }).join(nl) + nl
    return `${ hasSubtitle ? subtitle + nl : "" }${ addressesText }${ nl }`
  }).join(nl)
}

const PlanningResultItineraries: FC<Props> = ({ title, lists, subtitles = [] }) => {

  const hasTitle = title !== undefined
  const fullTitle = hasTitle ? `${ title } (${ lists.flat().length })` : ""
  const [isCopied, setIsCopied] = useState(false)
  const style = isCopied ? { opacity: 0.1 } : undefined
  const text = createClipboardText(lists, subtitles)
  const onClick = () => setIsCopied(true)

  return (
    <Div className="PlanningResultItineraries" style={ style }>
      { hasTitle &&
        <H1>{ fullTitle }</H1>
      }
      { lists.map((itineraries, index) => {
        const subtitle = subtitles[index]
        const hasSubtitle = subtitle !== undefined
        return (
          <Wrap key={ index }>
            { hasSubtitle &&
              <H2>{ subtitle }</H2>
            }
            <Table>
              <thead>
                <tr>
                  <Th>Straat</Th>
                  <Th>Postcode</Th>
                  <Th>Openingsreden</Th>
                  <Th>Stadium</Th>
                  <Th><MapsButton $as="a" itineraries={ itineraries } /></Th>
                </tr>
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
                  const address = displayAddress(streetName, streetNumber, suffixLetter || undefined, suffix || undefined)
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
            </Table>
          </Wrap>
        )
      })}
      <ButtonWrap>
        <CopyToClipboardButton text={ text } onClick={ onClick } />
      </ButtonWrap>
    </Div>
  )
}
export default PlanningResultItineraries
