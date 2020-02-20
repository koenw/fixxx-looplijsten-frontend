import React, { FC } from "react"
import PlanningResultItineraries from "./PlanningResultItineraries"
import useGlobalState from "../../hooks/useGlobalState"
import { getTitle } from "../../lib/days"
import formatDate from "../../lib/utils/formatDate"
import { Spinner } from "@datapunt/asc-ui"
import styled from "styled-components"
import zip from "../../lib/zip"

const Div = styled.div`
  margin-bottom: 24px
`
const H1 = styled.h1`
  font-size: 24px
`

const PlanningResult: FC = () => {

  const {
    planning: {
      results,
      timestamp
    }
  } = useGlobalState()

  const hasResult = results !== undefined
  const showEmpty = !hasResult
  const {
    unplanned_cases: unplannedCases
  } = results || {}

  console.log(results)

  const numPlannedCases = hasResult ? results!.lists.flat(1).length : 0
  const numUnplannedCases = unplannedCases ? unplannedCases.length : 0
  const numTotalCases = numPlannedCases + numUnplannedCases
  const showUnplannedCases = numUnplannedCases > 0

  const listsMonday = results ? results.lists.filter(list => list.name.match(/^Maandag/)) : []
  const listsMondayMorning = listsMonday.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsMondayAfternoon = listsMonday.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsMondayEvening = listsMonday.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  const listsTuesday = results ? results.lists.filter(list => list.name.match(/^Dinsdag/)) : []
  const listsTuesdayMorning = listsTuesday.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsTuesdayAfternoon = listsTuesday.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsTuesdayEvening = listsTuesday.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  const listsWednesday = results ? results.lists.filter(list => list.name.match(/^Woensdag/)) : []
  const listsWednesdayMorning = listsWednesday.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsWednesdayAfternoon = listsWednesday.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsWednesdayEvening = listsWednesday.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  const listsThursday = results ? results.lists.filter(list => list.name.match(/^Donderdag/)) : []
  const listsThursdayMorning = listsThursday.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsThursdayAfternoon = listsThursday.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsThursdayEvening = listsThursday.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  const listsFriday = results ? results.lists.filter(list => list.name.match(/^Vrijdag/)) : []
  const listsFridayMorning = listsFriday.filter(list => list.name.match(/Ochtend$/) && list.number_of_lists > 0)
  const listsFridayAfternoon = listsFriday.filter(list => list.name.match(/Middag$/) && list.number_of_lists > 0)
  const listsFridayEvening = listsFriday.filter(list => list.name.match(/Avond$/) && list.number_of_lists > 0)

  const listsSaturday = results ? results.lists.filter(list => list.name.match(/^Zaterdag/)) : []

  const listsSunday = results ? results.lists.filter(list => list.name.match(/^Zondag/)) : []

  return (
    <div className="PlanningResult">
      { showEmpty &&
        <Spinner size={ 60 } />
      }
      { hasResult &&
        <>
          <H1>Looplijsten</H1>
          <Div>
            <p><label>gegenereerd op: </label>{ timestamp ? `${ formatDate(timestamp, true) } ${ timestamp.getHours() }:${ timestamp.getMinutes() } uur` : "-" }</p>
            <p><label>ingedeeld: </label>{ numPlannedCases }</p>
            <p><label>niet ingedeeld: </label>{ numUnplannedCases }</p>
            <p><label>totaal: </label>{ numTotalCases }</p>
          </Div>
          { listsMondayMorning.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Maandag Dag Team ${ index2 + 1 }`
                const subtitles = ["Ochtend", "Middag"]
                const itinerariesAfternoon = listsMondayAfternoon[index].itineraries[index2]
                const lists = itinerariesAfternoon !== undefined ? [itineraries, itinerariesAfternoon] : [itineraries]
                return <PlanningResultItineraries key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsMondayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Maandag Avond Team ${ index2 + 1 }`
                return <PlanningResultItineraries key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsTuesdayMorning.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Dinsdag Dag Team ${ index2 + 1 }`
                const subtitles = ["Ochtend", "Middag"]
                const itinerariesAfternoon = listsTuesdayAfternoon[index].itineraries[index2] || []
                const lists = itinerariesAfternoon !== undefined ? [itineraries, itinerariesAfternoon] : [itineraries]
                return <PlanningResultItineraries key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsTuesdayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Dinsdag Avond Team ${ index2 + 1 }`
                return <PlanningResultItineraries key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsWednesdayMorning.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Woensdag Dag Team ${ index2 + 1 }`
                const subtitles = ["Ochtend", "Middag"]
                const itinerariesAfternoon = listsWednesdayAfternoon[index].itineraries[index2] || []
                const lists = itinerariesAfternoon !== undefined ? [itineraries, itinerariesAfternoon] : [itineraries]
                return <PlanningResultItineraries key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsWednesdayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Woensdag Avond Team ${ index2 + 1 }`
                return <PlanningResultItineraries key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsThursdayMorning.map((list, index) => {
              console.log("Donderdag Morning", list.itineraries)
              return list.itineraries.map((itineraries, index2) => {
                const title = `Donderdag Dag Team ${ index2 + 1 }`
                const subtitles = ["Ochtend", "Middag"]
                const itinerariesAfternoon = listsThursdayAfternoon[index].itineraries[index2] || []
                const lists = itinerariesAfternoon !== undefined ? [itineraries, itinerariesAfternoon] : [itineraries]
                return <PlanningResultItineraries key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsThursdayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Donderdag Avond Team ${ index2 + 1 }`
                return <PlanningResultItineraries key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsFridayMorning.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Vrijdag Dag Team ${ index2 + 1 }`
                const subtitles = ["Ochtend", "Middag"]
                const itinerariesAfternoon = listsFridayAfternoon[index].itineraries[index2] || []
                const lists = itinerariesAfternoon !== undefined ? [itineraries, itinerariesAfternoon] : [itineraries]
                return <PlanningResultItineraries key={ title } title={ title } subtitles={ subtitles } lists={ lists } />
              })
          } ) }
          { listsFridayEvening.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Vrijdag Avond Team ${ index2 + 1 }`
                return <PlanningResultItineraries key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsSaturday.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Zaterdag Team ${ index2 + 1 }`
                return <PlanningResultItineraries key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { listsSunday.map((list, index) => {
              return list.itineraries.map((itineraries, index2) => {
                const title = `Zondag Team ${ index2 + 1 }`
                return <PlanningResultItineraries key={ title } title={ title } lists={ [itineraries] } />
              })
          } ) }

          { showUnplannedCases &&
            <PlanningResultItineraries title="Niet ingedeeld" lists={ [unplannedCases!] } hasCopyButton={ false } />
          }
        </>
      }
    </div>
  )
}
export default PlanningResult
