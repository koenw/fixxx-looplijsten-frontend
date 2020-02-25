import React, { FC, useState, ChangeEvent, FormEvent } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import displayAddress from "../../lib/displayAddress"
import { Button, Select } from "@datapunt/asc-ui"
import styled from "styled-components"

type Props = {
  caseId: CaseId
}

const Form = styled.form`
  display: flex
  select {
    margin-right: 24px
  }
  padding-bottom: 48px
`

const PlanningResultItinerariesAddForm: FC<Props> = ({ caseId: siblingCaseId }) => {

  const {
    planning: {
      results
    },
    planningActions: {
      addItinerary
    }
  } = useGlobalState()

  const itineraries = results !== undefined ? results.unplanned_cases : []
  const showForm = itineraries.length > 0

  const [value, setValue] = useState("")
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => setValue(event.target.value)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (value === "") return
    addItinerary(siblingCaseId, value)
    setValue("")
  }

  return showForm ?
    <Form onSubmit={ onSubmit }>
      <Select onChange={ onChange } value={ value }>
        <option value="">Selecteer adres</option>
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
            const text = `${ address } ${ postalCode } ${ caseReason } ${ stadium }`
            return <option key={ text } value={ caseId }>{ text }</option>
          })
        }
      </Select>
      <Button>toevoegen</Button>
    </Form>
    :
    null
}

export default PlanningResultItinerariesAddForm
