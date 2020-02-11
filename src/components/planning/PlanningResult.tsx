import React, { FC } from "react"
import PlanningResultItineraries from "./PlanningResultItineraries"
import useGlobalState from "../../hooks/useGlobalState"
import days, { getTitle } from "../../lib/days"
import { Spinner } from "@datapunt/asc-ui"

const PlanningResult: FC = () => {

  const {
    planning: {
      results
    }
  } = useGlobalState()

  const hasResult = results !== undefined
  const showEmpty = !hasResult
  const dayKeys = days.map(day => day.key)

  return (
    <div className="PlanningResult">
      { showEmpty &&
        <Spinner size={ 60 } />
      }
      { hasResult &&
        <>
          <h1>Looplijsten</h1>
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
              { showDayItineraries &&
                <PlanningResultItineraries title={ `${ getTitle(key) } team dag` } itineraries={ dayItineraries } />
              }
              { showEveningItineraries &&
                <PlanningResultItineraries title={ `${ getTitle(key) } team avond` } itineraries={ eveningItineraries } />
              }
              { showWeekendItineraries &&
                <PlanningResultItineraries title={ `${ getTitle(key) } team weekend` } itineraries={ weekendItineraries } />
              }
            </>
          }) }
        </>
      }
    </div>
  )
}
export default PlanningResult
