import React, { useState, useEffect } from "react"
import CaseDetailHeader from "./CaseDetailHeader"
import CaseDetailSection from "./CaseDetailSection"
import { getUrl } from "../config/domain"

type Props = {
  caseId: number
}

type Case = any

const CaseDetail: React.FC<Props> = ({ caseId }) => {

  const [caseItem, setCaseItem] = useState<Case>()

  useEffect(() => {
    (async () => {
      try {
        const url = getUrl(`case/${ caseId }/`)
        const response = await fetch(url, {
          headers: {
            "Authorization": "Token 8d71767439a570cc8d0f9bad2f5aa5066c51d263",
          }
        })
        const json = await response.json()
        setCaseItem(json)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [caseId])

  const showLoading = caseItem == null
  const show = !showLoading

  const address = caseItem ? `${ caseItem.import_adres.sttnaam } ${ caseItem.import_adres.hsnr } ${ caseItem.import_adres.toev }` : ""
  const postalCode = caseItem ? caseItem.import_adres.postcode : ""
  const personCount = caseItem ? parseInt(caseItem.import_adres.inwnrs, 10) : 0

  return (
    <article>
    { show &&
      <>
        <CaseDetailHeader
          address={ address }
          postalCode={ postalCode }
          personCount={ personCount }
          footer={ { link: `http://www.google.com/maps/place/${ address }, Amsterdam`, title: "Bekijk op Google Maps" }}
        />
        <CaseDetailSection
          title="Vakantieverhuur"
          data= {[
            ["Aangevraagd", "Ja"],
            ["Vandaag verhuurd", "Nee"],
            ["Verhuurd dit jaar", "23 dagen"],
            ["Shortstay", "Nee"],
            ["B&B aangemeld", "Nee"]
          ]} />
        <CaseDetailSection
          title="Woning"
          data= {[
            ["Bestemming", "Huurwoning"],
            ["Etage", "2"],
            ["Aantal kamers", "2"],
            ["Woonoppervlak", "40 m²"],
            ["Totaal oppervlak", "100 m²"],
            ["Huur", "€ 375"]
          ]} />
        <CaseDetailSection
          title="Melding / aanleiding"
          data= {[
            ["In behandeling per", "maandag 17 januari 2019"],
            ["Anonieme melding", "Nee"],
            ["Melder", "dhr. Doey"],
            ["Melder email", <a href="mailto://j.doey@example.com">j.doey@example.com</a>],
            ["Melder telefoonnummer", <a href="tel://06 12345678">06 12345678</a>],
            ["Eigenaar", "Xmere B.V."],
            ["CityData", "woning, 60m2, 1 bouwlaag"],
            "Je kunt bij de melder aanbellen om binnen te komen, hij woont op 1C. Er staat een blauwe sticker.",
            <>Link van 4 oktober 2019 naar advertentie op AirBnB: <a href="www.airbnb.nl/rooms/123456">www.airbnb.nl/rooms/123456</a></>
          ]} />
        <CaseDetailSection
          title="Huidige bewoners (2)"
          data= {[
            "1. A.D Van Alkemede (Man)",
            ["Geboren", "26 feb 2019"],
            ["Woont hier sinds", "26 feb 2016"],
            "1. Y Van Alkemede (Vrouw)",
            ["Geboren", "23 feb 1912"],
            ["Woont hier sinds", "26 feb 2016"],
          ]} />
        <hr />
        <CaseDetailSection
          title="Vakantieverhuur dit jaar (23)"
          data= {[
            ["Checkin", "26 feb 2019"],
            ["Checkout", "28 feb 2019"],
            <hr />,
            ["Checkin", "6 april 2019"],
            ["Checkout", "12 april 2019"],
          ]} />
        <hr />
        <CaseDetailSection
          title="Stadia"
          data= {[
            ["Stadium", "Project naar Handhaving"],
            ["Medewerker", "S. de Boer"],
            ["Begin", "di 26 feb 2019"],
            ["Eind", "vr 6 mrt 2019"],
            ["Peil", "di 2 mrt 2019"]
          ]} />
        </>
      }
    </article>
  )
}

export default CaseDetail
