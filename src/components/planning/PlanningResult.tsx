import React, { FC } from "react"
import PlanningResultItineraries from "./PlanningResultItineraries"
import useGlobalState from "../../hooks/useGlobalState"

const PlanningResult: FC = () => {

  const {
    planning: {
      results
    }
  } = useGlobalState()

  const hasResult = results !== undefined
  const showEmpty = !hasResult
  const days = hasResult ? results.days : undefined

  return (
    <div className="PlanningResult">
      { showEmpty &&
        <p>Geen resultaten</p>
      }
      { hasResult &&
        <>
          <h1>Looplijsten</h1>
          { days.monday.map((list: any) => <PlanningResultItineraries title={ `maandag ${ list.name }` } itineraries={ list.itineraries } />) }
        </>
      }
    </div>
  )
}
export default PlanningResult
