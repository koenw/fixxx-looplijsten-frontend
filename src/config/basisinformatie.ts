export const email = "Terugmelding.Basisinformatie@amsterdam.nl"
export const subject = "Terugmelding Basisinformatie"
export const body = (
  address: string,
  postalCode: string,
  gebruiksdoel?: string,
  gebruik?: string,
  aantalBouwlagen?: number,
  etage?: number,
  aantalKamers?: number,
  oppervlak?: number
) =>
`Beste collega,

Wij hebben een afwijking in de woninggegevens geconstateerd op het volgende adres:

${ address }
${ postalCode } Amsterdam

Ons systeem toont bij dit adres op dit moment de volgende gegevens uit BAG:

Gebruiksdoel: ${ gebruiksdoel || "-" }
Soort Object (feitelijk gebruik): ${ gebruik || "" }
Aantal bouwlagen: ${ aantalBouwlagen || "-"}
Verdieping toegang: ${ etage || "-" }
Aantal kamers: ${ aantalKamers || "-" }
Woonoppervlak: ${ oppervlak ? `${ oppervlak } m² ` : "-" }

We hebben bij onze controle de volgende afwijkingen geconstateerd:

[--- VUL HIER DE GECONSTATEERDE AFWIJKING IN ---]

Vriendelijke groet,

[--- VUL HIER JE NAAM IN ---]

Gemeente Amsterdam
Afdeling Wonen
Telefoon: 020 2514192
`.replace(/\n/g, escape("\r\n"))
