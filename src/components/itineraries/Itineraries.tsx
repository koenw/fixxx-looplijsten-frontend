import React, { FC, FormEvent, useState } from "react"
import { Spinner } from "@datapunt/asc-ui"
import Itinerary from "./Itinerary"
import ErrorMessage from "../global/ErrorMessage"
import useFetch from "../../hooks/useFetch"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"
import styled from "styled-components"
import DeleteButton from "../itineraries/DeleteButton"

const Div = styled.div`
  display: flex
  justify-content: space-between
  margin-top: 12px
`

const Itineraries: FC = () => {

  const [deleted, setDeleted] = useState<number[]>([])
  const [result, isFetching, errorMessage] = useFetch("itineraries") as [any, boolean, ErrorMessage]
  const itineraries: Itineraries = result !== undefined ? result[0].items : []
  const nonDeletedItineraries = itineraries.filter(itinerary => !deleted.includes(parseInt(itinerary.id, 10)))
  const showSpinner = isFetching
  const showError = errorMessage !== undefined
  const show = !showSpinner && !showError
  const hasItineraries = nonDeletedItineraries.length > 0

  const onClick = (id: number) => (async (event: FormEvent) => {

    event.preventDefault()

    const url = getUrl(`itineraries/items/${ id }`)
    const token = authToken.get()
    const response = await fetch(url, {
      method: "Delete",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${ token }`,
        "Content-Type": "application/json"
      }
    })
    if (response.ok) {
      setDeleted(deleted.concat(id))
    }
  })

  const emptyText = "Je looplijst is leeg. Zoek adressen om aan je looplijst toe te voegen."

  return (
    <div className="Itineraries">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { show &&
        (
          hasItineraries ?
            nonDeletedItineraries.map(({ id }) => (
              <Div key={ id }>
                <Itinerary itinerary={ { id, address: `Damweg ${ id }`, postal_code: "1234AA", stadium: "Issuemelding" } } />
                <DeleteButton onClick={ onClick(parseInt(id, 10)) } />
              </Div>
            ))
            :
            <p>{ emptyText }</p>
        )
      }
      { showError &&
        <ErrorMessage text={ errorMessage! } />
      }
    </div>
  )
}
export default Itineraries
