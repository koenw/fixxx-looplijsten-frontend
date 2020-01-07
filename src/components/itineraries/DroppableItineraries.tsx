import React, { FC, useContext } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DraggableItinerary from "./DraggableItinerary"
import stateContext from "../../contexts/StateContext"

type Props = {
  itineraries: Itineraries
}

const Div = styled.div`
  margin: -169px -15px 0
`
const DroppableInner = styled.div`
  padding: 169px 15px 68px
`

const DroppableItineraries: FC<Props> = ({ itineraries }) => {

  const {
    state: {
      itinerariesActions: {
        move
      }
    }
  } = useContext(stateContext)

  const onDragEnd = async (result: any) => {
    if (result.destination === null) return
    const { source: { index }, destination: { index: newIndex } } = result
    move(index, newIndex)
  }

  return (
    <Div className="DroppableItineraries">
      <DragDropContext onDragEnd={ onDragEnd }>
        <Droppable droppableId="itineraries">
        {
          (provided, snapshot) =>
            <DroppableInner
              ref={ provided.innerRef }
              { ...provided.droppableProps }
            >
              { itineraries.map((itinerary, index) =>
                  <DraggableItinerary key={ itinerary.id } itinerary={ itinerary } index={ index } />)
              }
              { provided.placeholder }
            </DroppableInner>
        }
        </Droppable>
      </DragDropContext>
    </Div>
  )
}
export default DroppableItineraries
