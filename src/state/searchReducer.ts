type Results = BWVData[]
type Action = {
  type: string
  payload: {
    query?: Query
    results?: Results
  }
}

const SEARCH = "SEARCH"
const SET_RESULTS = "SET_RESULTS"

export const createSearch = (query?: Query) => ({ type: SEARCH, payload: { query } })
export const createSetResults = (results?: Results) => ({ type: SET_RESULTS, payload: { results } })

export const initialState: SearchState = {
  query: undefined,
  results: []
}

const reducer = (state: SearchState, action: Action) : SearchState => {
  switch (action.type) {
    case SEARCH: {
      const { query } = action.payload
      const results: Results = []
      return { ...state, query, results }
    }
    case SET_RESULTS: {
      const { results = [] } = action.payload
      return { ...state, results }
    }
    default:
      return state
  }
}

export default reducer
