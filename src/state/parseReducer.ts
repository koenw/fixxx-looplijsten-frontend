type Results = BWVData[]
type Action = {
  type: string
  payload: {
    query?: string
    results?: SearchResults
    errorMessage?: ErrorMessage
  }
}

const START_FETCHING = "START_FETCHING"
const SET_RESULTS = "SET_RESULTS"
const SET_ERROR = "SET_ERROR"

export const createStartFetching = (query?: string) => ({ type: START_FETCHING, payload: { query } })
export const createSetResults = (results?: SearchResults) => ({ type: SET_RESULTS, payload: { results } })
export const createSetError = (errorMessage?: ErrorMessage) => ({ type: SET_ERROR, payload: { errorMessage } })

export const initialState: ParseState = {
  isFetching: false,
  query: undefined,
  results: undefined,
  errorMessage: undefined
}

const reducer = (state: ParseState, action: Action) : ParseState => {
  switch (action.type) {
    case START_FETCHING: {
      const { query } = action.payload
      const isFetching = true
      const errorMessage = undefined
      const results = undefined
      return { ...state, isFetching, query, results, errorMessage }
    }
    case SET_RESULTS: {
      const isFetching = false
      const { results = [] } = action.payload
      return { ...state, isFetching, results }
    }
    case SET_ERROR: {
      const { errorMessage } = action.payload
      const isFetching = false
      return { ...state, isFetching, errorMessage }
    }
    default:
      return state
  }
}

export default reducer
