import React, { FC } from "react"
import styled from "styled-components"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import DroppableItineraries from "./DroppableItineraries"
import useGlobalState from "../../hooks/useGlobalState"
import MapsButton from "./MapsButton"
import RemoveAllButton from "./RemoveAllButton"
import Hr from "../styled/Hr"

type Result = {
  id: Id,
  items: Itineraries
  user: string
}

const ButtonWrap = styled.div`
  display: flex
  justify-content: space-between
  margin-bottom: 15px
  button {
    max-width: 48%
    overflow: hidden
  }
`
const ButtonWrapBottom = styled(ButtonWrap)`
  margin-top: 15px
`

const Itineraries: FC = () => {

  const {
    isInitialized,
    itineraries: {
      isFetching,
      itineraries,
      errorMessage
    },
    itinerariesActions: {
      remove
    }
  } = useGlobalState()

  const hasError = errorMessage !== undefined

  const showSpinner = !isInitialized || isFetching
  const showError = hasError
  const show = !showSpinner && !showError
  const hasItineraries = itineraries.length > 0

  const emptyText = "Je looplijst is leeg. Zoek adressen om aan je looplijst toe te voegen."

  const onClick = () => itineraries.map(itinerary => remove(itinerary.id))
  const Buttons = () => (
    <>
      <MapsButton itineraries={ itineraries } />
      <RemoveAllButton onClick={ onClick } />
    </>
  )
  const ButtonsTop = () => (
    <>
      <ButtonWrap>
        <Buttons />
      </ButtonWrap>
      <Hr />
    </>
  )
  const ButtonsBottom = () => (
    <ButtonWrapBottom>
      <Buttons />
    </ButtonWrapBottom>
  )
  const showButtonsBottom = itineraries.length > 4

  return (
    <div className="Itineraries">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { show && (
          hasItineraries ?
            <>
              <ButtonsTop />
              <DroppableItineraries itineraries={ itineraries } />
              { showButtonsBottom &&
                <ButtonsBottom />
              }
            </> :
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
