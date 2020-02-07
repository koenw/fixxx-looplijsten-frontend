import React, { FC, useRef, useState } from "react"
import displayAddress from "../../lib/displayAddress"
import styled from "styled-components"
import { Button } from "@datapunt/asc-ui"

type Props = {
  title: string
  itineraries: any
}

const P = styled.p`
  display: inline
`
const TextArea = styled.textarea`
  position: absolute
  top: -9999px
`

const PlanningResultItineraries: FC<Props> = ({ title, itineraries }) => {
  let fullText = ""
  const ref = useRef<HTMLTextAreaElement>(null)
  const [isCopied, setIsCopied] = useState(false)
  const onClick = () => {
    const elem = ref.current
    if (elem === null) return
    elem.value = fullText
    elem.select()
    document.execCommand("copy")
    setIsCopied(true)
  }
  const style = isCopied ? { opacity: 0.1 } : undefined
  return (
    <div className="PlanningResultItineraries" style={ style }>
      <h1>{ title }</h1>
      { itineraries.map((itinerary: any) => {
          const address = displayAddress(itinerary.street_name, itinerary.street_number, itinerary.suffix, itinerary.suffix_letter)
          const { case_id: caseId, postal_code: postalCode, stadium, case_reason: caseReason } = itinerary
          const text = `${ address } ${ postalCode } ${ stadium } ${ caseReason }`
          fullText += `${ text }\n`
          return (
            <div>
              <P key={ address }>{ text }</P>
              &nbsp;
              <a href={ `/cases/${ caseId }` }>detail</a>
            </div>
          )
        })
      }
      <TextArea ref={ ref }/>
      <Button onClick={ onClick }>Kopieër naar clipboard</Button>
    </div>
  )
}
export default PlanningResultItineraries
