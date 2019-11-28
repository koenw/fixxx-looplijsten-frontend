import React from "react"
import styled from "styled-components"
import useFetch from "../../hooks/useFetch"
import { Spinner } from "@datapunt/asc-ui"
import CaseDetailHeader from "./CaseDetailHeader"
import CaseDetailSection from "./CaseDetailSection"
import Signal from "../global/Signal"
import ErrorMessage from "../global/ErrorMessage"
import Hr from "../styled/Hr"
import formatDate from "../../utils/formatDate"
import replaceNewLines from "../../utils/replaceNewLines"
import replaceUrls from "../../utils/replaceUrls"
import isBetweenDates from "../../utils/isBetweenDates"

type Props = {
  caseId: string
}

const HrSpaced = styled(Hr)`
  margin: 24px 0
`

const parseMeldingText = (text: string) => replaceNewLines(replaceUrls(text.trim()), "<br /><br />")

const CaseDetail: React.FC<Props> = ({ caseId }) => {

  const [caseItem, isFetching, errorMessage] = useFetch(`cases/${ caseId }`) as [Case, boolean, ErrorMessage]
  console.log(caseItem)

  const showSpinner = isFetching
  const showErrorMessage = errorMessage !== undefined
  const show = !showSpinner && !showErrorMessage

  // Header
  const address = caseItem ? `${ caseItem.import_adres.sttnaam } ${ caseItem.import_adres.hsnr } ${ caseItem.import_adres.toev || "" }` : ""
  const postalCode = caseItem ? caseItem.import_adres.postcode : ""
  const personCount = caseItem ? caseItem.bwv_personen.length : 0
  // @TODO: Get data from backend
  const caseNumber = caseItem && caseItem.bwv_tmp ? caseItem.bwv_tmp.case_number : undefined
  const caseCount = caseItem  && caseItem.bwv_tmp ? caseItem.bwv_tmp.num_cases : undefined
  const openCaseCount = caseItem && caseItem.bwv_tmp ? caseItem.bwv_tmp.num_open_cases : undefined
  const caseOpening = caseItem && caseItem.bwv_tmp ? caseItem.bwv_tmp.openings_reden : undefined

  // Vakantieverhuur
  const vakantieverNotifiedRentals = caseItem && caseItem.vakantie_verhuur ? caseItem.vakantie_verhuur.notified_rentals : []
  const vakantieverhuurNotified = vakantieverNotifiedRentals.length > 0
  const vakantieverhuurDays = caseItem && caseItem.vakantie_verhuur ? caseItem.vakantie_verhuur.rented_days : 0
  const vakantieverhuurToday = (() => {
    const l = vakantieverNotifiedRentals.length
    if (l === 0) return "-"
    const last = vakantieverNotifiedRentals[l - 1]
    return isBetweenDates(new Date(last.check_in), new Date(last.check_out), new Date())
  })()

  const showVakantieverhuur = vakantieverNotifiedRentals.length > 0

  // Woning
  const woningBestemming =
    caseItem &&
    caseItem.bag_data &&
    caseItem.bag_data.gebruiksdoelen &&
    caseItem.bag_data.gebruiksdoelen.length ?
    caseItem.bag_data.gebruiksdoelen[0].omschrijving_plus :
    undefined
  const woningEtage = undefined
  const woningKamers = caseItem && caseItem.bag_data ? caseItem.bag_data.aantal_kamers : 0
  const woningOppervlak = caseItem && caseItem.bag_data ? caseItem.bag_data.oppervlakte : 0
  const woningBagId = caseItem && caseItem.bag_data ? caseItem.bag_data.verblijfsobjectidentificatie : null

  // Melding
  const meldingen = caseItem && caseItem.bwv_hotline_melding.map((melding: any) => {
    const {
      melding_datum: datum,
      melding_anoniem: anoniem,
      melder_naam: naam,
      melder_telnr: telnr,
      situatie_schets: text
    } = melding

    return {
      datum: datum ? formatDate(datum, true)! : undefined,
      anoniem: anoniem === "J",
      naam,
      telnr,
      text: parseMeldingText(text || "")
    }
  }).reverse()

  const meldingenData = meldingen && meldingen.reduce((acc: any, item: any, index: number) => {
    const { datum, anoniem, naam, telnr, text } = item
    acc.push(["In behandeling per", datum || "-"])
    acc.push(["Anonieme melding", anoniem])
    acc.push(["Melder", <p className="anonymous"> { naam }</p> || "-"])
    acc.push(["Melder telefoonnummer", telnr ? <a className="anonymous" href={ "tel://" + telnr }>{ telnr }</a> : "-"])
    acc.push(<p className="anonymous" dangerouslySetInnerHTML={ { __html: text } }></p>)
    if (index < meldingen.length - 1) acc.push(<HrSpaced />)
    return acc
  }, [])

  // Bewoners
  const people = caseItem ? caseItem.bwv_personen.map((person: any) => {
    return ({
      name: person.naam,
      initials: person.voorletters,
      sex: person.geslacht,
      born: person.geboortedatum ? formatDate(person.geboortedatum.slice(0, -9))! : undefined,
      livingSince: person.vestigingsdatum_adres ? formatDate(person.vestigingsdatum_adres.slice(0, -9))! : undefined
    })
  }) : []
  const bewoners = people.reduce((acc: any, person: any, index: number) => {
    acc.push(<span className="anonymous">{ (index + 1) + ". " + person.initials + " " + person.name + " (" + person.sex + ")" }</span>)
    acc.push(["Geboren", <span className="anonymous">{ person.born }</span>])
    acc.push(["Woont hier sinds", person.livingSince])
    return acc
  }, [])
  const showBewoners = personCount > 0

  // Logboek
  const bevindingen = caseItem ? caseItem.bwv_hotline_bevinding.map((item: any) => {
    return ({
      name: [item.toez_hdr1_code, item.toez_hdr2_code].filter(i => i != null).join(", "),
      date: formatDate(item.bevinding_datum, true)!,
      time: item.bevinding_tijd,
      hit: item.hit === "J",
      text: item.opmerking,
      num: parseInt(item.volgnr_bevinding, 10)
    })
  }).sort((a: any, b: any) => a.num - b.num).reverse() : []

  const logboek = bevindingen.reduce((acc: any, item: any, index: number) => {
    acc.push(["Toezichthouder", <strong className="anonymous">{ item.name }</strong>])
    acc.push(["Tijd", item.time])
    acc.push(["Datum", item.date])
    acc.push(["Hit", item.hit])
    acc.push(<p className="anonymous" dangerouslySetInnerHTML={ { __html: replaceNewLines(item.text, "<br /><br />") } }></p>)
    if (index < bevindingen.length - 1) acc.push(<Hr />)
    return acc
  }, [])

  // Stadia
  const stadiums = caseItem ? caseItem.import_stadia.map((stadium: any) => {
    return ({
      description: stadium.sta_oms,
      dateStart: stadium.begindatum ? formatDate(stadium.begindatum, true)! : "-",
      dateEnd: stadium.einddatum ? formatDate(stadium.einddatum, true)! : "-",
      datePeil: stadium.peildatum ? formatDate(stadium.peildatum, true)! : "-",
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

  const lastStadia = stadiums.length ? stadiums[0].description : undefined

  return (
    <div className="CaseDetail">
    { showSpinner &&
      <Spinner size={ 60 } />
    }
    { show &&
      <article>
        <CaseDetailHeader
          address={ address }
          postalCode={ postalCode }
          personCount={ personCount }
          caseNumber={ caseNumber }
          caseCount={ caseCount }
          openCaseCount={ openCaseCount }
          caseOpening={ caseOpening }
          footer={ { link: `http://www.google.com/maps/place/${ address }, Amsterdam`, title: "Bekijk op Google Maps" } }
          signal={ lastStadia }
        />
        <CaseDetailSection
          title="Vakantieverhuur"
          data={[
            ["Aangevraagd", vakantieverhuurNotified],
            ["Vandaag verhuurd", vakantieverhuurToday],
            ["Verhuurd dit jaar", vakantieverhuurDays > 0 ? <a href="#vakantieverhuur">{ vakantieverhuurDays } dagen</a> : "-"],
            ["Shortstay", undefined],
            ["B&B aangemeld", undefined]
          ]}
          />
        <CaseDetailSection
          title="Woning"
          data={[
            ["Bestemming", woningBestemming],
            ["Etage", woningEtage],
            ["Aantal kamers", woningKamers > 0 ? woningKamers : "-"],
            ["Woonoppervlak", woningOppervlak > 0 ? woningOppervlak + " m²" : "-"],
          ]}
          footer={ woningBagId ? { link: `https://data.amsterdam.nl/data/bag/verblijfsobject/id${ woningBagId }/`, title: "Bekijk op Data & informatie" } : undefined }
          />
        <CaseDetailSection
          title="Meldingen / aanleiding"
          data={ meldingenData }
          />
        { showBewoners &&
          <CaseDetailSection
            id="personen"
            title={ `Huidige bewoners (${ people.length })` }
            data= { bewoners } />
        }
        { showVakantieverhuur &&
        <CaseDetailSection
          id="vakantieverhuur"
          title={ `Vakantieverhuur dit jaar (${ vakantieverhuurDays })` }
          data={
            vakantieverNotifiedRentals
              .reverse()
              .map((o: { check_in: string, check_out: string }) => [["Check out", formatDate(o.check_out)], ["Check in", formatDate(o.check_in)], <Hr />])
              .flat(1)
              .slice(0, -1) // remove last Hr
            }
          />
        }
        <CaseDetailSection
          title="Logboek"
          data= { logboek } />
        <CaseDetailSection
          title="Stadia"
          data= { stadia } />
      </article>
      }
      {
        showErrorMessage &&
        <ErrorMessage text={ errorMessage! } />
      }
    </div>
  )
}

export default CaseDetail
