import { createContext } from "react"
import noop from "../utils/noop"
import { initialState as authState } from "../state/authReducer"
import { initialState as itinerariesState } from "../state/itinerariesReducer"
import { initialState as searchState } from "../state/searchReducer"

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
    authenticateToken: (a: AuthToken) => void

    clear: () => void
  }
}

const value = {
  state: {
    auth: authState,
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
    itineraries: itinerariesState,
    itinerariesActions: {
      initialize: noop,
      add: noop,
      move: noop,
      remove: noop,
      setNote: async () => false,
      clear: noop
    },

    search: searchState,
    searchActions: {
      search: (a: PostalCode, b: string, c: Suffix) => {}
    },

    isAnonymous: false,
    toggleIsAnonymous: noop,

    authenticate: async (a: Email, b: Password) => {},
    authenticateToken: (a: AuthToken) => {},

    clear: noop
  }
} as Value

const StateContext = createContext(value)

export default StateContext
