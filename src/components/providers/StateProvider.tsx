import React, { FC, ReactNode, useState, useEffect } from "react"
import StateContext from '../../contexts/StateContext'
import parseLocationSearch from "../../utils/parseLocationSearch"
import useItineraries from "../../state/useItineraries"

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {

  // search
  const [postalCode, setPostalCode] = useState("")
  const [streetNumber, setStreetNumber] = useState("")
  const [suffix, setSuffix] = useState("")
  const setSearch = (postalCode: string, streetNumber: string, suffix: string) => {
    setPostalCode(postalCode)
    setStreetNumber(streetNumber)
    setSuffix(suffix)
  }

  // parse
  const [parse, setParse] = useState("")

  // itineraries
  const [itinerariesState, itinerariesActions] = useItineraries() as [ItinerariesState, ItinerariesActions]
  const hasItinerary = (caseId: CaseId) => itinerariesState.itineraries.filter(itinerary => itinerary.case.bwv_data.case_id === caseId).length > 0

  // anonymous
  const [isAnonymous, setIsAnonymous] = useState(false)
  useEffect(() => {
    const anonymous = parseLocationSearch(window.location.search).anonymous
    const isAnonymous = anonymous === "1"
    setIsAnonymous(isAnonymous)
  }, [])
  const toggleIsAnonymous = () => {
    setIsAnonymous(!isAnonymous)
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

      isAnonymous,
      toggleIsAnonymous,

      hasItinerary,
      itinerariesState,
      itinerariesActions
    }
  }

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  )
}
export default StateProvider
