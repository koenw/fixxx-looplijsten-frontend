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
  addMany: (a: CaseIds) => void
  move: (a: Index, b: Index) => void
  remove: (a: Id) => void
  setNote: (a: Id, b: text, c?: Id) => Promise<boolean>
  clear: () => void
}

declare type AuthState = {
  isInitialized: boolean
  isFetching: boolean
  token?: AuthToken
  errorMessage?: ErrorMessage
}

declare type AuthActions = {
  initialize: () => Promise<boolean>
  authenticate: (a: Email, b: Password) => Promise<boolean>
  authenticateToken: (a: AuthToken) => boolean
  unAuthenticate: (a: boolean) => void
}

declare type StreetSuffix = string
declare type Query = [PostalCode, StreetNumberString, StreetSuffix]
declare type SearchState = {
  isFetching: boolean
  query?: Query
  results?: SearchResults
  errorMessage?: ErrorMessage
}

declare type SearchActions = {
  search: (a: PostalCode, b: StreetNumberString, c: StreetSuffix) => void
  clear: () => void
}

declare type ParseState = {
  isFetching: boolean
  query?: string
  results?: SearchResults
  errorMessage?: ErrorMessage
}

declare type ParseActions = {
  parse: (a: string) => void
  clear: () => void
}

declare type PlanningState = {
  isFetching: boolean
  results?: PlanningData
  timestamp?: Date
  errorMessage?: ErrorMessage
}

declare type PlanningActions = {
  initialize: () => void
  generate: (a: any) => void
  clear: () => void
}
