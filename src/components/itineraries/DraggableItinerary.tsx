import React, { FC, useContext } from "react"
import { Draggable } from "react-beautiful-dnd"
import { navigate } from "@reach/router"
import { to } from "../../config/domain"
import styled from "styled-components"
import IconButton from "../global/IconButton"
import Itinerary from "./Itinerary"
import stateContext from "../../contexts/StateContext"
import confirm from "../../utils/confirm"

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
      itinerariesActions: {
        remove
      }
    }
  } = useContext(stateContext)

  const { id, case: { bwv_data }, notes } = itinerary
  const noteId = notes[0] && notes[0].id
  const noteText = notes[0] && notes[0].text
  const notePath = `/notes/${ id }/${ noteId || "" }`

  const onClick = () => confirm(
    "Weet je zeker dat je deze zaak (en eventuele notities) uit je looplijst wilt verwijderen?",
    () => remove(id)
  )

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
              <IconButton icon="DocumentText" onClick={ () => navigate(to(notePath)) } />
              <IconButton icon="TrashBin" onClick={ onClick } />
            </ButtonWrap>
          </Div>
        </div>
      ) }
      </Draggable>
    </div>
  )
}
export default DraggableItinerary
