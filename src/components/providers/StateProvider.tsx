import React, { FC, ReactNode, useState, useEffect } from "react"
import StateContext from '../../contexts/StateContext'
import parseLocationSearch from "../../utils/parseLocationSearch"
import useAuth from "../../state/useAuth"
import useItineraries from "../../state/useItineraries"
import useSearch from "../../state/useSearch"

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {

  // auth
  const [auth, authActions] = useAuth() as [AuthState, AuthActions]

  // parse
  const [parse, setParse] = useState("")

  // itineraries
  const [itineraries, itinerariesActions] = useItineraries() as [ItinerariesState, ItinerariesActions]
  const hasItinerary = (caseId: CaseId) => itineraries.itineraries.filter(itinerary => itinerary.case.bwv_data.case_id === caseId).length > 0

  // anonymous
  const [isAnonymous, setIsAnonymous] = useState(false)
  const toggleIsAnonymous = () => setIsAnonymous(!isAnonymous)

  // search
  const [search, searchActions] = useSearch() as [SearchState, SearchActions]

  // initialize
  useEffect(() => {

    // anonymous
    const anonymous = parseLocationSearch(window.location.search).anonymous
    const isAnonymous = anonymous === "1"
    setIsAnonymous(isAnonymous)

    // auth

    // itineraries

    console.log("StateProvider initialize")

  }, [])

  // deinitialize
  const clear = () => {
    authActions.clear()
    itinerariesActions.clear()
  }

  const value = {
    state: {
      auth,
      authActions,

      parse,
      setParse,

      hasItinerary,
      itineraries,
      itinerariesActions,

      isAnonymous,
      toggleIsAnonymous,

      search,
      searchActions,

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
