declare type ItinerariesState = {
  isFetching: boolean
  isInitialized: boolean
  itineraries: Itineraries
  errorMessage: ErrorMessage
}

declare type ItinerariesActions = {
  initialize: () => void
  add: (a: CaseId) => void
  move: (a: Index, b: Index) => void
  remove: (a: Id) => void
  setNote: (a: Id, b: text, c?: Id) => Promise<boolean>
  clear: () => void
}

declare type Email = string
declare type Password = string
declare type AuthToken = string
declare type OptionalAuthToken = AuthToken | undefined
declare type AuthState = {
  isInitialized: boolean
  isFetching: boolean
  authToken?: AuthToken
  errorMessage: ErrorMessage
}

declare type AuthActions = {
  initialize: () => boolean
  authenticate: (a: string, b: string) => Promise<boolean>
  authenticateToken: (a: AuthToken) => void
  unAuthenticate: () => void
  clear: () => void
}

declare type PostalCode = string
declare type Suffix = string
declare type Query = [PostalCode, string, Suffix]
declare type SearchState = {
  isFetching: boolean
  query?: Query
  results?: BWVData[]
  errorMessage: ErrorMessage
}

declare type SearchActions = {
  search: (a: PostalCode, b: string, c: Suffix) => void
}

declare type ParseState = {
  isFetching: boolean
  query?: string
  results?: SearchResults
  errorMessage: ErrorMessage
}

declare type ParseActions = {
  parse: (a: string) => void
}
