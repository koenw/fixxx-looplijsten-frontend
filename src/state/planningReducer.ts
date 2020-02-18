type Action =
  | { type: "START_FETCHING" }
  | { type: "SET_RESULTS", payload: { results: PlanningData } }
  | { type: "SET_ERROR", payload: { errorMessage: ErrorMessage } }
  | { type: "CLEAR" }

export const createStartFetching = () : Action => ({ type: "START_FETCHING" })
export const createSetResults = (results: PlanningData) : Action => ({ type: "SET_RESULTS", payload: { results } })
export const createSetError = (errorMessage: ErrorMessage) : Action => ({ type: "SET_ERROR", payload: { errorMessage } })
export const createClear = () : Action => ({ type: "CLEAR" })

export const initialState: PlanningState = {
  isFetching: false,
  results: undefined,
  timestamp: undefined,
  errorMessage: undefined
}

const reducer = (state: PlanningState, action: Action) : PlanningState => {
  switch (action.type) {
    case "START_FETCHING": {
      const isFetching = true
      const errorMessage = undefined
      const results = undefined
      return { ...state, isFetching, results, errorMessage }
    }
    case "SET_RESULTS": {
      const isFetching = false
      const { results } = action.payload
      const timestamp = new Date()
      return { ...state, isFetching, results, timestamp }
    }
    case "SET_ERROR": {
      const { errorMessage } = action.payload
      const isFetching = false
      return { ...state, isFetching, errorMessage }
    }
    case "CLEAR":
      return initialState
    default:
      return state
  }
}

export default reducer
