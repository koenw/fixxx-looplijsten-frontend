import React, { FC } from "react"
import { Spinner } from "@datapunt/asc-ui"
import useFetch from "../../hooks/useFetch"
import ErrorMessage from "../global/ErrorMessage"
import DroppableItineraries from "./DroppableItineraries"

type Result = {
  id: Id,
  items: Itineraries
  user: string
}

const Itineraries: FC = () => {

  const [result, isFetching, errorMessage] = useFetch("itineraries") as [Result, boolean, ErrorMessage]
  const itineraries = result !== undefined && Array.isArray(result.items) ? result.items : []
  const showSpinner = isFetching
  const showError = errorMessage !== undefined
  const show = !showSpinner && !showError
  const hasItineraries = itineraries.length > 0

  const emptyText = "Je looplijst is leeg. Zoek adressen om aan je looplijst toe te voegen."

  return (
    <div className="Itineraries">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { show && (
          hasItineraries ?
            <DroppableItineraries itineraries={ itineraries } /> :
            <p>{ emptyText }</p>
        )
      }
      { showError &&
        <ErrorMessage text={ errorMessage! } />
      }
    </div>
  )
}
export default Itineraries
