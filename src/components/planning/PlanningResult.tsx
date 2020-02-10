import React, { FC } from "react"
import PlanningResultItineraries from "./PlanningResultItineraries"
import useGlobalState from "../../hooks/useGlobalState"
import navigateTo from "../../lib/navigateTo"

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
      { hasResult && days.monday.map((list: any) => <PlanningResultItineraries title={ `maandag ${ list.name }` } itineraries={ list.itineraries } />) }
    </div>
  )
}
export default PlanningResult
