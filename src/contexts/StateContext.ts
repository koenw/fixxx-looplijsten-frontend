import { createContext } from "react"
import noop from "../utils/noop"

type Value = {
  state: {
    //itineraries: Itineraries
    search: {
      postalCode: string
      streetNumber: string
      suffix: string
    }
    setSearch: (a: string, b: string, c: string) => void
    parse: string
    setParse: (a: string) => void
    itineraries: Itineraries
    itinerariesIsFetching: boolean,
    itinerariesErrorMessage: ErrorMessage,
    setItineraries: (a: Itineraries) => void
    hasItinerary: (a: CaseId) => boolean
    addItinerary: (a: Itinerary | Itineraries) => void
    removeItinerary: (a: Itinerary) => void
    removeAllItineraries: () => void
    moveItinerary: (a: Index, b: Index) => void
    updateItineraryNote: (a: Id, b: Id, c: string) => void
    clearState: () => void

    isAnonymous: boolean,
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
    itineraries: [],
    itinerariesIsFetching: false,
    itinerariesErrorMessage: undefined,
    setItineraries: noop,
    hasItinerary: () => false,
    addItinerary: noop,
    removeItinerary: noop,
    removeAllItineraries: noop,
    moveItinerary: noop,
    updateItineraryNote: noop,

    clearState: noop,

    isAnonymous: false,
    toggleIsAnonymous: noop
  }
} as Value

const StateContext = createContext(value)

export default StateContext
