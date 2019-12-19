import { createContext } from "react"
import noop from "../utils/noop"

type Value = {
  state: {
    search: {
      postalCode: string
      streetNumber: string
      suffix: string
    }
    setSearch: (a: string, b: string, c: string) => void

    parse: string
    setParse: (a: string) => void

    hasItinerary: (a: CaseId) => boolean
    itineraries: ItinerariesState
    itinerariesActions: ItinerariesActions

    isAnonymous: boolean
    toggleIsAnonymous: () => void
  }
}

const value = {
  state: {
    search: {
      postalCode: "",
      streetNumber: "",
      suffix: ""
    },
    setSearch: noop,

    parse: "",
    setParse: noop,

    hasItinerary: () => false,
    itineraries: {
      itineraries: [],
      isInitialized: false,
      isUpdating: false
    },
    itinerariesActions: {
      add: noop,
      move: noop,
      remove: noop,
      setNote: async () => false,
      clear: noop
    },

    isAnonymous: false,
    toggleIsAnonymous: noop,
  }
} as Value

const StateContext = createContext(value)

export default StateContext
