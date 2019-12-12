import React, { FC, useContext } from "react"
import { Draggable } from "react-beautiful-dnd"
import { navigate } from "@reach/router"
import { getUrl, to } from "../../config/domain"
import authToken from "../../utils/authToken"
import styled from "styled-components"
import NoteButton from "../itineraries/NoteButton"
import DeleteButton from "../itineraries/DeleteButton"
import Itinerary from "./Itinerary"
import stateContext from "../../contexts/StateContext"

type Props = {
  itinerary: Itinerary
  index: number
}

const Div = styled.div`
  display: flex
  justify-content: space-between
  background: white
  border-bottom: 1px solid #767676
`

const ButtonWrap = styled.div`
  width: 60px
  margin: 24px 0
  button:first-child {
    margin-bottom: 24px
  }
`

const DraggableItinerary: FC<Props> = ({ itinerary, index }) => {

  const {
    state: {
      removeItinerary
    }
  } = useContext(stateContext)

  const { id, case: { bwv_data }, notes } = itinerary
  const noteId = notes[0] && notes[0].id
  const noteText = notes[0] && notes[0].text
  const notePath = `/notes/${ id }/${ noteId || "" }`

  const onClick = async () => {

    try {
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
        removeItinerary(itinerary)
      } else {
        alert("Verwijderen mislukt")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="DraggableItinerary">
      <Draggable key={ String(id) } draggableId={ String(id) } index={ index }>
      { (provided, snapshot) => (
        <div
          ref={ provided.innerRef }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
        >
          <Div>
            <Itinerary itinerary={ bwv_data } note={ noteText } />
            <ButtonWrap>
              <NoteButton onClick={ () => navigate(to(notePath)) } />
              <DeleteButton onClick={ onClick } />
            </ButtonWrap>
          </Div>
        </div>
      ) }
      </Draggable>
    </div>
  )
}
export default DraggableItinerary
