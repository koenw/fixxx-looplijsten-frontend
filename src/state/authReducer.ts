type Action =
  | { type: "INITIALIZE", payload: { authToken?: AuthToken } }
  | { type: "START_FETCHING" }
  | { type: "AUTHENTICATE", payload: { authToken: AuthToken } }
  | { type: "SET_ERROR_MESSAGE", payload: { errorMessage: ErrorMessage } }
  | { type: "UNAUTHENTICATE" }
  | { type: "CLEAR" }

export const createInitialize = (authToken?: AuthToken) : Action => ({ type: "INITIALIZE", payload: { authToken } })
export const createStartFetching = () : Action => ({ type: "START_FETCHING" })
export const createAuthenticate = (authToken: AuthToken) : Action => ({ type: "AUTHENTICATE", payload: { authToken } })
export const createSetErrorMessage = (errorMessage: ErrorMessage) : Action => ({ type: "SET_ERROR_MESSAGE", payload: { errorMessage } })
export const createUnAuthenticate = () : Action => ({ type: "UNAUTHENTICATE" })
export const createClear = () : Action => ({ type: "CLEAR" })

export const initialState: AuthState = {
  isInitialized: false,
  isFetching: false,
  authToken: undefined,
  errorMessage: undefined
}

const reducer = (state: AuthState, action: Action) : AuthState => {
  switch (action.type) {
    case "INITIALIZE": {
      const isInitialized = true
      const { authToken } = action.payload
      return { ...state, isInitialized, authToken }
    }
    case "START_FETCHING": {
      const isFetching = true
      const errorMessage = undefined
      return { ...state, isFetching, errorMessage }
    }
    case "AUTHENTICATE": {
      const isFetching = false
      const { authToken } = action.payload
      return { ...state, isFetching, authToken }
    }
    case "SET_ERROR_MESSAGE": {
      const isFetching = false
      const { errorMessage } = action.payload
      return { ...state, isFetching, errorMessage }
    }
    case "UNAUTHENTICATE": {
      const authToken = undefined
      return { ...state, authToken }
    }
    case "CLEAR": {
      const isInitialized = false
      const authToken = undefined
      return { ...state, isInitialized, authToken }
    }
    default:
      return state
  }
}

export default reducer
