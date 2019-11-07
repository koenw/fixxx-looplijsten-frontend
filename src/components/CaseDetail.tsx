import React, { useState, useEffect } from "react"
import CaseDetailHeader from "./CaseDetailHeader"
import CaseDetailSection from "./CaseDetailSection"
import Signal from "./Signal"
import Hr from "./Hr"
import { getUrl } from "../config/domain"
import authToken from "../config/authToken.json"

type Props = {
  caseId: number
}

type Case = any

const replaceNewLines = (text: string) => text.replace("\n", "<br /><br />")
const removeTime = (text: string) => text.slice(0, -9)

const CaseDetail: React.FC<Props> = ({ caseId }) => {

  const [caseItem, setCaseItem] = useState<Case>()

  useEffect(() => {
    (async () => {
      try {
        const url = getUrl(`case/${ caseId }/`)
        const response = await fetch(url, {
          headers: {
            "Authorization": `Token ${ authToken }`
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
  const signalType = caseItem && caseItem.import_stadia.filter((stadium: any) => stadium.sta_oms === "Issuemelding").length > 0 ? "ISSUE" : "REGULAR"

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
  const meldingStartDate = caseItem && caseItem.bwv_hotline_melding[0] ? removeTime(caseItem.bwv_hotline_melding[0].melding_datum) : ""
  const meldingAnoniem = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].melder_anoniem === "J" : false
  const meldingMelderNaam = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].melder_naam : ""
  const meldingMelderEmail = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].melder_emailadres : ""
  const meldingMelderPhoneNumber = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].melder_telnr : ""
  const meldingTextRaw = caseItem && caseItem.bwv_hotline_melding[0] ? caseItem.bwv_hotline_melding[0].situatie_schets : ""
  const meldingText = replaceNewLines(meldingTextRaw)

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

  // Logboek
  const bevindingen = caseItem ? caseItem.bwv_hotline_bevinding.map((item: any) => {
    return ({
      name: item.toez_hdr1_code || "",
      date: removeTime(item.bevinding_datum),
      time: item.bevinding_tijd,
      hit: item.hit === "J",
      text: item.opmerking,
      num: parseInt(item.volgnr_bevinding, 10)
    })
  }).sort((a: any, b: any) => a.num - b.num).reverse() : []

  const logboek = bevindingen.reduce((acc: any, item: any, index: number) => {
    acc.push(["Toezichthouder", <strong>{ item.name }</strong>])
    acc.push(["Tijd", item.time])
    acc.push(["Datum", item.date])
    acc.push(["Hit", item.hit])
    acc.push(<p dangerouslySetInnerHTML={ { __html: replaceNewLines(item.text) } }></p>)
    if (index < bevindingen.length - 1) acc.push(<Hr />)
    return acc
  }, [])

  // Stadia
  const stadiums = caseItem ? caseItem.import_stadia.map((stadium: any) => {
    return ({
      description: stadium.sta_oms,
      dateStart: stadium.begindatum,
      dateEnd: stadium.einddatum,
      datePeil: stadium.peildatum,
      num: parseInt(stadium.sta_nr, 10)
    })
  }).sort((a: any, b: any) => a.num - b.num).reverse() : []

  const stadia = stadiums.reduce((acc: any, stadium: any, index: number) => {
    const type = stadium.description === "Issuemelding" ? "ISSUE" : "REGULAR"
    acc.push(["Stadium", <Signal type={ type } text={ stadium.description }></Signal>])
    acc.push(["Start datum", stadium.dateStart])
    acc.push(["Eind datum", stadium.dateEnd])
    acc.push(["Peil datum", stadium.datePeil])
    if (index < stadiums.length - 1) acc.push(<Hr />)
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
          signal={ signalType }
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
            <Hr />,
            ["Checkin", "6 april 2019"],
            ["Checkout", "12 april 2019"],
          ]} />
        }
        <CaseDetailSection
          title="Logboek"
          data= { logboek } />
        <CaseDetailSection
          title="Stadia"
          data= { stadia } />
        </>
      }
    </article>
  )
}

export default CaseDetail
