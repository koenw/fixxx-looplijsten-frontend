declare type Id = number
declare type OptionalId = Id | undefined
declare type Ids = Id[]

declare type User = {
  username: string
  first_name: string
  last_name: string
}
declare type Users = User[]

declare type Team = {
  id: Id
  name: string
  members: Users
}
declare type OptionalTeam = Team | undefined
declare type Teams = Team[]

declare type Itinerary = {
  id: Id
  case: {
    address: string
    postal_code: string
    stadium: string
  }
  wng_id: string
  postal_code_area: string
  postal_code_street: string
}
declare type Itineraries = Itinerary[]

declare type Case = {
  import_adres: any
  bwv_hotline_bevinding: any
  bwv_tmp: any
  bwv_hotline_melding: any
  bwv_personen: any
  import_stadia: any
  import_wvs: any
}
declare type OptionalCase = Case | undefined

declare type OptionalString = string | undefined
declare type ErrorMessage = OptionalString

declare type SearchResult = any
declare type SearchResults = SearchResult[]
