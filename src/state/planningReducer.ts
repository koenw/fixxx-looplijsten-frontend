type Action =
  | { type: "START_FETCHING" }
  | { type: "SET_RESULTS", payload: { results: any } }
  | { type: "SET_ERROR", payload: { errorMessage: ErrorMessage } }

export const createStartFetching = () : Action => ({ type: "START_FETCHING" })
export const createSetResults = (results: any) : Action => ({ type: "SET_RESULTS", payload: { results } })
export const createSetError = (errorMessage: ErrorMessage) : Action => ({ type: "SET_ERROR", payload: { errorMessage } })

export const initialState: PlanningState = {
  isFetching: false,
  results: undefined,
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
      return { ...state, isFetching, results }
    }
    case "SET_ERROR": {
      const { errorMessage } = action.payload
      const isFetching = false
      return { ...state, isFetching, errorMessage }
    }
    default:
      return state
  }
}

export default reducer
