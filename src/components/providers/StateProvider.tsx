import React, { FC, ReactNode, useState } from "react"
import StateContext from '../../contexts/StateContext'
import useFetch from "../../hooks/useFetch"
import moveInArray from "../../utils/moveInArray"
import { getUrl } from "../../config/domain"
import authToken from "../../utils/authToken"

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {

  const [postalCode, setPostalCode] = useState("")
  const [streetNumber, setStreetNumber] = useState("")
  const [suffix, setSuffix] = useState("")
  const setSearch = (postalCode: string, streetNumber: string, suffix: string) => {
    setPostalCode(postalCode)
    setStreetNumber(streetNumber)
    setSuffix(suffix)
  }

  const [parse, setParse] = useState("")

  const [itineraries, setItineraries] = useState<Itineraries>([])
  const hasItinerary = (caseId: CaseId) => itineraries.filter(itinerary => itinerary.case.bwv_data.case_id === caseId).length > 0
  const addItinerary = (itinerary: Itinerary | Itineraries) => {
    setItineraries(itineraries.concat(itinerary))
  }
  const removeItinerary = (itinerary: Itinerary) => {
    setItineraries(itineraries.filter(i => itinerary.id !== i.id))
  }
  const moveItinerary = (index: Index, newIndex: Index) => {

    const patch = async (id: Id, position: number) => {
      try {
        const path = `itineraries/items/${ id }`
        const url = getUrl(path)
        const token = authToken.get()
        return fetch(url, {
          method: "PATCH",
          headers: {
            Authorization: `Token ${ token }`,
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ position })
        })
      } catch (err) {
        console.error(err)
      }
    }

    const reorderedItineraries = moveInArray(itineraries, index, newIndex)
    const currentPrevPosition = newIndex > 0 ? reorderedItineraries[newIndex - 1].position : 0
    const length = reorderedItineraries.length
    const currentNextPosition = newIndex < length - 1 ? reorderedItineraries[newIndex + 1].position : undefined
    const position = currentNextPosition ? currentPrevPosition + (currentNextPosition - currentPrevPosition) / 2 : reorderedItineraries[length - 1].position + 10
    reorderedItineraries[newIndex].position = position
    setItineraries(reorderedItineraries)
    const id = reorderedItineraries[newIndex].id
    patch(id, position)
  }
  const removeAllItineraries = () => {
    const del = async (id: Id) => {
      try {
        const url = getUrl(`itineraries/items/${ id }`)
        const token = authToken.get()
        return await fetch(url, {
          method: "Delete",
          headers: {
            Accept: "application/json",
            Authorization: `Token ${ token }`,
            "Content-Type": "application/json"
          }
        })
      } catch (err) {
        console.error(err)
      }
    }
    const promises = itineraries.map(itinerary => del(itinerary.id))
    Promise.all(promises).then(() => setItineraries([]))
  }
  const updateItineraryNote = (itineraryId: Id, id: Id, text: string) => {
    const index = itineraries.findIndex(itinerary => itinerary.id === itineraryId)
    if (index === -1) return
    const clone = [...itineraries]
    const note = { itinerary_item: itineraryId, id, text }
    clone[index].notes[0] = note
    setItineraries(clone)
  }

  type Result = {
    id: Id
    items: Itineraries
    user: string
  }
  const [isFetched, setIsFetched] = useState(false)
  const [result, isFetching, errorMessage] = useFetch("itineraries", true) as [Result, boolean, ErrorMessage]
  if (result !== undefined && Array.isArray(result.items)) {
    if (isFetched === false) {
      setIsFetched(true)
      setItineraries(result.items)
    }
  }

  const value = {
    state: {
      search: {
        postalCode,
        streetNumber,
        suffix
      },
      setSearch,
      parse,
      setParse,
      itineraries,
      itinerariesIsFetching: isFetching,
      itinerariesErrorMessage: errorMessage,
      setItineraries,
      hasItinerary,
      addItinerary,
      removeItinerary,
      removeAllItineraries,
      moveItinerary,
      updateItineraryNote
    }
  }

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  )
}
export default StateProvider
