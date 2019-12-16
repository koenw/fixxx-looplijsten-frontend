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
