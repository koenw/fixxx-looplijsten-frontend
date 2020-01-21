type Action =
  | { type: "START_FETCHING", payload: { query: Query } }
  | { type: "SET_RESULTS", payload: { results: SearchResults } }
  | { type: "SET_ERROR", payload: { errorMessage: ErrorMessage } }
  | { type: "CLEAR" }

export const createStartFetching = (query: Query) : Action => ({ type: "START_FETCHING", payload: { query } })
export const createSetResults = (results: SearchResults) : Action => ({ type: "SET_RESULTS", payload: { results } })
export const createSetError = (errorMessage: ErrorMessage) : Action => ({ type: "SET_ERROR", payload: { errorMessage } })
export const createClear = () : Action => ({ type: "CLEAR" })

export const initialState: SearchState = {
  isFetching: false,
  query: undefined,
  results: undefined,
  errorMessage: undefined
}

const reducer = (state: SearchState, action: Action) : SearchState => {
  switch (action.type) {
    case "START_FETCHING": {
      const { query } = action.payload
      const isFetching = true
      const errorMessage = undefined
      const results = undefined
      return { ...state, isFetching, query, results, errorMessage }
    }
    case "SET_RESULTS": {
      const isFetching = false
      const { results = [] } = action.payload
      return { ...state, isFetching, results }
    }
    case "SET_ERROR": {
      const { errorMessage } = action.payload
      const isFetching = false
      return { ...state, isFetching, errorMessage }
    }
    case "CLEAR": {
      return { ...state, query: undefined, results: undefined }
    }
    default:
      return state
  }
}

export default reducer
