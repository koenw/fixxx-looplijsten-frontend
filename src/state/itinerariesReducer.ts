import moveInArray from "../utils/moveInArray"

type Action = {
  type: string
  payload: {
    itineraries?: Itineraries
    itinerary?: Itinerary
    id?: Id
    index?: Index
    newIndex?: Index
    noteId?: Id
    note?: string
  }
}

const START_FETCHING = "START_FETCHING"
const INITIALIZE = "INITIALIZE"
const ADD = "ADD"
const UPDATE = "UPDATE"
const MOVE = "MOVE"
const REMOVE = "REMOVE"
const SET_NOTE = "SET_NOTE"
const CLEAR = "CLEAR"

export const createStartFetching = () => ({ type: START_FETCHING, payload: {} })
export const createInitialize = (itineraries: Itineraries) => ({ type: INITIALIZE, payload: { itineraries } })
export const createAdd = (itineraries: Itineraries) => ({ type: ADD, payload: { itineraries } })
export const createUpdate = (id: Id, itinerary: Itinerary) => ({ type: UPDATE, payload: { id, itinerary } })
export const createMove = (index: Index, newIndex: Index) => ({ type: MOVE, payload: { index, newIndex } })
export const createRemove = (id: Id) => ({ type: REMOVE, payload: { id } })
export const createSetNote = (id: Id, noteId: Id, note: string) => ({ type: SET_NOTE, payload: { id, noteId, note } })
export const createClear = () => ({ type: CLEAR, payload: {} })

export const initialState: ItinerariesState = {
  isInitialized: false,
  isFetching: false,
  itineraries: []
}

const reducer = (state: ItinerariesState, action: Action) : ItinerariesState => {
  switch (action.type) {
    case START_FETCHING: {
      return { ...state, isFetching: true }
    }
    case INITIALIZE: {
      const isInitialized = true
      const isFetching = false
      const { itineraries = [] } = action.payload
      return { ...state, isInitialized, isFetching, itineraries }
    }
    case ADD: {
      const { itineraries: prevItineraries } = state
      const { itineraries } = action.payload
      return { ...state, itineraries: prevItineraries.concat(itineraries!) }
    }
    case UPDATE: {
      const { itineraries: prevItineraries } = state
      const index = prevItineraries!.findIndex(itinerary => itinerary.id === action.payload.id)
      const itineraries = [...prevItineraries]
      itineraries[index] = action.payload.itinerary!
      return { ...state, itineraries }
    }
    case MOVE: {
      const { itineraries: prevItineraries } = state
      const { index, newIndex } = action.payload
      const itineraries = moveInArray(prevItineraries, index!, newIndex!)
      return { ...state, itineraries }
    }
    case REMOVE: {
      const { itineraries: prevItineraries } = state
      const { id } = action.payload
      const itineraries = prevItineraries.filter(itinerary => itinerary.id !== id)
      return { ...state, itineraries }
    }
    case SET_NOTE: {
      const { itineraries: prevItineraries } = state
      const { id, noteId, note } = action.payload
      const index = prevItineraries!.findIndex(itinerary => itinerary.id === id!)
      const itineraries = [...prevItineraries]
      if (note! !== "") {
        itineraries[index].notes[0] = { id: noteId!, itinerary_item: id!, text: note! }
      } else {
        itineraries[index].notes = []
      }
      return { ...state, itineraries }
    }
    case CLEAR: {
      return { ...state, isInitialized: false, itineraries: [] }
    }
    default:
      return state
  }
}

export default reducer
