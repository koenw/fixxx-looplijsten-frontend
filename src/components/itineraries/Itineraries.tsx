import React, { FC, useState } from "react"
import { Spinner } from "@datapunt/asc-ui"
import Itinerary from "./Itinerary"
import ErrorMessage from "../global/ErrorMessage"
import useFetch from "../../hooks/useFetch"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"
import styled from "styled-components"
import NoteButton from "../itineraries/NoteButton"
import DeleteButton from "../itineraries/DeleteButton"
import { navigate } from "@reach/router"
import { to } from "../../config/domain"

const Div = styled.div`
  display: flex
  justify-content: space-between
  border-bottom: 4px solid #767676
`

const ButtonWrap = styled.div`
  display: flex
  margin: 24px 0
  button {
    margin-left: 12px
  }
`

const Itineraries: FC = () => {

  const [deleted, setDeleted] = useState<Ids>([])
  const [result, isFetching, errorMessage] = useFetch("itineraries") as [any, boolean, ErrorMessage]
  const itineraries: Itineraries = result !== undefined && Array.isArray(result.items) ? result.items : []
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
            nonDeletedItineraries.map(({ id, case: { bwv_data }, notes }) => {

              const noteId = notes[0] && notes[0].id
              const noteText = notes[0] && notes[0].text
              const notePath = `/notes/${ id }/${ noteId || "" }`

              return (
                <Div key={ id }>
                  <Itinerary itinerary={ bwv_data } note={ noteText } />
                  <ButtonWrap>
                    <NoteButton onClick={ () => navigate(to(notePath)) } />
                    <DeleteButton onClick={ onClick(id) } />
                  </ButtonWrap>
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
