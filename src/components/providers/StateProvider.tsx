import React, { FC, ReactNode, useState, useEffect } from "react"
import StateContext from '../../contexts/StateContext'
import useAuth from "../../state/useAuth"
import useItineraries from "../../state/useItineraries"
import useSearch from "../../state/useSearch"
import useParse from "../../state/useParse"
import parseLocationSearch from "../../utils/parseLocationSearch"

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {

  // auth
  const [auth, authActions] = useAuth() as [AuthState, AuthActions]

  // itineraries
  const [itineraries, itinerariesActions] = useItineraries() as [ItinerariesState, ItinerariesActions]
  const hasItinerary = (caseId: CaseId) => itineraries.itineraries.filter(itinerary => itinerary.case.bwv_data.case_id === caseId).length > 0

  // anonymous
  const [isAnonymous, setIsAnonymous] = useState(false)
  const toggleIsAnonymous = () => setIsAnonymous(!isAnonymous)

  // search
  const [search, searchActions] = useSearch() as [SearchState, SearchActions]

  // parse
  const [parse, parseActions] = useParse() as [ParseState, ParseActions]

  // authenticate
  const authenticate = async (email: Email, password: Password) => {
    const isSuccess = await authActions.authenticate(email, password)
    if (isSuccess) initialize()
  }

  const authenticateToken = (token: AuthToken) => {
    authActions.authenticateToken(token)
    initialize()
  }

  // initialize
  const initialize = () => {
    if (itineraries.isInitialized) return

    const isAuthenticated = authActions.initialize()
    if (!isAuthenticated) return

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

      hasItinerary,
      itineraries,
      itinerariesActions,

      isAnonymous,
      toggleIsAnonymous,

      search,
      searchActions,

      parse,
      parseActions,

      authenticate,
      authenticateToken,

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
