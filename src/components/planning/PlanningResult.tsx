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
  console.log(timestamp)

  const hasResult = results !== undefined
  const showEmpty = !hasResult
  const {
    unplanned_cases: unplannedCases
  } = results || {}
  const showUnplannedCases = unplannedCases && unplannedCases.length > 0

  const numPlannedCases = hasResult ?
    results.days.map((result: PlanningDay) => result.lists.map(list => list.itineraries)).flat(3).length :
    0
  const numUnplannedCases = unplannedCases ? unplannedCases.length : 0
  const numTotalCases = numPlannedCases + numUnplannedCases

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
          { results.days.map((result: PlanningDay) => {
            const { day, lists } = result
            const dayTitle = getTitle(day, true)
            const dayMorningLists = lists
              .filter(list => list.name === "Ochtend")
              .map(list => list.itineraries)
              .flat()
            const dayAfternoonLists = lists
              .filter(list => list.name === "Middag")
              .map(list => list.itineraries)
              .flat()
            const dayLists = zip(dayMorningLists, dayAfternoonLists)
            const eveningLists = lists
              .filter(list => list.name === "Avond")
              .map(list => list.itineraries)
              .flat()
            const weekendLists = lists
              .filter(list => list.name === "Weekend")
              .map(list => list.itineraries)
              .flat()
            return <div key={ day }>
              { dayLists.map((itineraries, index, arr) => {
                  const subtitles = itineraries.length > 1 ? ["Ochtend", "Middag"] : undefined
                  return <PlanningResultItineraries key={ index } title={ `${ dayTitle } Dag Team ${ index + 1 }/${ arr.length }` } lists={ itineraries } subtitles={ subtitles } />
              } ) }
              { eveningLists.map((itineraries, index, arr) =>
                <PlanningResultItineraries key={ index } title={ `${ dayTitle } Avond Team ${ index + 1 }/${ arr.length }` } lists={ [itineraries] } />
              ) }
              { weekendLists.map((itineraries, index, arr) =>
                <PlanningResultItineraries key={ index } title={ `${ dayTitle } Weekend Team ${ index + 1 }/${ arr.length }` } lists={ [itineraries] } />
              ) }
            </div>
          }) }
          { showUnplannedCases &&
            <>
              <H1>Niet ingedeeld</H1>
              <PlanningResultItineraries lists={ [unplannedCases] } hasCopyButton={ false } />
            </>
          }
        </>
      }
    </div>
  )
}
export default PlanningResult
