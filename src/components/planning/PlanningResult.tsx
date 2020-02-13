import React, { FC } from "react"
import PlanningResultItineraries from "./PlanningResultItineraries"
import useGlobalState from "../../hooks/useGlobalState"
import days, { getTitle } from "../../lib/days"
import { Spinner } from "@datapunt/asc-ui"
import styled from "styled-components"

const P = styled.p`
  margin-bottom: 24px
`
const Div = styled.div`
  margin-bottom: 24px
`
const H1 = styled.h1`
  font-size: 24px
`

const PlanningResult: FC = () => {

  const {
    planning: {
      results
    }
  } = useGlobalState()

  const hasResult = results !== undefined
  const showEmpty = !hasResult
  const {
    unplanned_cases: unplannedCases,
    generated_at: generatedAt
  } = results || {}

  const numPlannedCases = hasResult ?
    results.days.map((result: PlanningDay) => result.lists.map(list => list.itineraries)).flat(3).length :
    0
  const numUnplannedCases = unplannedCases ? unplannedCases.length : 0

  return (
    <div className="PlanningResult">
      { showEmpty &&
        <Spinner size={ 60 } />
      }
      { hasResult &&
        <>
          <H1>Looplijsten</H1>
          <Div>
            <p><label>ingedeeld: </label>{ numPlannedCases }</p>
            <p><label>niet ingedeeld: </label>{ numUnplannedCases }</p>
          </Div>
          { results.days.map((result: PlanningDay) => {
            const { day, lists } = result
            const dayMorningLists = lists
              .filter(list => list.name === "Ochtend")
              .map(list => list.itineraries)
              .flat()
            const dayAfternoonLists = lists
              .filter(list => list.name === "Middag")
              .map(list => list.itineraries)
              .flat()
            const zip = (arr: Lists, arr1: Lists) : Lists[] => arr.map((t: List, i: number) => arr1[i] !== undefined ? [t, arr1[i]] : [t])
            const dayLists = zip(dayMorningLists, dayAfternoonLists)
            const eveningLists = lists
              .filter(list => list.name === "Avond")
              .map(list => list.itineraries)
              .flat()
            const showEveningItineraries = eveningLists.length > 0
            const weekendLists = lists
              .filter(list => list.name === "Weekend")
              .map(list => list.itineraries)
              .flat()
            return <div key={ day }>
              <H1>{ getTitle(day) }</H1>
              { dayLists.map((itineraries, index) => {
                  const subtitles = itineraries.length > 1 ? ["ochtend", "middag"] : undefined
                  return <PlanningResultItineraries key={ index } title={ `team ${ index + 1 }` } lists={ itineraries } subtitles={ subtitles } />
              } ) }
              { eveningLists.map((itineraries, index) =>
                <PlanningResultItineraries key={ index } title={ `avond team ${ index + 1 }` } lists={ [itineraries] } />
              ) }
              { weekendLists.map((itineraries, index) =>
                <PlanningResultItineraries key={ index } title={ `weekend team ${ index + 1 }` } lists={ [itineraries] } />
              ) }
            </div>
          }) }
          <H1>Niet ingedeeld</H1>
          <PlanningResultItineraries lists={ [unplannedCases] } />
        </>
      }
    </div>
  )
}
export default PlanningResult
