import React, { FC, ReactNode, useState, useEffect } from "react"
import { navigate } from "@reach/router"
import StateContext from '../../contexts/StateContext'
import useAuth from "../../state/useAuth"
import useItineraries from "../../state/useItineraries"
import useSearch from "../../state/useSearch"
import parseLocationSearch from "../../utils/parseLocationSearch"
import authToken from "../../utils/authToken"

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

  // authenticate
  const authenticate = async (email: Email, password: Password) => {
    const isSuccess = await authActions.authenticate(email, password)
    if (isSuccess) initialize()
  }

  // initialize
  const initialize = () => {

    console.log("StateProvider initialize")

    if (itineraries.isInitialized) return

    console.log("authActions initialize")
    const isAuthenticated = authActions.initialize()
    if (!isAuthenticated) return

    console.log("itinerariesActions initialize")
    itinerariesActions.initialize()
  }

  // deinitialize
  const clear = () => {
    authActions.clear()
    itinerariesActions.clear()
  }

  // initialize
  useEffect(() => {

    const anonymous = parseLocationSearch(window.location.search).anonymous
    const isAnonymous = anonymous === "1"
    setIsAnonymous(isAnonymous)

    initialize()
  }, [])

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

      authenticate,

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
