declare type Index = number

declare type Id = number
declare type OptionalId = Id | undefined
declare type Ids = Id[]

declare type CaseId = string
declare type CaseIds = CaseId[]

declare type StreetName = string
declare type StreetNumber = number
declare type StreetSuffix = string
declare type Address = [StreetName, StreetNumber, StreetSuffix | undefined]
declare type PostalCode = string
declare type Stadium = string

declare type BWVData = {
  case_id: CaseId
  street_name: string
  postal_code: string
  stadium: string
  street_number: number
  suffix: string | null
  suffix_letter: string | null
  case_reason: string
}
declare type Note = {
  id: Id
  itinerary_item: Id
  text: string
}
declare type Notes = Note[]
declare type Itinerary = {
  id: Id
  case: {
    bwv_data: BWVData
  }
  notes: Notes
  position: number
}
declare type Itineraries = Itinerary[]

declare type SearchResult = {
  success: boolean
  error?: string
  data?: BWVData
}
declare type SearchResults = SearchResult[]

type ImportAdres = {
  sttnaam: string
  hsnr: string
  toev: string | null
  hsltr: string | null
  postcode: string
}
type BWVPersoon = {
  naam: string
  voorletters: string
  geslacht: "M" | "V"
  geboortedatum: string
  vestigingsdatum_adres: string
}
type BWVPersonen = BWVPersoon[]
type BWVTmp = {
  case_number: string | null
  num_cases: string | null
  num_open_cases: number | null
  openings_reden: string | null
}
type VakantieVerhuur = {
  notified_rentals: [{ check_in: string, check_out: string }]
  rented_days: number
}
declare type BagData = {
  gebruiksdoelen: [{ omschrijving_plus: string }]
  aantal_kamers: number | null
  oppervlakte: number | null
  verblijfsobjectidentificatie: string | null
}
type BagDataError = {
  error: string
}
type BWVHotlineMelding = {
  melding_datum: string
  melding_anoniem: "J" | "N"
  melder_naam: string
  melder_telnr: string
  situatie_schets: string
}
type BWVHotlineBevinding = {
  toez_hdr1_code: string
  toez_hdr2_code: string
  bevinding_datum: string
  bevinding_tijd: string
  hit: "J" | "N"
  opmerking: string
  volgnr_bevinding: string
}
type ImportStadia = {
  sta_oms: string
  begindatum: string
  einddatum: string
  peildatum: string
  sta_nr: string
}
declare type Case = {
  bag_data: BagData | BagDataError
  import_adres: ImportAdres
  bwv_hotline_bevinding: BWVHotlineBevinding[]
  bwv_tmp: BWVTmp
  bwv_hotline_melding: BWVHotlineMelding[]
  bwv_personen: BWVPersonen
  import_stadia: ImportStadia[]
  vakantie_verhuur: VakantieVerhuur
}
declare type OptionalCase = Case | undefined

declare type OptionalString = string | undefined
declare type ErrorMessage = OptionalString
