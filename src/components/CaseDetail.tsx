import React from "react"
import CaseDetailSection from "./CaseDetailSection"

const CaseDetail: React.FC = () => {
  return (
    <div>
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
          ["melder naam", "dhr. Van der Meide"],
          ["melder email", <a href="mailto://j.vandermeide@gmail.com">j.vandermeide@gmail.com</a>],
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
    </div>
  )
}

export default CaseDetail
