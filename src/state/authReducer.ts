type Action = {
  type: string
  payload: {
    authToken?: AuthToken
  }
}

const INITIALIZE = "INITIALIZE"
const AUTHENTICATE = "AUTHENTICATE"
const UNAUTHENTICATE = "UNAUTHENTICATE"
const CLEAR = "CLEAR"

export const createInitialize = (authToken?: AuthToken) => ({ type: INITIALIZE, payload: { authToken } })
export const createAuthenticate = (authToken: AuthToken) => ({ type: AUTHENTICATE, payload: { authToken } })
export const createUnAuthenticate = () => ({ type: UNAUTHENTICATE, payload: {} })
export const createClear = () => ({ type: CLEAR, payload: {} })

export const initialState: AuthState = {
  isInitialized: false,
  authToken: undefined
}

const reducer = (state: AuthState, action: Action) : AuthState => {
  switch (action.type) {
    case INITIALIZE: {
      const isInitialized = true
      const { authToken } = action.payload
      return { ...state, isInitialized, authToken }
    }
    case AUTHENTICATE: {
      const { authToken } = action.payload
      return { ...state, authToken }
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
