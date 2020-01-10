type Results = BWVData[]
type Action = {
  type: string
  payload: {
    query?: Query
    results?: Results
    errorMessage?: ErrorMessage
  }
}

const SEARCH = "SEARCH"
const SET_RESULTS = "SET_RESULTS"
const SET_ERROR = "SET_ERROR"

export const createSearch = (query?: Query) => ({ type: SEARCH, payload: { query } })
export const createSetResults = (results?: Results) => ({ type: SET_RESULTS, payload: { results } })
export const createSetError = (errorMessage?: ErrorMessage) => ({ type: SET_ERROR, payload: { errorMessage } })

export const initialState: SearchState = {
  isFetching: false,
  query: undefined,
  results: undefined,
  errorMessage: undefined
}

const reducer = (state: SearchState, action: Action) : SearchState => {
  switch (action.type) {
    case SEARCH: {
      const { query } = action.payload
      const isFetching = true
      const results = undefined
      return { ...state, isFetching, query, results }
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
