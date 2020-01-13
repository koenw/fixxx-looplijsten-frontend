import { createContext } from "react"
import noop from "../utils/noop"
import { initialState as authState } from "../state/authReducer"
import { initialState as itinerariesState } from "../state/itinerariesReducer"
import { initialState as searchState } from "../state/searchReducer"
import { initialState as parseState } from "../state/parseReducer"

type Value = {
  state: {
    auth: AuthState,
    authActions: AuthActions,

    hasItinerary: (a: CaseId) => boolean
    itineraries: ItinerariesState
    itinerariesActions: ItinerariesActions

    search: SearchState
    searchActions: SearchActions

    parse: ParseState
    parseActions: ParseActions

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

    parse: parseState,
    parseActions: {
      parse: (a: string) => {}
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
