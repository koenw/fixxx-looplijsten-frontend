import { useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createStopFetching,
  createInitialize,
  createSetErrorMessage,
  createAdd,
  createUpdate,
  createMove,
  createRemove,
  createSetNote,
  createClear } from "./itinerariesReducer"
import { get, post, put, patch, del, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"
import promiseSerial from "../lib/utils/promiseSerial"
import calculateNewPosition from "../lib/calculateNewPosition"

const useItineraries = () : [ItinerariesState, ItinerariesActions] => {

  const [itinerariesState, dispatch] = useReducer(reducer, initialState as never)

  const initialize = async () => {
    const url = getUrl("itineraries")
    dispatch(createStartFetching())
    const [response, result] = await get(url)
    if (isForbidden(response)) {
      dispatch(createStopFetching())
      return handleForbiddenResponse()
    }
    if (notOk(response)) {
      const errorMessage = response ? await response.body() : "Failed to GET"
      dispatch(createSetErrorMessage(errorMessage))
      return
    }
    const itineraries = result.items as Itineraries
    dispatch(createInitialize(itineraries))
  }

  const add = async (caseId: CaseId) => {
    const url = getUrl("itineraries/items")
    const [response, result] = await post(url, { id: caseId })
    if (isForbidden(response)) return handleForbiddenResponse()
    if (notOk(response)) return alert(`Toevoegen mislukt (case: ${ caseId })`)
    const itinerary = result as Itinerary
    const itineraries = [itinerary] as Itineraries
    dispatch(createAdd(itineraries))
  }

  const addMany = async (caseIds: CaseIds) => {
    // sequentially add each case to itineraries, so order is maintained
    const funcs = caseIds.map(caseId => async () => add(caseId))
    await promiseSerial(funcs)
  }

  const move = (index: Index, newIndex: Index) => {

    const patchPosition = async (id: Id, position: ItineraryPosition) => {
      const url = getUrl(`itineraries/items/${ id }`)
      const [response, result] = await patch(url, { position })
      if (isForbidden(response)) return handleForbiddenResponse()
      if (notOk(response)) return alert("Verplaatsen mislukt")
      const itinerary = result as Itinerary
      dispatch(createUpdate(id, itinerary))
    }

    dispatch(createMove(index, newIndex))

    const { itineraries: items } = itinerariesState
    const position = calculateNewPosition(items, index, newIndex)
    const id = items[index].id
    patchPosition(id, position)
  }

  const remove = async (id: Id) => {
    const url = getUrl(`itineraries/items/${ id }`)
    const [response] = await del(url)
    if (isForbidden(response)) return handleForbiddenResponse()
    if (notOk(response)) return alert("Verwijderen mislukt")
    dispatch(createRemove(id))
  }

  const setNote = async (itineraryId: Id, text: string, id?: Id) => {

    const url = getUrl(`notes/${ id || "" }`)
    const method = text === "" ? del : id !== undefined ? put : post
    const body = { itinerary_item: itineraryId, text }
    const [response, result] = await method(url, body)
    if (isForbidden(response)) {
      handleForbiddenResponse()
      return false
    }
    if (notOk(response)) {
      alert("Bewaren mislukt")
      return false
    }
    const newText = result ? result.text : ""
    const noteId = result ? result.id : id
    dispatch(createSetNote(itineraryId, noteId!, newText))
    return true
  }

  const clear = () => dispatch(createClear())

  return [itinerariesState, { initialize, add, addMany, move, remove, setNote, clear }]
}
export default useItineraries
