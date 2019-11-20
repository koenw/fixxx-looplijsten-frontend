import React, { FC, FormEvent } from "react"
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

  const [result, isFetching, errorMessage] = useFetch("itineraries") as [any, boolean, ErrorMessage]
  console.log(result)
  const itineraries: Itineraries = result !== undefined ? result[0].items : []
  const showSpinner = isFetching
  const showError = errorMessage !== undefined
  const show = !showSpinner && !showError
  const hasItineraries = itineraries.length > 0
  console.log(itineraries)

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
            itineraries.map(({ id }) => (
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
