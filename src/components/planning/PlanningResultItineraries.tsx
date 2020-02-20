import React, { FC, useState } from "react"
import displayAddress from "../../lib/displayAddress"
import styled from "styled-components"
import MapsButton from "../itineraries/MapsButton"
import CopyToClipboardButton from "../global/CopyToClipboardButton"
import ErrorMessage from "../global/ErrorMessage"

type Props = {
  title?: string
  lists: BWVData[][]
  subtitles?: string[]
  hasCopyButton?: boolean
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
  margin-right: 24px
  display: inline-block
`
const H2Wrap = styled.div`
  margin: 16px 0
`
const Wrap = styled.div`
  margin: 0 12px
`
const H1Wrap = styled.div`
  display: flex
  justify-content: space-between
  margin: 12px 0
`
const Table = styled.table`
  width: 100%
  border-collapse: collapse
  margin-bottom: 36px
`
const Tr = styled.tr`
  border-bottom: solid 1px #B4B4B4
`
const Th = styled.th`
  width: 25%
  text-align: left
  padding: 8px 0
`
const ThSmall = styled(Th)`
  width: 12.5%
`
const Td = styled.td`
  padding: 8px 0
  transition: opacity 0.2s ease-out
  opacity: ${ (props: { faded?: boolean }) => props.faded ? 0.2 : 1 }
`
const ErrorMessageWrap = styled.div`
  margin: 12px 0
`

const createClipboardText = (lists: BWVData[][], subtitles?: string[]) => {
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

const PlanningResultItineraries: FC<Props> = ({ title, lists, subtitles = [], hasCopyButton = true }) => {

  const hasTitle = title !== undefined
  const totalLength = lists.flat().length
  const fullTitle = hasTitle ? `${ title } ${ totalLength > 0 ? `(${ totalLength })` : "" } ` : ""
  const [isCopied, setIsCopied] = useState(false)
  const text = createClipboardText(lists, subtitles)
  const onClick = () => setIsCopied(true)

  const showCopyButton = hasCopyButton && totalLength > 0

  return (
    <Div className="PlanningResultItineraries">
      <H1Wrap>
        { hasTitle &&
          <H1>{ fullTitle }</H1>
        }
        { showCopyButton &&
          <CopyToClipboardButton text={ text } onClick={ onClick } />
        }
      </H1Wrap>
      { lists.map((itineraries, index) => {
        const subtitle = subtitles[index]
        const hasSubtitle = subtitle !== undefined
        const length = itineraries.length
        const subtitleDisplay = hasSubtitle ? `${ subtitle } (${ length })` : ""
        const showErrorMessage = length === 0
        return (
          <Wrap key={ index }>
            <H2Wrap>
              { hasSubtitle &&
                <H2>{ subtitleDisplay }</H2>
              }
              <MapsButton $as="a" itineraries={ itineraries } />
            </H2Wrap>
            <Table>
              <thead>
                <Tr>
                  <Th>Straat</Th>
                  <ThSmall>Postcode</ThSmall>
                  <Th>Openingsreden</Th>
                  <Th>Stadium</Th>
                  <ThSmall></ThSmall>
                </Tr>
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
                    <Tr key={ caseId }>
                      <Td faded={ isCopied }>{ address }</Td>
                      <Td faded={ isCopied }>{ postalCode }</Td>
                      <Td faded={ isCopied }>{ caseReason }</Td>
                      <Td faded={ isCopied }>{ stadium }</Td>
                      <Td><a href={ `/cases/${ caseId }` }>bekijk</a></Td>
                    </Tr>
                  )
                })
              }
              </tbody>
            </Table>
            { showErrorMessage &&
              <ErrorMessageWrap>
                <ErrorMessage text="Onvoldoende zaken beschikbaar om deze lijst te genereren" />
              </ErrorMessageWrap>
            }
          </Wrap>
        )
      })}
    </Div>
  )
}
export default PlanningResultItineraries
