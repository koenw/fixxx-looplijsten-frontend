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

  console.log(caseItem)

  // Header
  const address = caseItem ? `${ caseItem.import_adres.sttnaam } ${ caseItem.import_adres.hsnr } ${ caseItem.import_adres.toev }` : ""
  const postalCode = caseItem ? caseItem.import_adres.postcode : ""
  const personCount = caseItem ? caseItem.bwv_personen.length : 0

  // Vakantieverhuur
  //const showVakantieverhuur = caseItem && caseItem.bwv_vakantieverhuur.length > 0
  const showVakantieverhuur = true

  // Woning
  const woningBestemming = caseItem ? caseItem.import_adres.sbw_omschr : "-"
  const woningEtage = "-" // ?
  const woningKamers = caseItem ? parseInt(caseItem.import_adres.kmrs, 10) : 0
  const woningWoonOppervlak = caseItem ? caseItem.import_wvs[0].vloeroppervlak_totaal : "-"
  const woningTotaalOppervlak = caseItem ? caseItem.import_wvs[0].nuttig_woonoppervlak : "-"
  const woningHuur = caseItem ? caseItem.import_wvs[0].bedrag_huur : 0

  // Melding
  const meldingStartDate = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].melding_datum.slice(0, -9) : ""
  const meldingAnoniem = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].melder_anoniem === "J" : false
  const meldingMelderNaam = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].melder_naam : ""
  const meldingMelderEmail = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].melder_emailadres : ""
  const meldingMelderPhoneNumber = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].melder_telnr : ""
  const meldingTextRaw = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].situatie_schets : ""
  const meldingText = meldingTextRaw.replace("\n", "<br /><br />")

  // Bewoners
  const people = caseItem ? caseItem.bwv_personen.map((person: any) => {
    return ({
      name: person.naam,
      initials: person.voorletters,
      sex: person.geslacht,
      born: person.geboortedatum.slice(0, -9),
      livingSince: person.vestigingsdatum_adres.slice(0, -9)
    })
  }) : []
  const bewoners = people.reduce((acc: any, person: any, index: number) => {
    acc.push((index + 1) + ". " + person.initials + " " + person.name + " (" + person.sex + ")")
    acc.push(["Geboren", person.born])
    acc.push(["Woont hier sinds", person.livingSince])
    return acc
  }, [])

  const stadiums = caseItem ? caseItem.import_stadia.map((stadium: any) => {
    return ({
      description: stadium.sta_oms,
      dateStart: stadium.begindatum,
      dateEnd: stadium.einddatum,
      datePeil: stadium.peildatum
    })
  }) : []

  const stadia = stadiums.reduce((acc: any, stadium: any) => {
    acc.push(["Stadium", <strong>{ stadium.description }</strong>])
    acc.push(["Start datum", stadium.dateStart])
    acc.push(["Eind datum", stadium.dateEnd])
    acc.push(["Peil datum", stadium.datePeil])
    acc.push(<hr />)
    return acc
  }, [])

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
        { showVakantieverhuur &&
        <CaseDetailSection
          title="Vakantieverhuur"
          data= {[
            ["Aangevraagd", "Ja"],
            ["Vandaag verhuurd", "Nee"],
            ["Verhuurd dit jaar", "23 dagen"],
            ["Shortstay", "Nee"],
            ["B&B aangemeld", "Nee"]
          ]} />
        }
        <CaseDetailSection
          title="Woning"
          data= {[
            ["Bestemming", woningBestemming],
            ["Etage", woningEtage],
            ["Aantal kamers", woningKamers > 0 ? woningKamers : "-"],
            ["Woonoppervlak", woningWoonOppervlak > 0 ? woningWoonOppervlak + " m²" : "-"],
            ["Totaal oppervlak", woningTotaalOppervlak > 0 ? woningTotaalOppervlak + " m²" : "-"],
            ["Huur", woningHuur > 0 ? "€ " + woningHuur : "-"]
          ]} />
        <CaseDetailSection
          title="Melding / aanleiding"
          data= {[
            ["In behandeling per", meldingStartDate],
            ["Anonieme melding", meldingAnoniem],
            ["Melder", meldingMelderNaam],
            ["Melder email", <a href={ "mailto://" + meldingMelderEmail }>{ meldingMelderEmail }</a>],
            ["Melder telefoonnummer", <a href={ "tel://" + meldingMelderPhoneNumber }>{ meldingMelderPhoneNumber }</a>],
            <p dangerouslySetInnerHTML={ { __html: meldingText } }></p>
          ]} />
        <CaseDetailSection
          title={ `Huidige bewoners (${ people.length })` }
          data= { bewoners } />
        { showVakantieverhuur &&
        <CaseDetailSection
          title="Vakantieverhuur dit jaar (23)"
          data= {[
            ["Checkin", "26 feb 2019"],
            ["Checkout", "28 feb 2019"],
            <hr />,
            ["Checkin", "6 april 2019"],
            ["Checkout", "12 april 2019"],
          ]} />
        }
        <CaseDetailSection
          title="Stadia"
          data= { stadia } />
        </>
      }
    </article>
  )
}

export default CaseDetail
