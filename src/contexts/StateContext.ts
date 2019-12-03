import { createContext } from "react"
import noop from "../utils/noop"

type Value = {
  state: {
    //itineraries: Itineraries
    search: {
      postalCode: string
      streetNumber: string
      suffix: string
    },
    setSearch: (a: string, b: string, c: string) => void
    parse: string
    setParse: (a: string) => void,
    itineraries: Itineraries,
    setItineraries: (a: Itineraries) => void
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
    setItineraries: noop
  }
} as Value

const StateContext = createContext(value)

export default StateContext
