import React, { FC } from "react"
import { Spinner } from "@datapunt/asc-ui"
import Itinerary from "./Itinerary"
import ErrorMessage from "../global/ErrorMessage"
import useFetch from "../../hooks/useFetch"

const Itineraries: FC = () => {

  const [result, isFetching, errorMessage] = useFetch("itineraries") as [any, boolean, ErrorMessage]
  const itineraries = result !== undefined ? result.results : []
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
      { show &&
        (
          hasItineraries ?
            itineraries.map((itinerary: any) => <div key={ itinerary.id }><Itinerary itinerary={ itinerary } /></div>)
            :
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
