import React, { FC, useState } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import DraggableItinerary from "./DraggableItinerary"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"

type Props = {
  itineraries: Itineraries
}

const patch = async (caseId: CaseId, position: number) => {
  try {
    const path = `itineraries/items/${ caseId }`
    const url = getUrl(path)
    const token = authToken.get()
    return fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${ token }`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ position, case: { caseId } })
    })
  } catch (err) {
    console.error(err)
  }
}

const moveInArray = (arr: Itineraries, index: Index, newIndex: Index) => {
  const clone = [...arr]
  clone.splice(newIndex, 0, clone.splice(index, 1)[0])
  return clone
}

const DroppableItineraries: FC<Props> = ({ itineraries }) => {

  const [orderedItineraries, setOrderedItineraries] = useState(itineraries)

  const onDragEnd = async (result: any) => {
    if (result.destination === null) return
    const { draggableId, source: { index }, destination: { index: newIndex } } = result
    const reorderedItineraries = moveInArray(orderedItineraries, index, newIndex)
    const currentPrevPosition = newIndex > 0 ? reorderedItineraries[newIndex - 1].position : 0
    const length = reorderedItineraries.length
    const currentNextPosition = newIndex < length - 1 ? reorderedItineraries[newIndex + 1].position : undefined
    const position = currentNextPosition ? currentPrevPosition + (currentNextPosition - currentPrevPosition) / 2 : reorderedItineraries[length - 1].position + 10
    reorderedItineraries[newIndex].position = position
    setOrderedItineraries(reorderedItineraries)
    await patch(draggableId, position)
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
              { orderedItineraries.map((itinerary, index) =>
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
