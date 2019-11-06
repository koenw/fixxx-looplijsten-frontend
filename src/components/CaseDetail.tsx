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
          title="Adres"
          data= {[
            ["straat", "Wingerdweg"],
            ["huisnummer", "107"],
            ["toevoeging", "I"],
            ["postcode", "1032 AC"],
            ["bestemming", "huurwoning"],
            ["bekijk op", <><a href="http://citydata.amsterdam.nl">CityData</a> <a href="https://maps.google.com">Google Maps</a></>]
          ]} />
        <CaseDetailSection
          title="Verhuurgegevens"
          data= {[
            ["vakantieverhuur", "Ja"],
            ["aantal dagen verhuurd", "23"],
            ["shortstay", "Nee"],
            ["B&B", "Nee"]
          ]} />
        <CaseDetailSection
          title="Melding"
          data= {[
            ["datum", "maandag 17 januari 2019"],
            ["anoniem", "Nee"],
            ["melder naam", "dhr. Doey"],
            ["melder email", <a href="mailto://j.doey@example.com">j.doey@example.com</a>],
            ["melder telefoonnummer", "06 12345678"],
          ]} />
        <CaseDetailSection
          title="Toelichting / Bijzonderheden"
          data= {[
            ["eigenaar", "Ymere B.V."],
            ["CityData", "woning, 60m2, 1 bouwlaag"],
            "Je kunt bij de melder aanbellen om binnen te komen, hij woont op 1C. Er staat een blauwe sticker.",
            <>Link van 4 oktober 2019 naar advertentie op AirBnB: <a href="www.airbnb.nl/rooms/123456">www.airbnb.nl/rooms/123456</a></>
          ]} />
        <CaseDetailSection
          title="Stadia"
          data= {[
            ["stadium", "Onderzoek Buitendienst"],
            ["medewerker", "S. de Boer"],
            ["begin", "di 26 feb 2019"],
            ["eind", "vr 6 mrt 2019"],
            ["peil", "di 2 mrt 2019"]
          ]} />
        <hr />
        <CaseDetailSection
          data= {[
            ["stadium", "Naar Handhaving"],
            ["medewerker", "S. de Boer"],
            ["begin", "di 26 feb 2019"],
            ["eind", "vr 6 mrt 2019"],
            ["peil", "di 2 mrt 2019"]
          ]} />
        <hr />
        <CaseDetailSection
          data= {[
            ["stadium", "Project naar Handhaving"],
            ["medewerker", "S. de Boer"],
            ["begin", "di 26 feb 2019"],
            ["eind", "vr 6 mrt 2019"],
            ["peil", "di 2 mrt 2019"]
          ]} />
        </>
      }
    </article>
  )
}

export default CaseDetail
