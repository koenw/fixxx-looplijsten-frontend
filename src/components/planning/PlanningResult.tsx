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
  const dayKeys = days.map(day => day.key)
  const {
    left_over: leftOverItineraries,
    generated_at: generatedAt,
    total,
    total_left_over: totalLeftOver,
    total_selected: totalSelected
  } = results || {}
  console.log(results)

  return (
    <div className="PlanningResult">
      { showEmpty &&
        <Spinner size={ 60 } />
      }
      { hasResult &&
        <>
          <H1>Looplijsten</H1>
          <P>gegenereerd: { generatedAt }</P>
          <Div>
            <p><label>ingedeeld: </label>{ totalSelected }</p>
            <p><label>niet ingedeeld: </label>{ totalLeftOver }</p>
          </Div>
          { dayKeys.map(key => {
            const dayResult = results.days[key] as { name: string, itineraries: BWVData[] }[]
            const dayItineraries = dayResult
              .filter(item => item.name === "Ochtend" || item.name === "Middag")
              .map(item => item.itineraries)
            const showDayItineraries = dayItineraries.length > 0
            const eveningItineraries = dayResult
              .filter(item => item.name === "Avond")
              .map(item => item.itineraries)
            const showEveningItineraries = eveningItineraries.length > 0
            const weekendItineraries = dayResult
              .filter(item => item.name === "Weekend")
              .map(item => item.itineraries)
            const showWeekendItineraries = weekendItineraries.length > 0
            return <>
              <H1>{ getTitle(key) }</H1>
              { showDayItineraries &&
                <PlanningResultItineraries title={ `team dag` } itineraries={ dayItineraries } />
              }
              { showEveningItineraries &&
                <PlanningResultItineraries title={ `team avond` } itineraries={ eveningItineraries } />
              }
              { showWeekendItineraries &&
                <PlanningResultItineraries title={ `team weekend` } itineraries={ weekendItineraries } />
              }
            </>
          }) }
          <H1>Niet ingedeeld</H1>
          <PlanningResultItineraries itineraries={ [leftOverItineraries] } />
        </>
      }
    </div>
  )
}
export default PlanningResult
