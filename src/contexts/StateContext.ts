import { createContext } from "react"
import noop from "../utils/noop"

type Value = {
  state: {
    auth: AuthState,
    authActions: AuthActions,

    parse: string
    setParse: (a: string) => void

    hasItinerary: (a: CaseId) => boolean
    itineraries: ItinerariesState
    itinerariesActions: ItinerariesActions

    search: SearchState
    searchActions: SearchActions

    isAnonymous: boolean
    toggleIsAnonymous: () => void

    authenticate: (a: Email, b: Password) => void

    clear: () => void
  }
}

const value = {
  state: {
    auth: {
      isInitialized: false,
      authToken: undefined
    },
    authActions: {
      initialize: () => false,
      authenticate: async (a: Email, b: Password) => false,
      authenticateToken: (a: AuthToken) => {},
      unAuthenticate: noop,
      clear: noop
    },

    parse: "",
    setParse: noop,

    hasItinerary: () => false,
    itineraries: {
      isFetching: false,
      isInitialized: false,
      itineraries: [],
      errorMessage: undefined
    },
    itinerariesActions: {
      initialize: noop,
      add: noop,
      move: noop,
      remove: noop,
      setNote: async () => false,
      clear: noop
    },

    search: {
      query: undefined,
      results: []
    },
    searchActions: {
      search: (a: PostalCode, b: string, c: Suffix) => {}
    },

    isAnonymous: false,
    toggleIsAnonymous: noop,

    authenticate: async (a: Email, b: Password) => {},

    clear: noop
  }
} as Value

const StateContext = createContext(value)

export default StateContext
