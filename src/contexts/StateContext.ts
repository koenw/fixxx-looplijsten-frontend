import { createContext } from "react"
import noop from "../lib/utils/noop"
import { initialState as authState } from "../state/authReducer"
import { initialState as itinerariesState } from "../state/itinerariesReducer"
import { initialState as searchState } from "../state/searchReducer"
import { initialState as parseState } from "../state/parseReducer"
import { initialState as planningState } from "../state/planningReducer"

type Value = {
  state: {
    auth: AuthState,
    authActions: AuthActions,

    itineraries: ItinerariesState
    itinerariesActions: ItinerariesActions
    hasItinerary: (a: CaseId) => boolean
    getItineraryNote: (a: Id, b: Id) => ONote

    search: SearchState
    searchActions: SearchActions

    parse: ParseState
    parseActions: ParseActions

    planning: PlanningState
    planningActions: PlanningActions

    isAnonymous: boolean
    toggleIsAnonymous: () => void

    authenticate: (a: Email, b: Password) => void
    authenticateToken: (a: AuthToken) => void

    isInitialized: boolean

    clear: () => void
  }
}

const value = {
  state: {
    auth: authState,
    authActions: {
      initialize: async () => false,
      authenticate: async (a: Email, b: Password) => false,
      authenticateToken: (a: AuthToken) => false,
      unAuthenticate: noop,
    },

    itineraries: itinerariesState,
    itinerariesActions: {
      initialize: noop,
      add: noop,
      addMany: noop,
      move: noop,
      remove: noop,
      setNote: async () => false,
      clear: noop
    },
    hasItinerary: () => false,
    getItineraryNote: (a: Id, b: Id) => undefined,

    search: searchState,
    searchActions: {
      search: (a: PostalCode, b: StreetNumberString, c: StreetSuffix) => {},
      clear: noop
    },

    parse: parseState,
    parseActions: {
      parse: (a: string) => {},
      clear: noop
    },

    planning: planningState,
    planningActions: {
      initialize: noop,
      generate: (a: any) => {},
      clear: noop
    },

    isAnonymous: false,
    toggleIsAnonymous: noop,

    authenticate: async (a: Email, b: Password) => {},
    authenticateToken: (a: AuthToken) => {},

    isInitialized: false,

    clear: noop
  }
} as Value

const StateContext = createContext(value)

export default StateContext
