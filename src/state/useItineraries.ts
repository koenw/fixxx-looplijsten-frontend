import { useEffect, useReducer } from "react"
import reducer, {
  initialState,
  initialize,
  createAdd,
  createUpdate,
  createMove,
  createRemove,
  createSetNote,
  createClear } from "./reducer"
import { get, post, put, patch, del } from "../utils/fetch"
import { getUrl } from "../config/domain"
import authToken from "../utils/authToken"
import calculateNewPosition from "../utils/calculateNewPosition"

const useItineraries = () : [ItinerariesState, ItinerariesActions] => {

  const [itinerariesState, dispatch] = useReducer(reducer, initialState as never)

  useEffect(() => {
    (async () => {
      const result = await get("itineraries")
      if (result === undefined) return
      const itineraries = result.items as Itineraries
      dispatch(initialize(itineraries))
    })()
  }, [])

  const add = (caseId: CaseId) => {
    (async () => {
      const result = await post("itineraries/items", { id: caseId })
      if (result === undefined) return
      const itinerary = result as Itinerary
      const itineraries = [itinerary] as Itineraries
      dispatch(createAdd(itineraries))
    })()
  }

  const move = (index: Index, newIndex: Index) => {

    const patchPosition = async (id: Id, position: number) => {
      const result = await patch(`itineraries/items/${ id }`, { position })
      if (result === undefined) return
      const itinerary = result as Itinerary
      dispatch(createUpdate(id, itinerary))
    }

    dispatch(createMove(index, newIndex))

    const { itineraries } = itinerariesState
    const position = calculateNewPosition(itineraries, index, newIndex)
    const id = itineraries[index].id
    patchPosition(id, position)
  }

  const remove = (id: Id) => {

    (async () => {
      await del(`itineraries/items/${ id }`)
      dispatch(createRemove(id))
    })()
  }

  const setNote = async (itineraryId: Id, text: string, id?: Id) => {

    const path = `notes/${ id || "" }`
    const method = text === "" ? del : id !== undefined ? put : post
    const body = { itinerary_item: itineraryId, text }
    const result = await method(path, body)
    if (method !== del && result === undefined) return false
    const newText = result ? result.text : ""
    const noteId = result ? result.id : id
    dispatch(createSetNote(itineraryId, noteId!, newText))
    return true
  }

  const clear = () => dispatch(createClear())

  return [itinerariesState, { add, move, remove, setNote, clear }]
}
export default useItineraries
