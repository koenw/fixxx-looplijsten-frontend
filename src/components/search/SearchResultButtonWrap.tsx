import React, { FC, useContext, FormEvent } from "react"
import stateContext from "../../contexts/StateContext"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"
import IconButton from "../global/IconButton"
import styled from "styled-components"

type Props = {
  caseId: CaseId
}

const Div = styled.div`
  span {
    display: inline-block
    width: 100%
    text-align: center
    color: black
    font-weight: normal
  }
  button {
    margin: 10px
  }
`

const SearchResultButtonWrap: FC<Props> = ({ caseId }) => {

  const {
    state: {
      itineraries,
      hasItinerary,
      addItinerary,
      removeItinerary
    }
  } = useContext(stateContext)

  const onClickAdd = (id: CaseId) => async (event: FormEvent) => {

    event.preventDefault()

    const url = getUrl("itineraries/items")
    const token = authToken.get()
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${ token }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
    if (response.ok) {
      const itinerary = await response.json() as Itinerary
      addItinerary(itinerary)
    }
  }

  const onClickRemove = (id: CaseId) => async (event: FormEvent) => {

    event.preventDefault()

    const itinerary = itineraries.find(itinerary => itinerary.case.bwv_data.case_id === id)
    if (itinerary === undefined) return

    const url = getUrl(`itineraries/items/${ itinerary.id }`)
    const token = authToken.get()
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${ token }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
    if (response.ok) {
      removeItinerary(itinerary)
    }
  }

  const isItinerary = hasItinerary(caseId)
  const showAddButton = isItinerary === false
  const showRemoveButton = !showAddButton

  return (
    <div className="SearchResultButtonWrap">
      { showAddButton &&
        <IconButton icon="Enlarge" onClick={ onClickAdd(caseId) } />
      }
      { showRemoveButton &&
        <Div>
          <span>In lijst</span>
          <IconButton icon="TrashBin" onClick={ onClickRemove(caseId) } size={ 40 } border={ false } />
        </Div>
      }
    </div>
  )
}
export default SearchResultButtonWrap
