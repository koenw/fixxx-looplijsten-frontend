type Action =
  | { type: "START_FETCHING", payload: { query: string } }
  | { type: "SET_RESULTS", payload: { results: SearchResults } }
  | { type: "SET_ERROR", payload: { errorMessage: ErrorMessage } }

export const createStartFetching = (query: string) : Action => ({ type: "START_FETCHING", payload: { query } })
export const createSetResults = (results: SearchResults) : Action => ({ type: "SET_RESULTS", payload: { results } })
export const createSetError = (errorMessage: ErrorMessage) : Action => ({ type: "SET_ERROR", payload: { errorMessage } })

export const initialState: ParseState = {
  isFetching: false,
  query: undefined,
  results: undefined,
  errorMessage: undefined
}

const reducer = (state: ParseState, action: Action) : ParseState => {
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
    default:
      return state
  }
}

export default reducer
