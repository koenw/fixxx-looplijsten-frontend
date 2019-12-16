import React, { FC } from "react"
import styled from "styled-components"
import CaseDetailHeader from "./CaseDetailHeader"
import CaseDetailSection from "./CaseDetailSection"
import Signal from "../global/Signal"
import Hr from "../styled/Hr"
import MailtoAnchor from "./MailtoAnchor"
import formatDate from "../../utils/formatDate"
import replaceNewLines from "../../utils/replaceNewLines"
import replaceUrls from "../../utils/replaceUrls"
import isBetweenDates from "../../utils/isBetweenDates"
import displayAddress from "../../utils/displayAddress"

type Props = {
  caseItem: Case
}

const HrSpaced = styled(Hr)`
  margin: 24px 0
`

const parseMeldingText = (text: string) => replaceNewLines(replaceUrls(text.trim()), "<br />")

const CaseDetail: FC<Props> = ({ caseItem }) => {

  console.log(caseItem)

  // Header
  const address = displayAddress(caseItem.import_adres.sttnaam, caseItem.import_adres.hsnr, caseItem.import_adres.hsltr || undefined, caseItem.import_adres.toev || undefined)
  const postalCode = caseItem.import_adres.postcode
  const personCount = caseItem.bwv_personen.length || 0
  const caseNumber = caseItem.bwv_tmp.case_number !== null ? parseInt(caseItem.bwv_tmp.case_number, 10) : undefined
  const caseCount =  caseItem.bwv_tmp.num_cases !== null ? parseInt(caseItem.bwv_tmp.num_cases, 10) : undefined
  const openCaseCount = caseItem.bwv_tmp.num_open_cases !== null ? caseItem.bwv_tmp.num_open_cases : undefined
  const caseOpening = caseItem.bwv_tmp.openings_reden !== null ? caseItem.bwv_tmp.openings_reden : undefined

  // Vakantieverhuur
  const vakantieverNotifiedRentals = caseItem.vakantie_verhuur.notified_rentals
  const vakantieverhuurNotified = vakantieverNotifiedRentals.length > 0
  const vakantieverhuurDays = caseItem.vakantie_verhuur.rented_days
  const vakantieverhuurToday = vakantieverhuurNotified ? caseItem.vakantie_verhuur.notified_rentals.filter(
    rental => isBetweenDates(new Date(rental.check_in), new Date(rental.check_out), new Date())
  ).length > 0 : "-"
  const showVakantieverhuur = vakantieverhuurNotified

  // Woning
  const hasBagData = (caseItem.bag_data as BagDataError).error === undefined
  const bagData = caseItem.bag_data as BagData
  const gebruiksdoel = hasBagData ? bagData.gebruiksdoel : undefined
  const woningBestemming = gebruiksdoel && gebruiksdoel.length ? gebruiksdoel[0] : undefined
  const woningBouwlagen = hasBagData && bagData.bouwlagen ? bagData.bouwlagen : undefined
  const woningEtage = hasBagData && bagData.verdieping_toegang != null ? bagData.verdieping_toegang : undefined
  const woningKamers = hasBagData && bagData.aantal_kamers ? bagData.aantal_kamers : 0
  const woningOppervlak =
    hasBagData && bagData.oppervlakte && bagData.oppervlakte > 1 ? bagData.oppervlakte : 0
  const woningBagId = hasBagData ? bagData.verblijfsobjectidentificatie : undefined
  const mailtoAnchor = <MailtoAnchor
    address={ address }
    postalCode={ postalCode }
    gebruiksdoel={ woningBestemming }
    aantalBouwlagen={ woningBouwlagen }
    etage={ woningEtage }
    aantalKamers= { woningKamers }
    oppervlak={ woningOppervlak }
    />
  const woningFooter =
    woningBagId ?
      { link: `https://data.amsterdam.nl/data/bag/verblijfsobject/id${ woningBagId }/`, title: "Bekijk op Data & informatie" } :
      undefined

  // Melding
  const meldingen = caseItem.bwv_hotline_melding.map(melding => {
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

  const meldingenData = meldingen.reduce((acc: any, item, index) => {
    const { datum, anoniem, naam, telnr, text } = item
    acc.push(["Datum melding", datum || "-"])
    acc.push(["Anonieme melding", anoniem])
    acc.push(["Melder", <p className="anonymous"> { naam }</p> || "-"])
    acc.push(["Melder telefoonnummer", telnr ? <a className="anonymous" href={ "tel://" + telnr }>{ telnr }</a> : "-"])
    acc.push(<p className="anonymous" dangerouslySetInnerHTML={ { __html: text } }></p>)
    if (index < meldingen.length - 1) acc.push(<HrSpaced />)
    return acc
  }, [])

  // Bewoners
  const people = Array.isArray(caseItem.bwv_personen) ? caseItem.bwv_personen.map(person => {
    return ({
      name: person.naam,
      initials: person.voorletters,
      sex: person.geslacht,
      born: person.geboortedatum ? formatDate(person.geboortedatum.slice(0, -9))! : undefined,
      livingSince: person.vestigingsdatum_adres ? formatDate(person.vestigingsdatum_adres.slice(0, -9))! : undefined
    })
  }) : []
  const bewoners = people.reduce((acc: any, person, index) => {
    acc.push(<span className="anonymous">{ (index + 1) + ". " + person.initials + " " + person.name + " (" + person.sex + ")" }</span>)
    acc.push(["Geboren", <span className="anonymous">{ person.born }</span>])
    acc.push(["Woont hier sinds", person.livingSince])
    return acc
  }, [])
  const showBewoners = personCount > 0

  // Logboek
  const bevindingen = caseItem.bwv_hotline_bevinding.map(item => {
    return ({
      name: [item.toez_hdr1_code, item.toez_hdr2_code].filter(i => i != null).join(", "),
      date: formatDate(item.bevinding_datum, true)!,
      time: item.bevinding_tijd,
      hit: item.hit === "J",
      text: item.opmerking,
      num: parseInt(item.volgnr_bevinding, 10)
    })
  }).sort((a, b) => a.num - b.num).reverse()

  const logboek = bevindingen.reduce((acc: any, item, index) => {
    acc.push(["Toezichthouder", <strong className="anonymous">{ item.name }</strong>])
    acc.push(["Tijd", item.time])
    acc.push(["Datum", item.date])
    acc.push(["Hit", item.hit])
    acc.push(<p className="anonymous" dangerouslySetInnerHTML={ { __html: replaceNewLines(item.text, "<br /><br />") } }></p>)
    if (index < bevindingen.length - 1) acc.push(<Hr />)
    return acc
  }, [])

  // Stadia
  const stadiums = caseItem.import_stadia.map(stadium => {
    return ({
      description: stadium.sta_oms,
      dateStart: stadium.begindatum ? formatDate(stadium.begindatum, true)! : "-",
      dateEnd: stadium.einddatum ? formatDate(stadium.einddatum, true)! : "-",
      datePeil: stadium.peildatum ? formatDate(stadium.peildatum, true)! : "-",
      num: parseInt(stadium.sta_nr, 10)
    })
  }).sort((a, b) => a.num - b.num).reverse()

  const stadia = stadiums.reduce((acc: any, stadium, index) => {
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
    <article className="CaseDetail">
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
          ["Vandaag verhuurd", vakantieverhuurToday],
          [`Dagen verhuurd ${ new Date().getFullYear() }`, vakantieverhuurDays > 0 ? <a href="#vakantieverhuur">{ vakantieverhuurDays } dagen</a> : "-"],
          ["Shortstay", undefined],
          ["B&B aangemeld", undefined]
        ]}
        />
      <CaseDetailSection
        title="Woning"
        data={[
          ["Gebruiksdoel", woningBestemming],
          ["Aantal bouwlagen", woningBouwlagen !== undefined ? woningBouwlagen : "-"],
          ["Etage", woningEtage !== undefined ? woningEtage : "-"],
          ["Aantal kamers", woningKamers > 0 ? woningKamers : "-"],
          ["Woonoppervlak", woningOppervlak > 0 ? woningOppervlak + " m²" : "-"],
          mailtoAnchor
        ]}
        footer={ woningFooter }
        />
      <CaseDetailSection
        title="Meldingen / aanleiding"
        data={ meldingenData.length ? meldingenData : ["-"] }
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
        data= { logboek.length ? logboek : ["-"] } />
      <CaseDetailSection
        title="Stadia"
        data= { stadia } />
    </article>
  )
}

export default CaseDetail
