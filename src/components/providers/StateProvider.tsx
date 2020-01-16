import React, { FC, ReactNode, useState, useEffect } from "react"
import StateContext from '../../contexts/StateContext'
import useAuth from "../../state/useAuth"
import useItineraries from "../../state/useItineraries"
import useSearch from "../../state/useSearch"
import useParse from "../../state/useParse"
import parseLocationSearch from "../../lib/utils/parseLocationSearch"

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {

  // auth
  const [auth, authActions] = useAuth()

  // itineraries
  const [itineraries, itinerariesActions] = useItineraries()
  const getItinerary = (caseId: CaseId) : OItinerary => itineraries.itineraries.find(itinerary => itinerary.case.bwv_data.case_id === caseId)
  const hasItinerary = (caseId: CaseId) => getItinerary(caseId) !== undefined
  const getItineraryNote = (itineraryId: Id, id: Id) : ONote => {
    const itinerary = itineraries.itineraries.find(itinerary => itinerary.id === itineraryId)
    if (itinerary === undefined) return
    return itinerary.notes.find(note => note.id === id)
  }

  // search
  const [search, searchActions] = useSearch()

  // parse
  const [parse, parseActions] = useParse()

  // anonymous
  const [isAnonymous, setIsAnonymous] = useState(false)
  const toggleIsAnonymous = () => setIsAnonymous(!isAnonymous)

  // authenticate
  const authenticate = async (email: Email, password: Password) => {
    const isSuccess = await authActions.authenticate(email, password)
    if (isSuccess) initialize()
  }

  const authenticateToken = (token: AuthToken) => {
    const isSuccess = authActions.authenticateToken(token)
    if (isSuccess) initialize()
  }

  // initialize
  const isInitialized = auth.isInitialized && itineraries.isInitialized
  const initialize = async () => {
    if (isInitialized) return

    const isAuthenticated = await authActions.initialize()
    if (!isAuthenticated) return

    itinerariesActions.initialize()
  }

  // clear
  const clear = () => {
    authActions.unAuthenticate()
    itinerariesActions.clear()
  }

  // initialization
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

      itineraries,
      itinerariesActions,
      hasItinerary,
      getItineraryNote,

      search,
      searchActions,

      parse,
      parseActions,

      isAnonymous,
      toggleIsAnonymous,

      authenticate,
      authenticateToken,

      isInitialized,

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
