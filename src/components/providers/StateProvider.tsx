import React, { FC, ReactNode, useState, useEffect } from "react"
import StateContext from '../../contexts/StateContext'
import parseLocationSearch from "../../utils/parseLocationSearch"
import useAuth from "../../state/useAuth"
import useItineraries from "../../state/useItineraries"

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {

  // auth
  const [auth, authActions] = useAuth() as [AuthState, AuthActions]

  // search
  const [postalCode, setPostalCode] = useState("")
  const [streetNumber, setStreetNumber] = useState("")
  const [suffix, setSuffix] = useState("")
  const search = { postalCode, streetNumber, suffix }
  const setSearch = (postalCode: string, streetNumber: string, suffix: string) => {
    setPostalCode(postalCode)
    setStreetNumber(streetNumber)
    setSuffix(suffix)
  }

  // parse
  const [parse, setParse] = useState("")

  // itineraries
  const [itineraries, itinerariesActions] = useItineraries() as [ItinerariesState, ItinerariesActions]
  const hasItinerary = (caseId: CaseId) => itineraries.itineraries.filter(itinerary => itinerary.case.bwv_data.case_id === caseId).length > 0

  // anonymous
  const [isAnonymous, setIsAnonymous] = useState(false)
  const toggleIsAnonymous = () => {
    setIsAnonymous(!isAnonymous)
  }
  useEffect(() => {
    const anonymous = parseLocationSearch(window.location.search).anonymous
    const isAnonymous = anonymous === "1"
    setIsAnonymous(isAnonymous)
  }, [])

  // clear
  const clear = () => {
    itinerariesActions.clear()
    authActions.clear()
  }

  const value = {
    state: {
      auth,
      authActions,

      search,
      setSearch,

      parse,
      setParse,

      hasItinerary,
      itineraries,
      itinerariesActions,

      isAnonymous,
      toggleIsAnonymous,

      clear
    }
  }

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  )
}
export default StateProvider
