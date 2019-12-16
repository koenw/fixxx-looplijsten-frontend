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
import { getUrl } from "../config/domain"
import authToken from "../utils/authToken"
import calculateNewPosition from "../utils/calculateNewPosition"

const useItineraries = () : [ItinerariesState, ItinerariesActions] => {

  const [itinerariesState, dispatch] = useReducer(reducer, initialState as never)

  useEffect(() => {
    (async () => {
      try {
        const url = getUrl("itineraries")
        const token = authToken.get()
        const headers = { Authorization: `Token ${ token }` }
        const response = await fetch(url, { headers })
        const data = await response.json()
        const itineraries = data.items as Itineraries
        dispatch(initialize(itineraries))
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  const add = (caseId: CaseId) => {

    (async () => {
      try {
        const url = getUrl("itineraries/items")
        const token = authToken.get()
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Token ${ token }`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: caseId })
        })
        if (response.ok) {
          const data = await response.json()
          const newItinerary = data as Itinerary
          const newItineraries = [newItinerary] as Itineraries
          dispatch(createAdd(newItineraries))
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }

  const move = (index: Index, newIndex: Index) => {

    const patch = async (id: Id, position: number) => {
      try {
        const path = `itineraries/items/${ id }`
        const url = getUrl(path)
        const token = authToken.get()
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            Authorization: `Token ${ token }`,
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ position })
        })
        if (response.ok) {
          const itinerary = await response.json()
          dispatch(createUpdate(id, itinerary))
        } else {
          console.error(response)
        }
      } catch (err) {
        console.error(err)
      }
    }

    dispatch(createMove(index, newIndex))

    const { itineraries } = itinerariesState
    const position = calculateNewPosition(itineraries, index, newIndex)
    const id = itineraries[index].id
    patch(id, position)
  }

  const remove = (id: Id) => {

    const del = async () => {
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
          dispatch(createRemove(id))
        }
      } catch (err) {
        console.error(err)
      }
    }

    del()
  }

  const setNote = async (itineraryId: Id, text: string, id?: Id) => {

    try {
      const path = `notes/${ id || "" }`
      const url = getUrl(path)
      const method = text === "" ? "DELETE" : id !== undefined ? "PUT" : "POST"
      const token = authToken.get()
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Token ${ token }`,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ itinerary_item: itineraryId, text })
      })
      if (response.ok) {
        let text = ""
        let noteId = id
        if (method !== "DELETE") {
          const note = await response.json()
          text = note.text
          noteId = note.id
        }
        dispatch(createSetNote(itineraryId, noteId!, text))
        return true
      }
      return false
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const clear = () => dispatch(createClear())

  return [itinerariesState, { add, move, remove, setNote, clear }]
}
export default useItineraries
