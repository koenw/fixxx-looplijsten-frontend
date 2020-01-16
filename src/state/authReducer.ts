type Action =
  | { type: "INITIALIZE", payload: { token?: AuthToken } }
  | { type: "START_FETCHING" }
  | { type: "AUTHENTICATE", payload: { token: AuthToken } }
  | { type: "SET_ERROR_MESSAGE", payload: { errorMessage: ErrorMessage } }
  | { type: "UNAUTHENTICATE" }

export const createInitialize = (token?: AuthToken) : Action => ({ type: "INITIALIZE", payload: { token } })
export const createStartFetching = () : Action => ({ type: "START_FETCHING" })
export const createAuthenticate = (token: AuthToken) : Action => ({ type: "AUTHENTICATE", payload: { token } })
export const createSetErrorMessage = (errorMessage: ErrorMessage) : Action => ({ type: "SET_ERROR_MESSAGE", payload: { errorMessage } })
export const createUnAuthenticate = () : Action => ({ type: "UNAUTHENTICATE" })

export const initialState: AuthState = {
  isInitialized: false,
  isFetching: false,
  token: undefined,
  errorMessage: undefined
}

const reducer = (state: AuthState, action: Action) : AuthState => {
  switch (action.type) {
    case "INITIALIZE": {
      const isInitialized = true
      const { token } = action.payload
      return { ...state, isInitialized, token }
    }
    case "START_FETCHING": {
      const isFetching = true
      const token = undefined
      const errorMessage = undefined
      return { ...state, isFetching, token, errorMessage }
    }
    case "AUTHENTICATE": {
      const isFetching = false
      const { token } = action.payload
      return { ...state, isFetching, token }
    }
    case "SET_ERROR_MESSAGE": {
      const isFetching = false
      const { errorMessage } = action.payload
      return { ...state, isFetching, errorMessage }
    }
    case "UNAUTHENTICATE": {
      const token = undefined
      return { ...state, token }
    }
    default:
      return state
  }
}

export default reducer
