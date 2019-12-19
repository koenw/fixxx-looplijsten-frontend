declare type ItinerariesState = {
  isInitialized: boolean
  isUpdating: boolean
  itineraries: Itineraries
}

declare type ItinerariesActions = {
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
  authToken?: AuthToken
}

declare type AuthActions = {
  authenticate: (a: string, b: string) => void
  unAuthenticate: () => void
  clear: () => void
}
