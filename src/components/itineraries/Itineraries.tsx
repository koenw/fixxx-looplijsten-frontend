import React, { FC, useState } from "react"
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

  const [deleted, setDeleted] = useState<Ids>([])
  const [result, isFetching, errorMessage] = useFetch("itineraries") as [any, boolean, ErrorMessage]
  const itineraries: Itineraries = result !== undefined ? result.items : []
  const nonDeletedItineraries = itineraries.filter(itinerary => !deleted.includes(itinerary.id))
  const showSpinner = isFetching
  const showError = errorMessage !== undefined
  const show = !showSpinner && !showError
  const hasItineraries = nonDeletedItineraries.length > 0

  const onClick = (id: Id) => (async () => {

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
            nonDeletedItineraries.map(({ id, case: caseItem }) => {
              const { address = "Dummystraat 3", postal_code = "1234DD", stadium = "Issuemelding" } = caseItem || {}
              return (
                <Div key={ id }>
                  <Itinerary itinerary={ { id, address, postal_code, stadium } } />
                  <DeleteButton onClick={ onClick(id) } />
                </Div>
              )
            })
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
