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
    bwv_data: {
      case_id: string
      street_name: string
      postal_code: string
      stadium: string
      street_number: number
      suffix: string
      suffix_letter: string
    }
  }
}
declare type Itineraries = Itinerary[]

declare type Case = {
  bag_data: any
  import_adres: any
  bwv_hotline_bevinding: any
  bwv_tmp: any
  bwv_hotline_melding: any
  bwv_personen: any
  import_stadia: any
  import_wvs: any
  vakantie_verhuur: any
}
declare type OptionalCase = Case | undefined

declare type OptionalString = string | undefined
declare type ErrorMessage = OptionalString

declare type SearchResult = any
declare type SearchResults = SearchResult[]
