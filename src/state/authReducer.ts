type Action = {
  type: string
  payload: {
    authToken?: AuthToken
    errorMessage?: ErrorMessage
  }
}

const INITIALIZE = "INITIALIZE"
const START_FETCHING = "START_FETCHING"
const AUTHENTICATE = "AUTHENTICATE"
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"
const UNAUTHENTICATE = "UNAUTHENTICATE"
const CLEAR = "CLEAR"

export const createInitialize = (authToken?: AuthToken) => ({ type: INITIALIZE, payload: { authToken } })
export const createStartFetching = () => ({ type: START_FETCHING, payload: {} })
export const createAuthenticate = (authToken: AuthToken) => ({ type: AUTHENTICATE, payload: { authToken } })
export const createSetErrorMessage = (errorMessage: ErrorMessage) => ({ type: SET_ERROR_MESSAGE, payload: { errorMessage } })
export const createUnAuthenticate = () => ({ type: UNAUTHENTICATE, payload: {} })
export const createClear = () => ({ type: CLEAR, payload: {} })

export const initialState: AuthState = {
  isInitialized: false,
  isFetching: false,
  authToken: undefined,
  errorMessage: undefined
}

const reducer = (state: AuthState, action: Action) : AuthState => {
  switch (action.type) {
    case INITIALIZE: {
      const isInitialized = true
      const { authToken } = action.payload
      return { ...state, isInitialized, authToken }
    }
    case START_FETCHING: {
      const isFetching = true
      const errorMessage = undefined
      return { ...state, isFetching, errorMessage }
    }
    case AUTHENTICATE: {
      const isFetching = false
      const { authToken } = action.payload
      return { ...state, isFetching, authToken }
    }
    case SET_ERROR_MESSAGE: {
      const isFetching = false
      const { errorMessage } = action.payload
      return { ...state, isFetching, errorMessage }
    }
    case UNAUTHENTICATE: {
      const authToken = undefined
      return { ...state, authToken }
    }
    case CLEAR: {
      const isInitialized = false
      const authToken = undefined
      return { ...state, isInitialized, authToken }
    }
    default:
      return state
  }
}

export default reducer
