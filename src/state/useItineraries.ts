import { useEffect, useReducer } from "react"
import reducer, {
  initialState,
  createInitialize,
  createAdd,
  createUpdate,
  createMove,
  createRemove,
  createSetNote,
  createClear } from "./itinerariesReducer"
import { get, post, put, patch, del, notOk } from "../utils/fetch"
import { getUrl } from "../config/domain"
import calculateNewPosition from "../utils/calculateNewPosition"

const useItineraries = () : [ItinerariesState, ItinerariesActions] => {

  const [itineraries, dispatch] = useReducer(reducer, initialState as never)

  const initialize = async () => {
    const url = getUrl("itineraries")
    const [response, result] = await get(url)
    if (notOk(response)) return
    const itineraries = result.items as Itineraries
    dispatch(createInitialize(itineraries))
  }

  const add = (caseId: CaseId) => {
    (async () => {
      const url = getUrl("itineraries/items")
      const [response, result] = await post(url, { id: caseId })
      if (notOk(response)) return
      const itinerary = result as Itinerary
      const itineraries = [itinerary] as Itineraries
      dispatch(createAdd(itineraries))
    })()
  }

  const move = (index: Index, newIndex: Index) => {

    const patchPosition = async (id: Id, position: number) => {
      const url = getUrl(`itineraries/items/${ id }`)
      const [response, result] = await patch(url, { position })
      if (notOk(response)) return
      const itinerary = result as Itinerary
      dispatch(createUpdate(id, itinerary))
    }

    dispatch(createMove(index, newIndex))

    const { itineraries: items } = itineraries
    const position = calculateNewPosition(items, index, newIndex)
    const id = items[index].id
    patchPosition(id, position)
  }

  const remove = (id: Id) => {
    (async () => {
      const url = getUrl(`itineraries/items/${ id }`)
      const [response] = await del(url)
      if (notOk(response)) return
      dispatch(createRemove(id))
    })()
  }

  const setNote = async (itineraryId: Id, text: string, id?: Id) => {

    const url = getUrl(`notes/${ id || "" }`)
    const method = text === "" ? del : id !== undefined ? put : post
    const body = { itinerary_item: itineraryId, text }
    const [response, result] = await method(url, body)
    if (notOk(response)) return false
    const newText = result ? result.text : ""
    const noteId = result ? result.id : id
    dispatch(createSetNote(itineraryId, noteId!, newText))
    return true
  }

  const clear = () => dispatch(createClear())

  useEffect(() => {
    initialize()
  }, [])

  return [itineraries, { initialize, add, move, remove, setNote, clear }]
}
export default useItineraries
