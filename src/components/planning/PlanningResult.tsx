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
          { dayKeys.map(key =>
              results.days[key].map((list: { name: string, itineraries: Itineraries }) =>
                <PlanningResultItineraries title={ `${ getTitle(key) } ${ list.name }` } itineraries={ list.itineraries } />
          )) }
        </>
      }
    </div>
  )
}
export default PlanningResult
