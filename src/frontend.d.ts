declare type ErrorMessage = string
declare type OErrorMessage = ErrorMessage | undefined

declare type ItinerariesState = {
  isFetching: boolean
  isInitialized: boolean
  itineraries: Itineraries
  errorMessage?: ErrorMessage
}

declare type ItinerariesActions = {
  initialize: () => void
  add: (a: CaseId) => void
  move: (a: Index, b: Index) => void
  remove: (a: Id) => void
  setNote: (a: Id, b: text, c?: Id) => Promise<boolean>
  clear: () => void
}

declare type AuthState = {
  isInitialized: boolean
  isFetching: boolean
  authToken?: AuthToken
  errorMessage?: ErrorMessage
}

declare type AuthActions = {
  initialize: () => Promise<boolean>
  authenticate: (a: Email, b: Password) => Promise<boolean>
  authenticateToken: (a: AuthToken) => void
  unAuthenticate: () => void
  clear: () => void
}

declare type StreetSuffix = string
declare type Query = [PostalCode, StreetNumberString, StreetSuffix]
declare type SearchState = {
  isFetching: boolean
  query?: Query
  results?: BWVData[]
  errorMessage?: ErrorMessage
}

declare type SearchActions = {
  search: (a: PostalCode, b: StreetNumberString, c: StreetSuffix) => void
}

declare type ParseState = {
  isFetching: boolean
  query?: string
  results?: SearchResults
  errorMessage?: ErrorMessage
}

declare type ParseActions = {
  parse: (a: string) => void
}
