import React, { FC, useContext } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import DraggableItinerary from "./DraggableItinerary"
import stateContext from "../../contexts/StateContext"

type Props = {
  itineraries: Itineraries
}

const DroppableItineraries: FC<Props> = ({ itineraries }) => {

  const {
    state: {
      moveItinerary
    }
  } = useContext(stateContext)

  const onDragEnd = async (result: any) => {
    if (result.destination === null) return
    const { source: { index }, destination: { index: newIndex } } = result
    moveItinerary(index, newIndex)
  }

  return (
    <div className="DroppableItineraries">
      <DragDropContext onDragEnd={ onDragEnd }>
        <Droppable droppableId="itineraries">
        {
          (provided, snapshot) =>
            <div
              ref={ provided.innerRef }
              { ...provided.droppableProps }
            >
              { itineraries.map((itinerary, index) =>
                  <DraggableItinerary key={ itinerary.id } itinerary={ itinerary } index={ index } />)
              }
              { provided.placeholder }
            </div>
        }
        </Droppable>
      </DragDropContext>
    </div>
  )
}
export default DroppableItineraries
